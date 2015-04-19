/*!
Waypoints Debug - 3.1.1
Copyright © 2011-2015 Caleb Troughton
Licensed under the MIT license.
https://github.com/imakewebthings/waypoints/blog/master/licenses.txt
*/
!function(){"use strict";function e(){var e=window.Waypoint.Context.prototype.refresh;window.Waypoint.Context.prototype.refresh=function(){for(var i in this.waypoints)for(var r in this.waypoints[i]){var o=this.waypoints[i][r],s=window.getComputedStyle(o.element);o.enabled&&(s&&"none"===s.display&&console.error(t),s&&"fixed"===s.position&&console.error(n))}return e.call(this)}}var t=["You have a Waypoint element with display none. For more information on ","why this is a bad idea read ","http://imakewebthings.com/waypoints/guides/debugging/#display-none"].join(""),n=["You have a Waypoint element with fixed positioning. For more ","information on why this is a bad idea read ","http://imakewebthings.com/waypoints/guides/debugging/#fixed-position"].join("");e()}();