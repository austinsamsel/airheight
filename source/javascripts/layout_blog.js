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

$( document ).ready(function() {
  navMenu();

  $('form').garlic();

  var $contactForm = $('form');
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
        $contactForm.append('<div class="alert alert--loading"><div class="ui active inline loader small-loader"></div> Sending application…</div>');
      },
      success: function(data) {
        $contactForm.find('.alert--loading').hide();
        $contactForm.append('<div class="alert alert--success"><i class="fa fa-check green"></i> Application sent!</div>');
      },
      error: function(err) {
        $contactForm.find('.alert--loading').hide();
        $contactForm.append(' <div class="alert alert--error"><i class="fa fa-remove red"></i> Oops, there was an error.</div>');
      }
    });
  });
});