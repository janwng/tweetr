/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  $('textarea').keyup(function() {
    let value = $(this).val();
    let maxLength = 140;
    let remainingLength = maxLength - value.length;
    console.log(remainingLength);


    $(this).siblings('.counter').text(remainingLength);

    if (remainingLength < 0) {
      $(this).siblings('.counter').css("color", "red");
    } else {
      $(this).siblings('.counter').css("color", "black");
    }
  });

});
