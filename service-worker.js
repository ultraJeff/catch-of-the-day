"use strict";function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}var precacheConfig=[["/catch-of-the-day/index.html","a8fb418516a1a2d8aa470bf035d796fa"],["/catch-of-the-day/static/css/main.21c5f0b4.css","0fa3b3fcf1da1e9d7ccb58ccdbe38660"],["/catch-of-the-day/static/js/main.74438de7.js","080fa54675774aaae8a2b5467d13bd59"],["/catch-of-the-day/static/media/anchor.d2f8799a.svg","d2f8799a13e6db2022d9a7de22776705"],["/catch-of-the-day/static/media/blanch_caps_inline-webfont.1461f8e9.woff","1461f8e9d2084c70c00830348efe1766"],["/catch-of-the-day/static/media/blanch_caps_inline-webfont.73a576a8.eot","73a576a8254aeafebcdc66fe9fd41ac8"],["/catch-of-the-day/static/media/blanch_caps_inline-webfont.7bbffda6.svg","7bbffda6bcacac8360f0ee00bb03dc04"],["/catch-of-the-day/static/media/blanch_caps_inline-webfont.8345e1b3.ttf","8345e1b3362c1d640f0f11b5aae1d5bc"],["/catch-of-the-day/static/media/haymaker-webfont.4c3fb584.eot","4c3fb584d3f63821357c8a9cff97f360"],["/catch-of-the-day/static/media/haymaker-webfont.751e5627.woff","751e56274d3ea1c651ea824f902bb987"],["/catch-of-the-day/static/media/haymaker-webfont.cf798e30.svg","cf798e30eda73d84b25c4ae233fe5e21"],["/catch-of-the-day/static/media/haymaker-webfont.e9535f20.ttf","e9535f20ca175cc3fdfe2816f7c47168"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,"index.html"),t=urlsToCacheKeys.has(a));!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL("/catch-of-the-day/index.html",self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});