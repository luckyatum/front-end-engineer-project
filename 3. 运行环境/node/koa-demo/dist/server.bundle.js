!function(e){var n={};function r(t){if(n[t])return n[t].exports;var o=n[t]={i:t,l:!1,exports:{}};return e[t].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=n,r.d=function(e,n,t){r.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,n){if(1&n&&(e=r(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(r.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)r.d(t,o,function(n){return e[n]}.bind(null,o));return t},r.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(n,"a",n),n},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},r.p="",r(r.s=10)}([function(e,n,r){"use strict";var t=r(7),o=r.n(t),u=r(11);n.a=o()(u)},function(e,n){e.exports=require("koa")},function(e,n){e.exports=require("path")},function(e,n){e.exports=require("@koa/cors")},function(e,n){e.exports=require("koa-body")},function(e,n){e.exports=require("koa-helmet")},function(e,n){e.exports=require("koa-static")},function(e,n){e.exports=require("koa-combine-routers")},function(e,n){e.exports=require("koa-router")},function(e,n){e.exports=require("koa-compose")},function(e,n,r){"use strict";r.r(n),function(e){var n=r(1),t=r.n(n),o=r(2),u=r.n(o),i=r(3),a=r.n(i),c=r(4),f=r.n(c),s=r(5),l=r.n(s),p=r(6),d=r.n(p),b=r(0),v=r(9),y=r.n(v),m=new t.a,x=y()([a()(),f()(),l()(),d()(u.a.join(e,"../public")),Object(b.a)()]);m.use(x),m.use(Object(b.a)()),m.listen(8080)}.call(this,"src")},function(e,n,r){"use strict";r.r(n);var t=r(8),o=r.n(t);function u(e,n,r,t,o,u,i){try{var a=e[u](i),c=a.value}catch(e){return void r(e)}a.done?n(c):Promise.resolve(c).then(t,o)}function i(e,n){for(var r=0;r<n.length;r++){var t=n[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}var a=new(function(){function e(){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e)}var n,r,t,o,a;return n=e,(r=[{key:"demo",value:(o=regeneratorRuntime.mark((function e(n){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.body={msg:"body message"};case 1:case"end":return e.stop()}}),e)})),a=function(){var e=this,n=arguments;return new Promise((function(r,t){var i=o.apply(e,n);function a(e){u(i,r,t,a,c,"next",e)}function c(e){u(i,r,t,a,c,"throw",e)}a(void 0)}))},function(e){return a.apply(this,arguments)})}])&&i(n.prototype,r),t&&i(n,t),e}()),c=new o.a;c.get("/demo",a.demo);n.default=c}]);