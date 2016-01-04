function createFxNow(){return setTimeout(function(){fxNow=void 0}),fxNow=jQuery.now()}function createTween(e,t,n){for(var r,i=(tweeners[t]||[]).concat(tweeners["*"]),o=0,u=i.length;u>o;o++)if(r=i[o].call(n,t,e))return r}function Animation(e,t,n){var r,i,o=0,u=animationPrefilters.length,s=jQuery.Deferred().always(function(){delete a.elem}),a=function(){if(i)return!1;for(var t=fxNow||createFxNow(),n=Math.max(0,f.startTime+f.duration-t),r=n/f.duration||0,o=1-r,u=0,a=f.tweens.length;a>u;u++)f.tweens[u].run(o);return s.notifyWith(e,[f,o,n]),1>o&&a?n:(s.resolveWith(e,[f]),!1)},f=s.promise({elem:e,props:jQuery.extend({},t),opts:jQuery.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:fxNow||createFxNow(),duration:n.duration,tweens:[],createTween:function(t,n){var r=jQuery.Tween(e,f.opts,t,n,f.opts.specialEasing[t]||f.opts.easing);return f.tweens.push(r),r},stop:function(t){var n=0,r=t?f.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)f.tweens[n].run(1);return t?s.resolveWith(e,[f,t]):s.rejectWith(e,[f,t]),this}}),l=f.props;for(propFilter(l,f.opts.specialEasing);u>o;o++)if(r=animationPrefilters[o].call(f,e,l,f.opts))return r;return jQuery.map(l,createTween,f),jQuery.isFunction(f.opts.start)&&f.opts.start.call(e,f),jQuery.fx.timer(jQuery.extend(a,{elem:e,anim:f,queue:f.opts.queue})),f.progress(f.opts.progress).done(f.opts.done,f.opts.complete).fail(f.opts.fail).always(f.opts.always)}function propFilter(e,t){var n,r,i,o,u;for(n in e)if(r=jQuery.camelCase(n),i=t[r],o=e[n],jQuery.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),u=jQuery.cssHooks[r],u&&"expand"in u){o=u.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}function defaultPrefilter(e,t,n){var r,i,o,u,s,a,f=this,l={},p=e.style,y=e.nodeType&&isHidden(e),c=jQuery._data(e,"fxshow");n.queue||(s=jQuery._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,a=s.empty.fire,s.empty.fire=function(){s.unqueued||a()}),s.unqueued++,f.always(function(){f.always(function(){s.unqueued--,jQuery.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===jQuery.css(e,"display")&&"none"===jQuery.css(e,"float")&&(jQuery.support.inlineBlockNeedsLayout&&"inline"!==css_defaultDisplay(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",jQuery.support.shrinkWrapBlocks||f.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],rfxtypes.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(y?"hide":"show"))continue;l[r]=c&&c[r]||jQuery.style(e,r)}if(!jQuery.isEmptyObject(l)){c?"hidden"in c&&(y=c.hidden):c=jQuery._data(e,"fxshow",{}),o&&(c.hidden=!y),y?jQuery(e).show():f.done(function(){jQuery(e).hide()}),f.done(function(){var t;jQuery._removeData(e,"fxshow");for(t in l)jQuery.style(e,t,l[t])});for(r in l)u=createTween(y?c[r]:0,r,f),r in c||(c[r]=u.start,y&&(u.end=u.start,u.start="width"===r||"height"===r?1:0))}}function Tween(e,t,n,r,i){return new Tween.prototype.init(e,t,n,r,i)}function genFx(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=cssExpand[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}var fxNow,timerId,rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=new RegExp("^(?:([+-])=|)("+core_pnum+")([a-z%]*)$","i"),rrun=/queueHooks$/,animationPrefilters=[defaultPrefilter],tweeners={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=rfxnum.exec(t),o=i&&i[3]||(jQuery.cssNumber[e]?"":"px"),u=(jQuery.cssNumber[e]||"px"!==o&&+r)&&rfxnum.exec(jQuery.css(n.elem,e)),s=1,a=20;if(u&&u[3]!==o){o=o||u[3],i=i||[],u=+r||1;do s=s||".5",u/=s,jQuery.style(n.elem,e,u+o);while(s!==(s=n.cur()/r)&&1!==s&&--a)}return i&&(u=n.start=+u||+r||0,n.unit=o,n.end=i[1]?u+(i[1]+1)*i[2]:+i[2]),n}]};jQuery.Animation=jQuery.extend(Animation,{tweener:function(e,t){jQuery.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");for(var n,r=0,i=e.length;i>r;r++)n=e[r],tweeners[n]=tweeners[n]||[],tweeners[n].unshift(t)},prefilter:function(e,t){t?animationPrefilters.unshift(e):animationPrefilters.push(e)}}),jQuery.Tween=Tween,Tween.prototype={constructor:Tween,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(jQuery.cssNumber[n]?"":"px")},cur:function(){var e=Tween.propHooks[this.prop];return e&&e.get?e.get(this):Tween.propHooks._default.get(this)},run:function(e){var t,n=Tween.propHooks[this.prop];return this.pos=t=this.options.duration?jQuery.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):Tween.propHooks._default.set(this),this}},Tween.prototype.init.prototype=Tween.prototype,Tween.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=jQuery.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){jQuery.fx.step[e.prop]?jQuery.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[jQuery.cssProps[e.prop]]||jQuery.cssHooks[e.prop])?jQuery.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},jQuery.each(["toggle","show","hide"],function(e,t){var n=jQuery.fn[t];jQuery.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(genFx(t,!0),e,r,i)}}),jQuery.fn.extend({fadeTo:function(e,t,n,r){return this.filter(isHidden).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=jQuery.isEmptyObject(e),o=jQuery.speed(t,n,r),u=function(){var t=Animation(this,jQuery.extend({},e),o);(i||jQuery._data(this,"finish"))&&t.stop(!0)};return u.finish=u,i||o.queue===!1?this.each(u):this.queue(o.queue,u)},stop:function(e,t,n){var r=function(e){var t=e.stop;delete e.stop,t(n)};return"string"!=typeof e&&(n=t,t=e,e=void 0),t&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,i=null!=e&&e+"queueHooks",o=jQuery.timers,u=jQuery._data(this);if(i)u[i]&&u[i].stop&&r(u[i]);else for(i in u)u[i]&&u[i].stop&&rrun.test(i)&&r(u[i]);for(i=o.length;i--;)o[i].elem!==this||null!=e&&o[i].queue!==e||(o[i].anim.stop(n),t=!1,o.splice(i,1));(t||!n)&&jQuery.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=jQuery._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=jQuery.timers,u=r?r.length:0;for(n.finish=!0,jQuery.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;u>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}}),jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){jQuery.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),jQuery.speed=function(e,t,n){var r=e&&"object"==typeof e?jQuery.extend({},e):{complete:n||!n&&t||jQuery.isFunction(e)&&e,duration:e,easing:n&&t||t&&!jQuery.isFunction(t)&&t};return r.duration=jQuery.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in jQuery.fx.speeds?jQuery.fx.speeds[r.duration]:jQuery.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){jQuery.isFunction(r.old)&&r.old.call(this),r.queue&&jQuery.dequeue(this,r.queue)},r},jQuery.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},jQuery.timers=[],jQuery.fx=Tween.prototype.init,jQuery.fx.tick=function(){var e,t=jQuery.timers,n=0;for(fxNow=jQuery.now();n<t.length;n++)e=t[n],e()||t[n]!==e||t.splice(n--,1);t.length||jQuery.fx.stop(),fxNow=void 0},jQuery.fx.timer=function(e){e()&&jQuery.timers.push(e)&&jQuery.fx.start()},jQuery.fx.interval=13,jQuery.fx.start=function(){timerId||(timerId=setInterval(jQuery.fx.tick,jQuery.fx.interval))},jQuery.fx.stop=function(){clearInterval(timerId),timerId=null},jQuery.fx.speeds={slow:600,fast:200,_default:400},jQuery.fx.step={},jQuery.expr&&jQuery.expr.filters&&(jQuery.expr.filters.animated=function(e){return jQuery.grep(jQuery.timers,function(t){return e===t.elem}).length});