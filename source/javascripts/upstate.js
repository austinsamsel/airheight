    $(document).ready(function() {

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

        $navBar = $('.upstate-nav-sm');
        var slideDown = function() {
          $navBar.animate({top: '0em', opacity: 1.0}, 600);
        };
        var slideUp = function() {
          $navBar.animate({top: '-4em', opacity: 0.0}, 600);
        };

        $('#fullpage').fullpage({
          anchors: ['Home', 'Overview', 'Features', 'Success', 'Themes', 'Pricing', 'About', 'Apply', 'Contact'],
          responsive: 5000,
          controlArrows: true,
          slidesNavigation: true,
          showActiveTooltips: true,
          fitToSection: false,
          animateAnchor: true,
          scrollBar: true,
          scrollingSpeed: 1900,
          //menu:'#js-navigation-menu',
          css3: true,
          slidesNavPosition: 'bottom',
          afterRender: function(){

              var delay=750;
              setTimeout(function(){
                 $('.upstate-hero').addClass('visible animated slideInUp');
              }, delay);
              
              navMenu();

              $('img').addClass('b-lazy');
              ;(function() {
                // Initialize
                var bLazy = new Blazy({ 
                      offset: 300,
                      breakpoints: [{
                          width: 768 // max-width
                        , src: 'data-src-small'
                     }
                         , {
                          width: 992 // max-width
                        , src: 'data-src-medium'
                }]
                });
              })();
              // contact upstate
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
                 // apply upstate
                  var $upstateApply = $('#upstateApply');
                  $upstateApply.submit(function(e) {
                    e.preventDefault();
                    $.ajax({
                      url: '//formspree.io/hi@hightopsnyc.com',
                      method: 'POST',
                      data: $(this).serialize(),
                      dataType: 'json',
                      beforeSend: function() {
                        $upstateApply.find('.alert--success').hide();
                        $upstateApply.find('.alert--error').hide();
                        $upstateApply.append('<div class="alert alert--loading"><div class="ui active inline loader small-loader"></div> Sending…</div>');
                      },
                      success: function(data) {
                        $upstateApply.find('.alert--loading').hide();
                        $upstateApply.append("<div class='alert alert--success'><i class='fa fa-check green'></i> Success! We'll be in touch.</div>");
                      },
                      error: function(err) {
                        $upstateApply.find('.alert--loading').hide();
                        $upstateApply.append(' <div class="alert alert--error"><i class="fa fa-remove red"></i> Oops, there was an error.</div>');
                      }
                    });
                  });
          },
          afterLoad: function(anchorLink, index){
              var loadedSection = $(this);
              if(index != 999){
              }
          },
          onLeave: function(index, nextIndex, direction){
            var leavingSection = $(this);
            if(index == 5){
              slideDown();
            }
          },
          afterSlideLoad: function( anchorLink, index, slideAnchor, slideIndex){
              var loadedSlide = $(this);

              //first slide of the second section

              if(index == 5 && slideIndex == 0){
                  slideDown();
                  $('.fp-controlArrow.fp-prev').css('display', 'none');
                  var bLazy = new Blazy();
                      bLazy.revalidate(); // eg bLazy.revalidate();
              }
              if(index == 5 && slideIndex != 0){
                  slideUp();
                  $('.fp-controlArrow.fp-prev').css('display', 'block');
                  var bLazy = new Blazy();
                      bLazy.revalidate(); // eg bLazy.revalidate();
              }
          }
        });
    });