define(["../core","../core/access","./support"],function(e,t,n){var o=/^(?:input|select|textarea|button|object)$/i,r=/^(?:a|area)$/i;e.fn.extend({prop:function(n,o){return t(this,e.prop,n,o,arguments.length>1)},removeProp:function(t){return t=e.propFix[t]||t,this.each(function(){try{this[t]=void 0,delete this[t]}catch(e){}})}}),e.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(t,n,o){var r,i,p,a=t.nodeType;if(t&&3!==a&&8!==a&&2!==a)return p=1!==a||!e.isXMLDoc(t),p&&(n=e.propFix[n]||n,i=e.propHooks[n]),void 0!==o?i&&"set"in i&&void 0!==(r=i.set(t,o,n))?r:t[n]=o:i&&"get"in i&&null!==(r=i.get(t,n))?r:t[n]},propHooks:{tabIndex:{get:function(t){var n=e.find.attr(t,"tabindex");return n?parseInt(n,10):o.test(t.nodeName)||r.test(t.nodeName)&&t.href?0:-1}}}}),n.hrefNormalized||e.each(["href","src"],function(t,n){e.propHooks[n]={get:function(e){return e.getAttribute(n,4)}}}),n.optSelected||(e.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),e.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){e.propFix[this.toLowerCase()]=this}),n.enctype||(e.propFix.enctype="encoding")});