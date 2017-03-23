$( document ).ready(function() {

  $( "#nav-bar button" ).click(function() {
    $( "section.new-tweet" ).slideToggle( "400");
    $("section.new-tweet textarea").focus();
  });

});
