/*!
Waypoints Sticky Element Shortcut - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function e(i){this.options=t.extend({},n.defaults,e.defaults,i),this.element=this.options.element,this.$element=t(this.element),this.createWrapper(),this.createWaypoint()}var t=window.jQuery,n=window.Waypoint;e.prototype.createWaypoint=function(){var e=this.options.handler;this.waypoint=new n(t.extend({},this.options,{element:this.wrapper,handler:t.proxy(function(t){var n=this.options.direction.indexOf(t)>-1,i=n?this.$element.outerHeight(!0):"";this.$wrapper.height(i),this.$element.toggleClass(this.options.stuckClass,n),e&&e.call(this,t)},this)}))},e.prototype.createWrapper=function(){this.$element.wrap(this.options.wrapper),this.$wrapper=this.$element.parent(),this.wrapper=this.$wrapper[0]},e.prototype.destroy=function(){this.$element.parent()[0]===this.wrapper&&(this.waypoint.destroy(),this.$element.removeClass(this.options.stuckClass).unwrap())},e.defaults={wrapper:'<div class="sticky-wrapper" />',stuckClass:"stuck",direction:"down right"},n.Sticky=e}();