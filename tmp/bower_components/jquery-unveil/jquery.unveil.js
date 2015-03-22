/**
 * jQuery Unveil
 * A very lightweight jQuery plugin to lazy load images
 * http://luis-almeida.github.com/unveil
 *
 * Licensed under the MIT license.
 * Copyright 2013 Luís Almeida
 * https://github.com/luis-almeida
 */
!function(t){t.fn.unveil=function(i,e){function n(){var i=c.filter(function(){var i=t(this);if(!i.is(":hidden")){var e=o.scrollTop(),n=e+o.height(),r=i.offset().top,u=r+i.height();return u>=e-s&&n+s>=r}});r=i.trigger("unveil"),c=c.not(r)}var r,o=t(window),s=i||0,u=window.devicePixelRatio>1,a=u?"data-src-retina":"data-src",c=this;return this.one("unveil",function(){var t=this.getAttribute(a);t=t||this.getAttribute("data-src"),t&&(this.setAttribute("src",t),"function"==typeof e&&e.call(this))}),o.scroll(n),o.resize(n),n(),this}}(window.jQuery||window.Zepto);