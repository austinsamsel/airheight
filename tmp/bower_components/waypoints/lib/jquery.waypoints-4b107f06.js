/*!
Waypoints - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function e(i){if(!i)throw new Error("No options passed to Waypoint constructor");if(!i.element)throw new Error("No element option passed to Waypoint constructor");if(!i.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+t,this.options=e.Adapter.extend({},e.defaults,i),this.element=this.options.element,this.adapter=new e.Adapter(this.element),this.callback=i.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=e.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=e.Context.findOrCreateByElement(this.options.context),e.offsetAliases[this.options.offset]&&(this.options.offset=e.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),n[this.key]=this,t+=1}var t=0,n={};e.prototype.queueTrigger=function(e){this.group.queueTrigger(this,e)},e.prototype.trigger=function(e){this.enabled&&this.callback&&this.callback.apply(this,e)},e.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete n[this.key]},e.prototype.disable=function(){return this.enabled=!1,this},e.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},e.prototype.next=function(){return this.group.next(this)},e.prototype.previous=function(){return this.group.previous(this)},e.invokeAll=function(e){var t=[];for(var i in n)t.push(n[i]);for(var r=0,o=t.length;o>r;r++)t[r][e]()},e.destroyAll=function(){e.invokeAll("destroy")},e.disableAll=function(){e.invokeAll("disable")},e.enableAll=function(){e.invokeAll("enable")},e.refreshAll=function(){e.Context.refreshAll()},e.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},e.viewportWidth=function(){return document.documentElement.clientWidth},e.adapters=[],e.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},e.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=e}(),function(){"use strict";function e(e){window.setTimeout(e,1e3/60)}function t(e){this.element=e,this.Adapter=r.Adapter,this.adapter=new this.Adapter(e),this.key="waypoint-context-"+n,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},e.waypointContextKey=this.key,i[e.waypointContextKey]=this,n+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var n=0,i={},r=window.Waypoint,o=window.onload;t.prototype.add=function(e){var t=e.options.horizontal?"horizontal":"vertical";this.waypoints[t][e.key]=e,this.refresh()},t.prototype.checkEmpty=function(){var e=this.Adapter.isEmptyObject(this.waypoints.horizontal),t=this.Adapter.isEmptyObject(this.waypoints.vertical);e&&t&&(this.adapter.off(".waypoints"),delete i[this.key])},t.prototype.createThrottledResizeHandler=function(){function e(){t.handleResize(),t.didResize=!1}var t=this;this.adapter.on("resize.waypoints",function(){t.didResize||(t.didResize=!0,r.requestAnimationFrame(e))})},t.prototype.createThrottledScrollHandler=function(){function e(){t.handleScroll(),t.didScroll=!1}var t=this;this.adapter.on("scroll.waypoints",function(){(!t.didScroll||r.isTouch)&&(t.didScroll=!0,r.requestAnimationFrame(e))})},t.prototype.handleResize=function(){r.Context.refreshAll()},t.prototype.handleScroll=function(){var e={},t={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var n in t){var i=t[n],r=i.newScroll>i.oldScroll,o=r?i.forward:i.backward;for(var s in this.waypoints[n]){var a=this.waypoints[n][s],l=i.oldScroll<a.triggerPoint,u=i.newScroll>=a.triggerPoint,c=l&&u,d=!l&&!u;(c||d)&&(a.queueTrigger(o),e[a.group.id]=a.group)}}for(var h in e)e[h].flushTriggers();this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}},t.prototype.innerHeight=function(){return this.element==this.element.window?r.viewportHeight():this.adapter.innerHeight()},t.prototype.remove=function(e){delete this.waypoints[e.axis][e.key],this.checkEmpty()},t.prototype.innerWidth=function(){return this.element==this.element.window?r.viewportWidth():this.adapter.innerWidth()},t.prototype.destroy=function(){var e=[];for(var t in this.waypoints)for(var n in this.waypoints[t])e.push(this.waypoints[t][n]);for(var i=0,r=e.length;r>i;i++)e[i].destroy()},t.prototype.refresh=function(){var e,t=this.element==this.element.window,n=this.adapter.offset(),i={};this.handleScroll(),e={horizontal:{contextOffset:t?0:n.left,contextScroll:t?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:t?0:n.top,contextScroll:t?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in e){var o=e[r];for(var s in this.waypoints[r]){var a,l,u,c,d,h=this.waypoints[r][s],f=h.options.offset,p=h.triggerPoint,g=0,m=null==p;h.element!==h.element.window&&(g=h.adapter.offset()[o.offsetProp]),"function"==typeof f?f=f.apply(h):"string"==typeof f&&(f=parseFloat(f),h.options.offset.indexOf("%")>-1&&(f=Math.ceil(o.contextDimension*f/100))),a=o.contextScroll-o.contextOffset,h.triggerPoint=g+a-f,l=p<o.oldScroll,u=h.triggerPoint>=o.oldScroll,c=l&&u,d=!l&&!u,!m&&c?(h.queueTrigger(o.backward),i[h.group.id]=h.group):!m&&d?(h.queueTrigger(o.forward),i[h.group.id]=h.group):m&&o.oldScroll>=h.triggerPoint&&(h.queueTrigger(o.forward),i[h.group.id]=h.group)}}for(var y in i)i[y].flushTriggers();return this},t.findOrCreateByElement=function(e){return t.findByElement(e)||new t(e)},t.refreshAll=function(){for(var e in i)i[e].refresh()},t.findByElement=function(e){return i[e.waypointContextKey]},window.onload=function(){o&&o(),t.refreshAll()},r.requestAnimationFrame=function(t){var n=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||e;n.call(window,t)},r.Context=t}(),function(){"use strict";function e(e,t){return e.triggerPoint-t.triggerPoint}function t(e,t){return t.triggerPoint-e.triggerPoint}function n(e){this.name=e.name,this.axis=e.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),i[this.axis][this.name]=this}var i={vertical:{},horizontal:{}},r=window.Waypoint;n.prototype.add=function(e){this.waypoints.push(e)},n.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},n.prototype.flushTriggers=function(){for(var n in this.triggerQueues){var i=this.triggerQueues[n],r="up"===n||"left"===n;i.sort(r?t:e);for(var o=0,s=i.length;s>o;o+=1){var a=i[o];(a.options.continuous||o===i.length-1)&&a.trigger([n])}}this.clearTriggerQueues()},n.prototype.next=function(t){this.waypoints.sort(e);var n=r.Adapter.inArray(t,this.waypoints),i=n===this.waypoints.length-1;return i?null:this.waypoints[n+1]},n.prototype.previous=function(t){this.waypoints.sort(e);var n=r.Adapter.inArray(t,this.waypoints);return n?this.waypoints[n-1]:null},n.prototype.queueTrigger=function(e,t){this.triggerQueues[t].push(e)},n.prototype.remove=function(e){var t=r.Adapter.inArray(e,this.waypoints);t>-1&&this.waypoints.splice(t,1)},n.prototype.first=function(){return this.waypoints[0]},n.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},n.findOrCreate=function(e){return i[e.axis][e.name]||new n(e)},r.Group=n}(),function(){"use strict";function e(e){this.$element=t(e)}var t=window.jQuery,n=window.Waypoint;t.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(t,n){e.prototype[n]=function(){var e=Array.prototype.slice.call(arguments);return this.$element[n].apply(this.$element,e)}}),t.each(["extend","inArray","isEmptyObject"],function(n,i){e[i]=t[i]}),n.adapters.push({name:"jquery",Adapter:e}),n.Adapter=e}(),function(){"use strict";function e(e){return function(){var n=[],i=arguments[0];return e.isFunction(arguments[0])&&(i=e.extend({},arguments[1]),i.handler=arguments[0]),this.each(function(){var r=e.extend({},i,{element:this});"string"==typeof r.context&&(r.context=e(this).closest(r.context)[0]),n.push(new t(r))}),n}}var t=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=e(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=e(window.Zepto))}();