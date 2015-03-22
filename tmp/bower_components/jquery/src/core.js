define(["./var/deletedIds","./var/slice","./var/concat","./var/push","./var/indexOf","./var/class2type","./var/toString","./var/hasOwn","./var/support"],function(n,t,r,e,i,o,u,a,c){function s(n){var t=n.length,r=f.type(n);return"function"===r||f.isWindow(n)?!1:1===n.nodeType&&t?!0:"array"===r||0===t||"number"==typeof t&&t>0&&t-1 in n}var l="@VERSION",f=function(n,t){return new f.fn.init(n,t)},p=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,h=/^-ms-/,y=/-([\da-z])/gi,g=function(n,t){return t.toUpperCase()};return f.fn=f.prototype={jquery:l,constructor:f,selector:"",length:0,toArray:function(){return t.call(this)},get:function(n){return null!=n?0>n?this[n+this.length]:this[n]:t.call(this)},pushStack:function(n){var t=f.merge(this.constructor(),n);return t.prevObject=this,t.context=this.context,t},each:function(n,t){return f.each(this,n,t)},map:function(n){return this.pushStack(f.map(this,function(t,r){return n.call(t,r,t)}))},slice:function(){return this.pushStack(t.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(n){var t=this.length,r=+n+(0>n?t:0);return this.pushStack(r>=0&&t>r?[this[r]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:e,sort:n.sort,splice:n.splice},f.extend=f.fn.extend=function(){var n,t,r,e,i,o,u=arguments[0]||{},a=1,c=arguments.length,s=!1;for("boolean"==typeof u&&(s=u,u=arguments[a]||{},a++),"object"==typeof u||f.isFunction(u)||(u={}),a===c&&(u=this,a--);c>a;a++)if(null!=(i=arguments[a]))for(e in i)n=u[e],r=i[e],u!==r&&(s&&r&&(f.isPlainObject(r)||(t=f.isArray(r)))?(t?(t=!1,o=n&&f.isArray(n)?n:[]):o=n&&f.isPlainObject(n)?n:{},u[e]=f.extend(s,o,r)):void 0!==r&&(u[e]=r));return u},f.extend({expando:"jQuery"+(l+Math.random()).replace(/\D/g,""),isReady:!0,error:function(n){throw new Error(n)},noop:function(){},isFunction:function(n){return"function"===f.type(n)},isArray:Array.isArray||function(n){return"array"===f.type(n)},isWindow:function(n){return null!=n&&n==n.window},isNumeric:function(n){return!f.isArray(n)&&n-parseFloat(n)+1>=0},isEmptyObject:function(n){var t;for(t in n)return!1;return!0},isPlainObject:function(n){var t;if(!n||"object"!==f.type(n)||n.nodeType||f.isWindow(n))return!1;try{if(n.constructor&&!a.call(n,"constructor")&&!a.call(n.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}if(c.ownLast)for(t in n)return a.call(n,t);for(t in n);return void 0===t||a.call(n,t)},type:function(n){return null==n?n+"":"object"==typeof n||"function"==typeof n?o[u.call(n)]||"object":typeof n},globalEval:function(n){n&&f.trim(n)&&(window.execScript||function(n){window.eval.call(window,n)})(n)},camelCase:function(n){return n.replace(h,"ms-").replace(y,g)},nodeName:function(n,t){return n.nodeName&&n.nodeName.toLowerCase()===t.toLowerCase()},each:function(n,t,r){var e,i=0,o=n.length,u=s(n);if(r){if(u)for(;o>i&&(e=t.apply(n[i],r),e!==!1);i++);else for(i in n)if(e=t.apply(n[i],r),e===!1)break}else if(u)for(;o>i&&(e=t.call(n[i],i,n[i]),e!==!1);i++);else for(i in n)if(e=t.call(n[i],i,n[i]),e===!1)break;return n},trim:function(n){return null==n?"":(n+"").replace(p,"")},makeArray:function(n,t){var r=t||[];return null!=n&&(s(Object(n))?f.merge(r,"string"==typeof n?[n]:n):e.call(r,n)),r},inArray:function(n,t,r){var e;if(t){if(i)return i.call(t,n,r);for(e=t.length,r=r?0>r?Math.max(0,e+r):r:0;e>r;r++)if(r in t&&t[r]===n)return r}return-1},merge:function(n,t){for(var r=+t.length,e=0,i=n.length;r>e;)n[i++]=t[e++];if(r!==r)for(;void 0!==t[e];)n[i++]=t[e++];return n.length=i,n},grep:function(n,t,r){for(var e,i=[],o=0,u=n.length,a=!r;u>o;o++)e=!t(n[o],o),e!==a&&i.push(n[o]);return i},map:function(n,t,e){var i,o=0,u=n.length,a=s(n),c=[];if(a)for(;u>o;o++)i=t(n[o],o,e),null!=i&&c.push(i);else for(o in n)i=t(n[o],o,e),null!=i&&c.push(i);return r.apply([],c)},guid:1,proxy:function(n,r){var e,i,o;return"string"==typeof r&&(o=n[r],r=n,n=o),f.isFunction(n)?(e=t.call(arguments,2),i=function(){return n.apply(r||this,e.concat(t.call(arguments)))},i.guid=n.guid=n.guid||f.guid++,i):void 0},now:function(){return+new Date},support:c}),f.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(n,t){o["[object "+t+"]"]=t.toLowerCase()}),f});