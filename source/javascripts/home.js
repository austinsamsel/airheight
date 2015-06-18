// source/js/all.js
//= require jquery
//= require jQuery-One-Page-Nav/jquery.nav.js
//= require typed.js/js/typed
//= require blazy.min.js
//= require garlicjs/dist/garlic.min.js
//= require parsleyjs/dist/parsley

$(document).ready(function() {

    $navBar = $('.nav-sm');

    var loadBGs = function() {
      $('.slide-creators').addClass('loadImage-creators');
      $('.slide-madepulse').addClass('loadImage-madepulse');
      $('.slide-bfp').addClass('loadImage-bfp');
      $('.slide-calico').addClass('loadImage-calico');
      $('.slide-haiku').addClass('loadImage-haiku');
    };
    var navMenu = function(){
      var menuToggle = $('#js-mobile-menu').unbind();
      $('#js-navigation-menu').removeClass("show");

      menuToggle.on('click', function(e) {
        e.preventDefault();
        $('#js-navigation-menu').slideToggle(function(){
          if($('#js-navigation-menu').is(':hidden')) {
            $('#js-navigation-menu').removeAttr('style');
          }
        });
      });
    };

          
          navMenu();

          $('.navigation-wrapper').onePageNav({
              currentClass: 'current',
              changeHash: false,
              scrollSpeed: 750,
              scrollThreshold: 0.5,
              filter: '',
              easing: 'swing',
              begin: function() {
                  //I get fired when the animation is starting
              },
              end: function() {
                  //I get fired when the animation is ending
              },
              scrollChange: function($currentListItem) {
                  //I get fired when you enter a section and I pass the list item of the section
              }
          });
          
              $("#hero-story").typed({
                  strings: ["Let's make life ^500better ^1000:^800)^500","<a href='#Contact'>How can I help^800?</a>"],
                  typeSpeed: 20,
                  backDelay: 500,
                  loop: false,
                  loopCount: false
              });

              var $contactForm = $('#contactform');
              $contactForm.submit(function(e) {
                e.preventDefault();
                $.ajax({
                  url: '//formspree.io/hi@hightopsnyc.com',
                  method: 'POST',
                  data: $(this).serialize(),
                  dataType: 'json',
                  beforeSend: function() {
                    $contactForm.find('.alert--success').hide();
                    $contactForm.find('.alert--error').hide();
                    $contactForm.append('<div class="alert alert--loading"><div class="ui active inline loader small-loader"></div> Sending message…</div>');
                  },
                  success: function(data) {
                    $contactForm.find('.alert--loading').hide();
                    $contactForm.append('<div class="alert alert--success"><i class="fa fa-check green"></i> Message sent!</div>');
                    $contactForm.each(function(){
                        this.reset();
                    });
                  },
                  error: function(err) {
                    $contactForm.find('.alert--loading').hide();
                    $contactForm.append(' <div class="alert alert--error"><i class="fa fa-remove red"></i> Oops, there was an error.</div>');
                  }
                });
              });

          $('img').addClass('b-lazy');
          ;(function() {
            // Initialize
            var bLazy = new Blazy({ 
                  offset: 9999999999999,
                  //selector: 'img', // all images
                  breakpoints: [
                  {
                      width: 1000, // max-width
                      src: 'data-src-small'
                  },
                  // {
                  //     width: 3000, // max-width
                  //     src: 'data-src-medium'
                  // }
                  ]
              });
          })();   

});          
      