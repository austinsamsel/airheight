function vendorPropName(e,t){if(t in e)return t;for(var r=t.charAt(0).toUpperCase()+t.slice(1),i=t,n=cssPrefixes.length;n--;)if(t=cssPrefixes[n]+r,t in e)return t;return i}function isHidden(e,t){return e=t||e,"none"===jQuery.css(e,"display")||!jQuery.contains(e.ownerDocument,e)}function showHide(e,t){for(var r,i,n=[],s=0,o=e.length;o>s;s++)r=e[s],r.style&&(n[s]=jQuery._data(r,"olddisplay"),t?(n[s]||"none"!==r.style.display||(r.style.display=""),""===r.style.display&&isHidden(r)&&(n[s]=jQuery._data(r,"olddisplay",css_defaultDisplay(r.nodeName)))):(i=curCSS(r,"display"),n[s]||"none"===i||jQuery._data(r,"olddisplay",i)));for(s=0;o>s;s++)r=e[s],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?n[s]||"":"none"));return e}function setPositiveNumber(e,t,r){var i=rnumsplit.exec(t);return i?Math.max(0,i[1]-(r||0))+(i[2]||"px"):t}function augmentWidthOrHeight(e,t,r,i){for(var n=r===(i?"border":"content")?4:"width"===t?1:0,s=0;4>n;n+=2)"margin"===r&&(s+=jQuery.css(e,r+cssExpand[n],!0)),i?("content"===r&&(s-=parseFloat(curCSS(e,"padding"+cssExpand[n]))||0),"margin"!==r&&(s-=parseFloat(curCSS(e,"border"+cssExpand[n]+"Width"))||0)):(s+=parseFloat(curCSS(e,"padding"+cssExpand[n]))||0,"padding"!==r&&(s+=parseFloat(curCSS(e,"border"+cssExpand[n]+"Width"))||0));return s}function getWidthOrHeight(e,t,r){var i="width"===t?e.offsetWidth:e.offsetHeight,n=!0,s=jQuery.support.boxSizing&&"border-box"===jQuery.css(e,"boxSizing");if(0>=i||null==i){if(i=curCSS(e,t),(0>i||null==i)&&(i=e.style[t]),rnumnonpx.test(i))return i;n=s&&(jQuery.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+augmentWidthOrHeight(e,t,r||(s?"border":"content"),n)+"px"}function css_defaultDisplay(e){if(elemdisplay[e])return elemdisplay[e];var t=jQuery("<"+e+">").appendTo(document.body),r=t.css("display");return t.remove(),("none"===r||""===r)&&(iframe=document.body.appendChild(iframe||jQuery.extend(document.createElement("iframe"),{frameBorder:0,width:0,height:0})),iframeDoc&&iframe.createElement||(iframeDoc=(iframe.contentWindow||iframe.contentDocument).document,iframeDoc.write("<!doctype html><html><body>"),iframeDoc.close()),t=iframeDoc.body.appendChild(iframeDoc.createElement(e)),r=curCSS(t,"display"),document.body.removeChild(iframe)),elemdisplay[e]=r,r}var curCSS,iframe,iframeDoc,ralpha=/alpha\([^)]*\)/i,ropacity=/opacity=([^)]*)/,rposition=/^(top|right|bottom|left)$/,rdisplayswap=/^(none|table(?!-c[ea]).+)/,rmargin=/^margin/,rnumsplit=new RegExp("^("+core_pnum+")(.*)$","i"),rnumnonpx=new RegExp("^("+core_pnum+")(?!px)[a-z%]+$","i"),rrelNum=new RegExp("^([-+])=("+core_pnum+")","i"),elemdisplay={BODY:"block"},cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:0,fontWeight:400},cssExpand=["Top","Right","Bottom","Left"],cssPrefixes=["Webkit","O","Moz","ms"],eventsToggle=jQuery.fn.toggle;jQuery.fn.extend({css:function(e,t){return jQuery.access(this,function(e,t,r){return void 0!==r?jQuery.style(e,t,r):jQuery.css(e,t)},e,t,arguments.length>1)},show:function(){return showHide(this,!0)},hide:function(){return showHide(this)},toggle:function(e,t){var r="boolean"==typeof e;return jQuery.isFunction(e)&&jQuery.isFunction(t)?eventsToggle.apply(this,arguments):this.each(function(){(r?e:isHidden(this))?jQuery(this).show():jQuery(this).hide()})}}),jQuery.extend({cssHooks:{opacity:{get:function(e,t){if(t){var r=curCSS(e,"opacity");return""===r?"1":r}}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,t,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var n,s,o,u=jQuery.camelCase(t),a=e.style;if(t=jQuery.cssProps[u]||(jQuery.cssProps[u]=vendorPropName(a,u)),o=jQuery.cssHooks[t]||jQuery.cssHooks[u],void 0===r)return o&&"get"in o&&void 0!==(n=o.get(e,!1,i))?n:a[t];if(s=typeof r,"string"===s&&(n=rrelNum.exec(r))&&(r=(n[1]+1)*n[2]+parseFloat(jQuery.css(e,t)),s="number"),!(null==r||"number"===s&&isNaN(r)||("number"!==s||jQuery.cssNumber[u]||(r+="px"),o&&"set"in o&&void 0===(r=o.set(e,r,i)))))try{a[t]=r}catch(l){}}},css:function(e,t,r,i){var n,s,o,u=jQuery.camelCase(t);return t=jQuery.cssProps[u]||(jQuery.cssProps[u]=vendorPropName(e.style,u)),o=jQuery.cssHooks[t]||jQuery.cssHooks[u],o&&"get"in o&&(n=o.get(e,!0,i)),void 0===n&&(n=curCSS(e,t)),"normal"===n&&t in cssNormalTransform&&(n=cssNormalTransform[t]),r||void 0!==i?(s=parseFloat(n),r||jQuery.isNumeric(s)?s||0:n):n},swap:function(e,t,r){var i,n,s={};for(n in t)s[n]=e.style[n],e.style[n]=t[n];i=r.call(e);for(n in t)e.style[n]=s[n];return i}}),window.getComputedStyle?curCSS=function(e,t){var r,i,n,s,o=window.getComputedStyle(e,null),u=e.style;return o&&(r=o.getPropertyValue(t)||o[t],""!==r||jQuery.contains(e.ownerDocument,e)||(r=jQuery.style(e,t)),rnumnonpx.test(r)&&rmargin.test(t)&&(i=u.width,n=u.minWidth,s=u.maxWidth,u.minWidth=u.maxWidth=u.width=r,r=o.width,u.width=i,u.minWidth=n,u.maxWidth=s)),r}:document.documentElement.currentStyle&&(curCSS=function(e,t){var r,i,n=e.currentStyle&&e.currentStyle[t],s=e.style;return null==n&&s&&s[t]&&(n=s[t]),rnumnonpx.test(n)&&!rposition.test(t)&&(r=s.left,i=e.runtimeStyle&&e.runtimeStyle.left,i&&(e.runtimeStyle.left=e.currentStyle.left),s.left="fontSize"===t?"1em":n,n=s.pixelLeft+"px",s.left=r,i&&(e.runtimeStyle.left=i)),""===n?"auto":n}),jQuery.each(["height","width"],function(e,t){jQuery.cssHooks[t]={get:function(e,r,i){return r?0===e.offsetWidth&&rdisplayswap.test(curCSS(e,"display"))?jQuery.swap(e,cssShow,function(){return getWidthOrHeight(e,t,i)}):getWidthOrHeight(e,t,i):void 0},set:function(e,r,i){return setPositiveNumber(e,r,i?augmentWidthOrHeight(e,t,i,jQuery.support.boxSizing&&"border-box"===jQuery.css(e,"boxSizing")):0)}}}),jQuery.support.opacity||(jQuery.cssHooks.opacity={get:function(e,t){return ropacity.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var r=e.style,i=e.currentStyle,n=jQuery.isNumeric(t)?"alpha(opacity="+100*t+")":"",s=i&&i.filter||r.filter||"";r.zoom=1,t>=1&&""===jQuery.trim(s.replace(ralpha,""))&&r.removeAttribute&&(r.removeAttribute("filter"),i&&!i.filter)||(r.filter=ralpha.test(s)?s.replace(ralpha,n):s+" "+n)}}),jQuery(function(){jQuery.support.reliableMarginRight||(jQuery.cssHooks.marginRight={get:function(e,t){return jQuery.swap(e,{display:"inline-block"},function(){return t?curCSS(e,"marginRight"):void 0})}}),!jQuery.support.pixelPosition&&jQuery.fn.position&&jQuery.each(["top","left"],function(e,t){jQuery.cssHooks[t]={get:function(e,r){if(r){var i=curCSS(e,t);return rnumnonpx.test(i)?jQuery(e).position()[t]+"px":i}}}})}),jQuery.expr&&jQuery.expr.filters&&(jQuery.expr.filters.hidden=function(e){return 0===e.offsetWidth&&0===e.offsetHeight||!jQuery.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||curCSS(e,"display"))},jQuery.expr.filters.visible=function(e){return!jQuery.expr.filters.hidden(e)}),jQuery.each({margin:"",padding:"",border:"Width"},function(e,t){jQuery.cssHooks[e+t]={expand:function(r){var i,n="string"==typeof r?r.split(" "):[r],s={};for(i=0;4>i;i++)s[e+cssExpand[i]+t]=n[i]||n[i-2]||n[0];return s}},rmargin.test(e)||(jQuery.cssHooks[e+t].set=setPositiveNumber)});