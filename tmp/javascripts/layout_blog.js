var navMenu=function(){var n=$("#js-mobile-menu").unbind();$("#js-navigation-menu").removeClass("show"),n.on("click",function(n){n.preventDefault(),$("#js-navigation-menu").slideToggle(function(){$("#js-navigation-menu").is(":hidden")&&$("#js-navigation-menu").removeAttr("style")})})};$(document).ready(function(){navMenu()});