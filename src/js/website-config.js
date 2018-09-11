//Smoothstate config
$(function(){
  'use strict';
  var options = {
    prefetch: false,
    cacheLength: 2,
		repeatDelay: 500,
		blacklist: '.navProjets .active, .topButton, .sm a, .contactEmail a',
		onBefore: function($currentTarget, $container) {
			var targetProjectClass = $currentTarget.attr('class');
      $("#loadingScreen").addClass(targetProjectClass);
		},
    onStart: {
      duration: 500,
      render: function ($container) {
        $("#loadingScreen").addClass('expand');
				$("body").css({overflow: 'visible'});
      }
    },
	onProgress: {
      duration: 2000,
      render: function ($container) {}
    },
    onReady: {
      duration: 500,
      render: function ($container, $newContent) {
        $container.html($newContent); // Inject the new content
				initialize();
				$("#loadingScreen").addClass('exit');
        $("#loadingScreen").removeClass('expand');
      }
    },
	onAfter: function() {
		var currentLoadingScreenClass = $("#loadingScreen").attr('class');
		$("#loadingScreen").removeClass(currentLoadingScreenClass);
		var title = document.getElementsByTagName("title")[0].innerHTML;
		window.dataLayer = window.dataLayer || [];
		window.dataLayer.push({
		  event: 'Virtual Page View',
		  pageTitle: title
		});
	}
  },
  smoothState = $('#main').smoothState(options).data('smoothState');
});

//test browser width
function getBrowserWidth() {
  return $( window ).width();
}

//Opeing and closing of the navigaiton
function openNav() {
  "use strict";

  var hamburgerButton = document.querySelectorAll(".c-hamburger")[0];
	var nav = document.getElementById("nav");

  toggleHandler(hamburgerButton);
  function toggleHandler(toggle) {
    toggle.addEventListener( "click", function(e) {
      if (this == hamburgerButton) {
        e.preventDefault();
      }
      if (hamburgerButton.classList.contains("is-active") === true) {
        hamburgerButton.classList.remove("is-active");
				nav.classList.remove("is-active");
				document.body.setAttribute("style","overflow: visible;");
      } else {
        hamburgerButton.classList.add("is-active");
				nav.classList.add("is-active");
				document.body.setAttribute("style","overflow: hidden;");
      }
    });

  }
}

//Sticky Home Background
function stickySidebar() {
	$(window).scroll(function() {
			 if ($(this).scrollTop() >= ($( window ).height())) {
				$( '.home .background' ).addClass("fixed");
			 }
			 else {
				$( '.home .background' ).removeClass("fixed");
			 }
	 });
}

// //extend footer to the right side of browser
// function extendFooter() {
// 	var windowWidth = getBrowserWidth();
// 	var footerInfoWidth = windowWidth - 350;
// 	$( "#footerInfo").css({ width: footerInfoWidth });
// }

//Clicking on already active menu item
function activeMenuItem() {
  "use strict";

	var activeItem = document.querySelectorAll("#nav .active")[0];
	var hamburgerButton = document.querySelectorAll(".c-hamburger")[0];
	var nav = document.getElementById("nav");
	if(activeItem !== undefined) {
		toggleHandler(activeItem);
		function toggleHandler(toggle) {
			toggle.addEventListener( "click", function(e) {
					e.preventDefault();
					hamburgerButton.classList.remove("is-active");
					nav.classList.remove("is-active");
					document.body.setAttribute("style","overflow: visible;");
			});
		}
	}
}

// //Display mobile sticky heading below fold
// function displayStickyHeading() {
// 	$(window).scroll(function() {
// 		 if ($(this).scrollTop() >= ($(window).height())) {
// 			$( '#mobileStickyHeading' ).addClass("show");
// 		 }
// 		 else {
// 			$( '#mobileStickyHeading' ).removeClass("show");
// 		 }
// 	});
// }

//Scroll load assets
function showImages(el) {
  var windowHeight = $( window ).height();
	$(window).scroll(function() {
	  $(el).each(function(){
	    var thisPos = $(this).offset().top;
	    var topOfWindow = $(window).scrollTop();
			if ($(this).is("#aboutMe")) {
			    if (topOfWindow + windowHeight - (windowHeight/1.5) > thisPos ) {
			        $(this).addClass("fadeIn");
			    }
				} else {
			    if (topOfWindow + windowHeight - (windowHeight/4) > thisPos ) {
			        $(this).addClass("fadeIn");
			    }
			}
	  });
	});
}

//Showcase Images
function showcaseImages() {
	$('.gridImage').each(function() {
		var imageHeight = $(this).height();
		var imageShift = -1 * (imageHeight - 20);
		$(this).css({ "top": imageShift+"px", "margin-bottom": imageShift+"px"  });
	});
}

//Add browser bars to images
function browserBars() {
	$('img.browser').before('<img src="img/browser.png" class="browserBar" />');
}

//Scroll to top bottons
function topButton() {
	$('.topButton').click(function() {
	    $('body, html').animate({
	        scrollTop : 0
	    }, 300);
	});
}

//Homepage Background Color Switch
function homeBackgroundColors() {
	$(window).scroll(function() {
		if ($(window).scrollTop() < $(window).height() ) {
			$( '.home .background' ).removeClass("chihuly zulily flatIronGrill dahliaBarn articulate");
			$( '.home .background' ).addClass("about");
		} else {
			$('.home #belowFold .row').each(function() {
				var middleOfWindow = $(window).scrollTop() + ($(window).height() / 2);
				var elementTop = $(this).offset().top;
				var elementBottom = $(this).offset().top + $(this).outerHeight();
				if (elementTop <= middleOfWindow && elementBottom > middleOfWindow) {
					$( '.home .background' ).removeClass("about chihuly zulily flatIronGrill dahliaBarn articulate");
					if ($(this).hasClass( "chihuly" )) {
						$( '.home .background' ).addClass("chihuly");
					} else if ($(this).hasClass( "zulily" )) {
						$( '.home .background' ).addClass("zulily");
					} else if ($(this).hasClass( "dahliaBarn" )) {
						$( '.home .background' ).addClass("dahliaBarn");
					} else if ($(this).hasClass( "flatIronGrill" )) {
						$( '.home .background' ).addClass("flatIronGrill");
					} else if ($(this).hasClass( "articulate" )) {
						$( '.home .background' ).addClass("articulate");
					}
				}
			});
		}
	});
}

//Homepage face fade
function faceFade() {
	if ($('#aboutMe').length > 0) {
		var aboutOffset = $('#aboutMe').offset().top;
		$(window).scroll(function(){
				var windowTop = $(window).scrollTop();
		    $(".lookingUp").css("opacity", 1 - ( windowTop / aboutOffset * 2 ) );
		});
	}
}


//Initialize all scripts
function initialize() {
	openNav();
	activeMenuItem();
	showImages('.fadeInObject');
	stickySidebar();
	showcaseImages();
	browserBars();
	topButton();
	homeBackgroundColors();
	faceFade();
	if ( $('.rellax').length ) {
		var rellax = new Rellax('.rellax');
	}
}
$( document ).ready(function() {
	initialize();
});

//Run on window resize
$( window ).resize(function() {
	faceFade();
	showcaseImages();
	homeBackgroundColors();
});
