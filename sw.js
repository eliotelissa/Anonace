function f(){this.g=!1;this.b=null;this.c=void 0;this.a=1;this.l=this.h=0;this.f=null}function n(a){if(a.g)throw new TypeError("Generator is already running");a.g=!0}f.prototype.i=function(a){this.c=a};function q(a,b){a.f={j:b,m:!0};a.a=a.h||a.l}f.prototype.return=function(a){this.f={return:a};this.a=this.l};function t(a,b,c){a.a=c;return{value:b}}function v(a){this.a=new f;this.b=a}
function w(a,b){n(a.a);var c=a.a.b;if(c)return x(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.a.return);a.a.return(b);return y(a)}function x(a,b,c,d){try{var k=b.call(a.a.b,c);if(!(k instanceof Object))throw new TypeError("Iterator result "+k+" is not an object");if(!k.done)return a.a.g=!1,k;var m=k.value}catch(l){return a.a.b=null,q(a.a,l),y(a)}a.a.b=null;d.call(a.a,m);return y(a)}
function y(a){for(;a.a.a;)try{var b=a.b(a.a);if(b)return a.a.g=!1,{value:b.value,done:!1}}catch(c){a.a.c=void 0,q(a.a,c)}a.a.g=!1;if(a.a.f){b=a.a.f;a.a.f=null;if(b.m)throw b.j;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function D(a){this.next=function(b){n(a.a);a.a.b?b=x(a,a.a.b.next,b,a.a.i):(a.a.i(b),b=y(a));return b};this.throw=function(b){n(a.a);a.a.b?b=x(a,a.a.b["throw"],b,a.a.i):(q(a.a,b),b=y(a));return b};this.return=function(b){return w(a,b)};this[Symbol.iterator]=function(){return this}}function E(a){function b(d){return a.next(d)}function c(d){return a.throw(d)}return new Promise(function(d,k){function m(l){l.done?d(l.value):Promise.resolve(l.value).then(b,c).then(m,k)}m(a.next())})}
var F="/ /favicon.ico /manifest.json /robots.txt /sitemap.xml /?utm_source=web_app_manifest /disclaimer/ /offline/ /privacy-policy/ /technical-information/ /terms-of-service/ /images/apple-touch-icon.png /images/favicon-32x32.png /images/favicon-16x16.png /images/feature-graphic-1024x500.jpg /images/logo-144x144.png /images/logo-192x192.png /images/logo-256x256.png /images/logo-384x384.png /images/logo-512x512-maskable.png /images/logo-512x512.png /images/logo.svg".split(" "),G=self;
G.addEventListener("install",function(a){a.waitUntil(G.caches.open("20210406-051122").then(function(b){b.addAll(F.map(function(c){return new Request(c,{mode:"no-cors"})})).catch(function(c){return console.log("Could not pre-cache resource:",c)})}).catch(function(b){return console.log("Could not pre-cache resources:",b)}))});G.addEventListener("message",function(a){a=a.data.action;var b={action:a};"getVersion"==a?b[a]="20210406-051122":"skipWaiting"==a&&G.skipWaiting();H(b)});
G.addEventListener("fetch",function(a){a.respondWith(G.caches.match(a.request).then(function(b){return b||I(a.request)}))});G.addEventListener("activate",function(a){H({event:a.type});a.waitUntil(J());K();return G.clients.claim()});function H(a){G.clients.matchAll().then(function(b){return b.forEach(function(c){c.postMessage(a)})})}function J(){return G.caches.keys().then(function(a){return Promise.all(a.map(function(b){if("20210406-051122"!==b)return G.caches.delete(b)}))})}
function K(){G.registration.addEventListener("updatefound",function(a){var b=G.registration.installing;b.addEventListener("statechange",function(c){"installed"==b.state&&(b.postMessage({action:"skipWaiting"}),H({event:c.type,action:"refresh"}))});H({event:a.type})})}
function I(a){var b,c,d,k,m,l,z,A,B;return E(new D(new v(function(e){switch(e.a){case 1:b=-1!=a.url.indexOf("&jsonp=");if(b){var g={};for(var h=a.url.split("?").pop().split("&"),u=h.length>>>0;u--;){var r=h[u].split("="),p=r[0];p&&(g[p]=decodeURIComponent(r[1]))}h=g.query;u=h.length;for(var C=p=r=0;C<u;)r^=h.charCodeAt(C++)<<p,p+=8,p%=24;h=[g.action,r.toString(36).toUpperCase()];g.source&&h.push(g.source);g="offline-"+h.join("-")+".json"}else g="";c=g;e.h=2;return t(e,fetch(a),4);case 4:d=e.c;h=a.url;
g=0==h.indexOf(G.location.origin);h=-1!=h.indexOf("nocache");if(("GET"!=a.method||!g||h)&&!b){e.a=5;break}return t(e,G.caches.open("20210406-051122"),6);case 6:k=e.c,c?(m=(d.text()||"").replace(/jsonp_\w+\(/,"jsonp_cb("),k.put(c,new Response(m,{status:304,statusText:"Not Modified",headers:d.headers}))):k.put(a,d.clone());case 5:e.a=3;e.h=0;break;case 2:return e.h=0,g=e.f.j,e.f=null,l=g,console.log("Could not fetch request:",l),t(e,G.caches.open("20210406-051122"),7);case 7:return z=e.c,b?t(e,z.match(c),
11):t(e,z.match("/offline/"),10);case 10:d=e.c;e.a=9;break;case 11:if(d=e.c){A=a.url.split("&jsonp=").pop().split("&")[0];B=(d.text()||"").replace(/jsonp_cb\(/,A+"(");d=new Response(B,{status:d.status,statusText:d.statusText,headers:d.headers});e.a=9;break}g=a.url.split("&jsonp=").pop().split("&")[0];g=fetch(new Request("data:text/javascript,"+g+"([])"));return t(e,g,13);case 13:d=e.c;case 9:console.log("Offline response:",d);case 3:return e.return(d)}})))};
