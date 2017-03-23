/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$( document ).ready(function() {

  function createTweetElement(data) {
    var $tweet = $("<article>").addClass("tweet");

    var header = createHeader(data.user);
    $tweet.append(header);

    var content = createContent(data.content);
    $tweet.append(content);

    var footer = createFooter(data.created_at);
    $tweet.append(footer);

    return $tweet;
  }

  function createHeader(user) {
    var $header = $("<header>");
    $header.append($("<img>").attr('src', user.avatars.regular));
    $header.append($("<h2>").text(user.name));
    $header.append($("<p>").text(user.handle));
    return $header;
  }

  function createContent(content) {
    var $content = $("<section>").addClass("user-tweet");
    $content.append($("<p>").text(content.text));
    return $content;
  }

  function createFooter(timestamp) {
    var $footer = $("<footer>");
    $footer.append($("<p>").text(timestamp));

    var $divIcons = createFooterIcons();
    $footer.append($divIcons);
    return $footer;
  }

  function createFooterIcons() {
    var $footerIconsDiv = ($("<div>").addClass("footer-icons"));
    $footerIconsDiv.append($("<a>", {href: "/", html: $("<img>", {src: "https://cdn0.iconfinder.com/data/icons/typicons-2/24/flag-24.png"})}));
    $footerIconsDiv.append($("<a>", {href: "/", html: $("<img>", {src: "https://cdn3.iconfinder.com/data/icons/simple-files-1/128/Update-24.png"})}));
    $footerIconsDiv.append($("<a>", {href: "/", html: $("<img>", {src: "https://cdn3.iconfinder.com/data/icons/simple-files-1/128/Like-24.png"})}));

    return $footerIconsDiv;
  }

  function renderTweets(tweets) {
		$('.tweets-container').empty();

    for (var i = 0; i < tweets.length; i++) {
      var indvTweet = createTweetElement(tweets[i]);
      // console.log(tweets[i]);
      $('.tweets-container').prepend(indvTweet);
    }
		hoverIcons();
  }

  loadTweets();

  function hoverIcons() {
    $('.footer-icons').hide();

    $('.tweets-container article').hover(function () {
        $(this).find('.footer-icons').toggle();
      });
  }

	//get tweets from json database object
	function loadTweets() {
		$.ajax({
		  url: "/tweets",
			method: 'GET',
			success: function(result) {
				renderTweets(result);
			},
			error: function() {
				alert('ERROR: could not get your tweet!');
			}
		});
	}

	//post tweet when submit button is pressed on form
  $( ".new-tweet form" ).on( "submit", function( event ) {
    event.preventDefault();
    let $inputTweet = $('.new-tweet textarea');
    let $inputTweetText = $inputTweet.val();
		let $tweets = $('.tweets-container');
		let tweetObj = {
			tweet: $inputTweetText
		};

    if ($inputTweetText.length > 140) {
      alert("Your message must be shorter than 140 characters!");
    } else if ($inputTweetText === "") {
      alert("Please input something!");
    }

    console.log($('.new-tweet form').serialize());
    console.log({text: $inputTweetText});

		$.ajax({
		  url: "/tweets",
			method: 'POST',
			data: $('.new-tweet form').serialize(), //could also be data: {text: $inputTweetText}; whyyyyy????
			success: function() {
				//if successful you have to GET the tweet again after posting
				loadTweets();
				$inputTweet.val("");
				$inputTweet.focus();
			}
		});

	});
});
