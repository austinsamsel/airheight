function addToPrefiltersOrTransports(e){return function(t,r){"string"!=typeof t&&(r=t,t="*");var a,o=0,n=t.toLowerCase().match(core_rnotwhite)||[];if(jQuery.isFunction(r))for(;a=n[o++];)"+"===a[0]?(a=a.slice(1)||"*",(e[a]=e[a]||[]).unshift(r)):(e[a]=e[a]||[]).push(r)}}function inspectPrefiltersOrTransports(e,t,r,a){function o(i){var c;return n[i]=!0,jQuery.each(e[i]||[],function(e,i){var u=i(t,r,a);return"string"!=typeof u||s||n[u]?s?!(c=u):void 0:(t.dataTypes.unshift(u),o(u),!1)}),c}var n={},s=e===transports;return o(t.dataTypes[0])||!n["*"]&&o("*")}function ajaxExtend(e,t){var r,a,o=jQuery.ajaxSettings.flatOptions||{};for(a in t)void 0!==t[a]&&((o[a]?e:r||(r={}))[a]=t[a]);return r&&jQuery.extend(!0,e,r),e}function ajaxHandleResponses(e,t,r){for(var a,o,n,s,i=e.contents,c=e.dataTypes;"*"===c[0];)c.shift(),void 0===o&&(o=e.mimeType||t.getResponseHeader("Content-Type"));if(o)for(s in i)if(i[s]&&i[s].test(o)){c.unshift(s);break}if(c[0]in r)n=c[0];else{for(s in r){if(!c[0]||e.converters[s+" "+c[0]]){n=s;break}a||(a=s)}n=n||a}return n?(n!==c[0]&&c.unshift(n),r[n]):void 0}function ajaxConvert(e,t,r,a){var o,n,s,i,c,u={},p=e.dataTypes.slice();if(p[1])for(s in e.converters)u[s.toLowerCase()]=e.converters[s];for(n=p.shift();n;)if(e.responseFields[n]&&(r[e.responseFields[n]]=t),!c&&a&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),c=n,n=p.shift())if("*"===n)n=c;else if("*"!==c&&c!==n){if(s=u[c+" "+n]||u["* "+n],!s)for(o in u)if(i=o.split(" "),i[1]===n&&(s=u[c+" "+i[0]]||u["* "+i[0]])){s===!0?s=u[o]:u[o]!==!0&&(n=i[0],p.unshift(i[1]));break}if(s!==!0)if(s&&e["throws"])t=s(t);else try{t=s(t)}catch(d){return{state:"parsererror",error:s?d:"No conversion from "+c+" to "+n}}}return{state:"success",data:t}}var ajaxLocParts,ajaxLocation,ajax_nonce=jQuery.now(),ajax_rquery=/\?/,rhash=/#.*$/,rts=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rurl=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,_load=jQuery.fn.load,prefilters={},transports={},allTypes="*/".concat("*");try{ajaxLocation=location.href}catch(e){ajaxLocation=document.createElement("a"),ajaxLocation.href="",ajaxLocation=ajaxLocation.href}ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[],jQuery.fn.load=function(e,t,r){if("string"!=typeof e&&_load)return _load.apply(this,arguments);var a,o,n,s=this,i=e.indexOf(" ");return i>=0&&(a=e.slice(i,e.length),e=e.slice(0,i)),jQuery.isFunction(t)?(r=t,t=void 0):t&&"object"==typeof t&&(n="POST"),s.length>0&&jQuery.ajax({url:e,type:n,dataType:"html",data:t}).done(function(e){o=arguments,s.html(a?jQuery("<div>").append(jQuery.parseHTML(e)).find(a):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){jQuery.fn[t]=function(e){return this.on(t,e)}}),jQuery.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ajaxLocation,type:"GET",isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":jQuery.parseJSON,"text xml":jQuery.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?ajaxExtend(ajaxExtend(e,jQuery.ajaxSettings),t):ajaxExtend(jQuery.ajaxSettings,e)},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),ajax:function(e,t){function r(e,t,r,a){var o,p,h,m,g,Q=t;2!==T&&(T=2,i&&clearTimeout(i),u=void 0,s=a||"",v.readyState=e>0?4:0,o=e>=200&&300>e||304===e,r&&(m=ajaxHandleResponses(d,v,r)),m=ajaxConvert(d,m,v,o),o?(d.ifModified&&(g=v.getResponseHeader("Last-Modified"),g&&(jQuery.lastModified[n]=g),g=v.getResponseHeader("etag"),g&&(jQuery.etag[n]=g)),204===e||"HEAD"===d.type?Q="nocontent":304===e?Q="notmodified":(Q=m.state,p=m.data,h=m.error,o=!h)):(h=Q,(e||!Q)&&(Q="error",0>e&&(e=0))),v.status=e,v.statusText=(t||Q)+"",o?j.resolveWith(l,[p,Q,v]):j.rejectWith(l,[v,Q,h]),v.statusCode(x),x=void 0,c&&f.trigger(o?"ajaxSuccess":"ajaxError",[v,d,o?p:h]),y.fireWith(l,[v,Q]),c&&(f.trigger("ajaxComplete",[v,d]),--jQuery.active||jQuery.event.trigger("ajaxStop")))}"object"==typeof e&&(t=e,e=void 0),t=t||{};var a,o,n,s,i,c,u,p,d=jQuery.ajaxSetup({},t),l=d.context||d,f=d.context&&(l.nodeType||l.jquery)?jQuery(l):jQuery.event,j=jQuery.Deferred(),y=jQuery.Callbacks("once memory"),x=d.statusCode||{},h={},m={},T=0,g="canceled",v={readyState:0,getResponseHeader:function(e){var t;if(2===T){if(!p)for(p={};t=rheaders.exec(s);)p[t[1].toLowerCase()]=t[2];t=p[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===T?s:null},setRequestHeader:function(e,t){var r=e.toLowerCase();return T||(e=m[r]=m[r]||e,h[e]=t),this},overrideMimeType:function(e){return T||(d.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>T)for(t in e)x[t]=[x[t],e[t]];else v.always(e[v.status]);return this},abort:function(e){var t=e||g;return u&&u.abort(t),r(0,t),this}};if(j.promise(v).complete=y.add,v.success=v.done,v.error=v.fail,d.url=((e||d.url||ajaxLocation)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//"),d.type=t.method||t.type||d.method||d.type,d.dataTypes=jQuery.trim(d.dataType||"*").toLowerCase().match(core_rnotwhite)||[""],null==d.crossDomain&&(a=rurl.exec(d.url.toLowerCase()),d.crossDomain=!(!a||a[1]===ajaxLocParts[1]&&a[2]===ajaxLocParts[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(ajaxLocParts[3]||("http:"===ajaxLocParts[1]?"80":"443")))),d.data&&d.processData&&"string"!=typeof d.data&&(d.data=jQuery.param(d.data,d.traditional)),inspectPrefiltersOrTransports(prefilters,d,t,v),2===T)return v;c=d.global,c&&0===jQuery.active++&&jQuery.event.trigger("ajaxStart"),d.type=d.type.toUpperCase(),d.hasContent=!rnoContent.test(d.type),n=d.url,d.hasContent||(d.data&&(n=d.url+=(ajax_rquery.test(n)?"&":"?")+d.data,delete d.data),d.cache===!1&&(d.url=rts.test(n)?n.replace(rts,"$1_="+ajax_nonce++):n+(ajax_rquery.test(n)?"&":"?")+"_="+ajax_nonce++)),d.ifModified&&(jQuery.lastModified[n]&&v.setRequestHeader("If-Modified-Since",jQuery.lastModified[n]),jQuery.etag[n]&&v.setRequestHeader("If-None-Match",jQuery.etag[n])),(d.data&&d.hasContent&&d.contentType!==!1||t.contentType)&&v.setRequestHeader("Content-Type",d.contentType),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+("*"!==d.dataTypes[0]?", "+allTypes+"; q=0.01":""):d.accepts["*"]);for(o in d.headers)v.setRequestHeader(o,d.headers[o]);if(d.beforeSend&&(d.beforeSend.call(l,v,d)===!1||2===T))return v.abort();g="abort";for(o in{success:1,error:1,complete:1})v[o](d[o]);if(u=inspectPrefiltersOrTransports(transports,d,t,v)){v.readyState=1,c&&f.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(i=setTimeout(function(){v.abort("timeout")},d.timeout));try{T=1,u.send(h,r)}catch(Q){if(!(2>T))throw Q;r(-1,Q)}}else r(-1,"No Transport");return v},getJSON:function(e,t,r){return jQuery.get(e,t,r,"json")},getScript:function(e,t){return jQuery.get(e,void 0,t,"script")}}),jQuery.each(["get","post"],function(e,t){jQuery[t]=function(e,r,a,o){return jQuery.isFunction(r)&&(o=o||a,a=r,r=void 0),jQuery.ajax({url:e,type:t,dataType:o,data:r,success:a})}});