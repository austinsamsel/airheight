$(document).ready(function() {
    $navBar = $('.nav-sm');
    var slideDown = function() {
      $navBar.animate({top: '0em'}, 100);
    };
    var slideUp = function() {
      $navBar.animate({top: '-2em'}, 100);
    };
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
    $('#fullpage').fullpage({
      anchors: ['Home', 'Praise', 'Services', 'Praise2', 'Work', 'About', 'Contact'],
      responsive: 50000,
      controlArrows: true,
      slidesNavigation: true,
      showActiveTooltips: true,
      fitToSection: false,
      animateAnchor: true,
      scrollBar: true,
      scrollingSpeed: 1900,
      menu:'#js-centered-navigation-menu',
      css3: true,
      slidesNavPosition: 'bottom',
      afterRender: function(){
          
          navMenu();
          
          $("#hero-story").typed({
                  strings: ["We create realities^500.", "We engineer^500 experiences^800.", "We make life ^500better ^1000:^800)^500","<a href='#Contact'>How can we help^800?</a>"],
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
                  },
                  error: function(err) {
                    $contactForm.find('.alert--loading').hide();
                    $contactForm.append(' <div class="alert alert--error"><i class="fa fa-remove red"></i> Oops, there was an error.</div>');
                  }
                });
              });

          // var waypoints = $('#services').waypoint(function(direction) {
              
          //     //$('.fp-slidesNav.bottom').addClass('fadeIn');
          //   }, {
          //     offset: '0%'
          //   }); 
          // var waypoints = $('#slide-tester').waypoint(function(direction) {
          //     $('.slide-test').addClass('slideLeft');
          //     //$('.fp-slidesNav.bottom').addClass('fadeIn');
          //   }, {
          //     offset: '25%'
          //   }); 
          $('img').addClass('b-lazy');
          ;(function() {
            // Initialize
            var bLazy = new Blazy({ 
                  offset: 300,
                  //selector: 'img', // all images
                  breakpoints: [{
                      width: 2000, // max-width
                      src: 'data-src-small'
                  },
                  {
                      width: 3000, // max-width
                      src: 'data-src-medium'
                  }]
              });
          })();             
      },
      afterLoad: function(anchorLink, index){
          var loadedSection = $(this);
          if(index == 1){
              slideUp();
          }
          if (index == 5){
            $('.fp-slidesNav.bottom').addClass('slideExpandUp');
            //$('.slide-test').addClass('slideLeft');
          }
          if (index == 3){
            //$('.fa-check').addClass('hatch');
            // $('.fa-check').each(function(i) {
            //     $(this).children().delay(700*i).addClass('hatch');
            // });
          }
      },
      onLeave: function(index, nextIndex, direction){
        var leavingSection = $(this);
        if (direction == 'up' || direction == 'down'){
          loadBGs();
          //email();
        }
        if(index == 1){
          slideDown();
        }
        if(index == 2 && direction == 'up'){
          slideUp();
        }
        if(index == 5){
          slideDown();
        }
      },
      afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
          var loadedSlide = $(this);
          // used to be anchorLink == 'About' instead of index == 6
          // need to test if this works.
          if(index == 5 && slideIndex > 0){
              slideUp();
              $('.fp-controlArrow.fp-prev').css('display', 'block');
              var bLazy = new Blazy();
                  bLazy.revalidate(); // eg bLazy.revalidate();
          }
          if(index == 5 && slideIndex == 0){
              slideDown();
              $('.fp-controlArrow.fp-prev').css('display', 'none');
              var bLazy = new Blazy();
                  bLazy.revalidate(); // eg bLazy.revalidate();
          }
      }
    });
});