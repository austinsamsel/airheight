$( document ).ready(function() {

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

  //$('#upStateApp').garlic();

  // var $contactForm = $('#upStateApp');
  // $contactForm.submit(function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     url: "//formspree.io/hi@hightopsnyc.com",
  //     method: 'POST',
  //     data: {message: 'hello'},
  //     //data: $(this).serialize(),
  //     dataType: 'json',
  //     beforeSend: function() {
  //       $contactForm.find('.alert--success').hide();
  //       $contactForm.find('.alert--error').hide();
  //       $contactForm.append('<div class="alert alert--loading"><div class="ui active inline loader small-loader"></div> Sending message…</div>');
  //     },
  //     success: function(data) {
  //       $contactForm.find('.alert--loading').hide();
  //       $contactForm.append('<div class="alert alert--success"><i class="fa fa-check green"></i> Message sent!</div>');
  //     },
  //     error: function(err) {
  //       $contactForm.find('.alert--loading').hide();
  //       $contactForm.append(' <div class="alert alert--error"><i class="fa fa-remove red"></i> Oops, there was an error.</div>');
  //     }
  //   });
  // });


});

$(document).ready(function(){
    var $contactFormApp = $('#upStateApp');
    $contactFormApp.submit(function(e) {
        e.preventDefault();
        $.ajax({
          url: '//formspree.io/hi@hightopsnyc.com',
          method: 'POST',
          data: $(this).serialize(),
          dataType: 'json',
          beforeSend: function() {
            $contactFormApp.find('.alert--success').hide();
            $contactFormApp.find('.alert--error').hide();
            $contactFormApp.append('<div class="alert alert--loading"><div class="ui active inline loader small-loader"></div> Submitting application…</div>');
          },
          success: function(data) {
            $contactFormApp.find('.alert--loading').hide();
            $contactFormApp.append('<div class="alert alert--success"><i class="fa fa-check green"></i> Application submitted!</div>');
          },
          error: function(err) {
            $contactFormApp.find('.alert--loading').hide();
            $contactFormApp.append(' <div class="alert alert--error"><i class="fa fa-remove red"></i> Oops, there was an error.</div>');
          }
        });
    });
});