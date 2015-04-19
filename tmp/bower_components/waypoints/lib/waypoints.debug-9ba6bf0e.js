/*!
Waypoints Debug - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function i(){var i=window.Waypoint.Context.prototype.refresh;window.Waypoint.Context.prototype.refresh=function(){for(var e in this.waypoints)for(var t in this.waypoints[e]){var a=this.waypoints[e][t],r=window.getComputedStyle(a.element);a.enabled&&(r&&"none"===r.display&&console.error(o),r&&"fixed"===r.position&&console.error(n))}return i.call(this)}}var o=["You have a Waypoint element with display none. For more information on ","why this is a bad idea read ","http://imakewebthings.com/waypoints/guides/debugging/#display-none"].join(""),n=["You have a Waypoint element with fixed positioning. For more ","information on why this is a bad idea read ","http://imakewebthings.com/waypoints/guides/debugging/#fixed-position"].join("");i()}();