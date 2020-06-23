/**
 * @fileoverview Simple implementation of Twitter API service.
 *
 * @see http://google.github.io/styleguide/javascriptguide.xml
 * @see http://developers.google.com/closure/compiler/docs/js-for-compiler
 * @see https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object
 */



/**
 * @extends {reader.Parser}
 * @constructor
 */
reader.Twitter = function() {
  reader.Parser.call(this);

  /** @const {string} */ const BASE_URL = 'https://twitter.com/';
  /** @const {string} */ const STATUS_URL = 'https://twitter.com/web/status/';
  /** @const {string} */ const HASHTAG_URI = 'https://twitter.com/hashtag/';
  /** @const {!RegExp} */ const LINK_PATTERN = /https?:\/\/t\.co\/\w+/img;

  /**
   * Encodes query string.
   * @param {string} query The query string to encode.
   * @return {string} Returns encoded query string.
   * @override
   */
  this.encodeQuery = function(query) {
    return encodeURIComponent(query.split(',').join(' OR '));
  };

  /**
   * @param {!Array.<!Object>} data List of twits.
   * @param {!reader.MediaExtractor} extractor The media extractor.
   * @return {!Object.<string, *>}
   * @override
   */
  this.parse = function(data, extractor) {
    /** @type {!Object<string, !Array>} */ const result = {};
    /** @type {number} */ let length = data.length;

    for (; length--;) {
      /** @type {!Object} */ const item = data[length];
      if (item && item['id_str']) {
        /** @type {string} */ let text = item['full_text'] ||
                                         item['text'] || '';
        /** @type {!Object} */ let user = item['user'] || {};
        /** @type {!Date} */ let date = new Date(item['created_at']);
        /** @type {string} */ let key = self_.getKey(date);

        if (item['retweeted_status'] && text.indexOf('RT @') == 0) {
          text = text.split(': ')[0] + ': ' +
                 item['retweeted_status']['full_text'];
        }

        item['date'] = item['created_at'].split(' +0000')[0];
        user['profile_image_url'] = (
            user['profile_image_url'] || '').replace(/^http\:/, 'https:');

        findMedia_(item, extractor);
        result[key] = result[key] || [];
        result[key].push(self_.parseItemTemplate({
          'source': 'twitter',
          'id': item['id_str'],
          'text': self_.formatUserNames(self_.formatHashTags(self_.formatLinks(
              text, LINK_PATTERN), HASHTAG_URI), BASE_URL),
          'link': STATUS_URL + item['id_str'],
          'date': self_.formatDate(date),
          'media': item['media'] || '',
          'author_avatar': user['profile_image_url'],
          'author_name': user['name'],
          'author_link': BASE_URL + user['screen_name']
        }));
      }
    }

    return result;
  };

  function findMedia_(item, extractor) {
    let media = ((item['extended_entities'] || {})['media'] || [])[0];
    const url = media && media['media_url_https'];
    const status = STATUS_URL + item['id_str'];

    if (url && url.indexOf('https:') == 0) {
      item['media'] = self_.getImageHtml(url, status);
    } else {
      media = ((item['entities'] || {})['urls'] || [])[0];
      extractor.extract(media && media['expanded_url'], function(media) {
        let html = '';
        if ('image' == media['type']) {
          html = self_.getImageHtml(media['url'], status);
        } else if ('youtube' == media['type']) {
          html = self_.getYoutubeHtml(media['url']);
        }

        const div = dom.getElementById('media-' + item['id_str']);
        if (div) {
          div.innerHTML = html;
        } else {
          item['media'] = html;
        }
      });
    }

    return url;
  }

  /**
   * The reference to current class instance.
   * Used in private methods and for preventing jslint errors.
   * @type {!reader.Twitter}
   * @private
   */
  const self_ = this;
};
