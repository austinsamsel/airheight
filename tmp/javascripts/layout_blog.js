$(document).ready(function(){var e=function(){var e=$("#js-mobile-menu").unbind();$("#js-navigation-menu").removeClass("show"),e.on("click",function(e){e.preventDefault(),$("#js-navigation-menu").slideToggle(function(){$("#js-navigation-menu").is(":hidden")&&$("#js-navigation-menu").removeAttr("style")})})};e(),$("#upStateApp").garlic();var a=$("#upStateApp");a.submit(function(e){e.preventDefault(),$.ajax({url:"//formspree.io/hi@hightopsnyc.com",method:"POST",data:$(this).serialize(),dataType:"json",beforeSend:function(){a.find(".alert--success").hide(),a.find(".alert--error").hide(),a.append('<div class="alert alert--loading"><div class="ui active inline loader small-loader"></div> Sending message\u2026</div>')},success:function(){a.find(".alert--loading").hide(),a.append('<div class="alert alert--success"><i class="fa fa-check green"></i> Message sent!</div>')},error:function(){a.find(".alert--loading").hide(),a.append(' <div class="alert alert--error"><i class="fa fa-remove red"></i> Oops, there was an error.</div>')}})})});