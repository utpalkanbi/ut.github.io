(function($) {

  "use strict";

  $(window).on('load', function() {

	    $("body").queryLoader2({
		barColor: "#f1c40f",
        backgroundColor: "#f8f8f8",
        percentage: true,
        barHeight: 2,
        minimumTime: 200,
        fadeOutTime: 1000
		});

    //Animated Background Slider
    $('#backgrounds.animated').flexslider({
      animation: "fade",
      directionNav: false,
      controlNav: true,
      keyboard: false,
      slideshowSpeed: 8000,
      start: function () {
        $('#backgrounds').find(".slides > li.flex-active-slide").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1)',
            '-moz-transform': 'scale(1)',
            'transform': 'scale(1)'
          });
        })
      },
      before: function () {
        $('#backgrounds').find(".slides > li").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1.1)',
            '-moz-transform': 'scale(1.1)',
            'transform': 'scale(1.1)'
          });
        })
      },
      after: function () {
        $('#backgrounds').find(".slides > li.flex-active-slide").each(function () {
          var $content = $(this);
          $content.css({
            '-webkit-transform': 'scale(1)',
            '-moz-transform': 'scale(1)',
            'transform': 'scale(1)'
          });
        })
      },
    });

    //Not Animated Background Slider
    $('#backgrounds.not-animated').flexslider({
      animation: "fade",
      directionNav: false,
      controlNav: false,
      keyboard: false,
      slideshowSpeed: 8000
    });

    //Home text rotator
    $('#home-slider').flexslider({
      animation: "slide",
      directionNav: false,
      controlNav: false,
      slideshowSpeed: 8000,
      direction: "vertical",
      animationSpeed: 800
    });

    //Video background
      $(".player").mb_YTPlayer({
        containment: '#video-wrapper',
        mute: true,
		showControls: false,
        quality: 'default',
		startAt: 5
      });

    //Portfolio masonry
    var $container = $('#projects');
    $container.isotope({
      masonry: {
       columnWidth: 0
      },
      itemSelector: '.project'
    });

    //Portfolio filters
    $('#filters').on( 'click', 'li', function() {
      $('#filters li').removeClass('active');
      $(this).addClass('active');
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
    });

  });

  //Topnav transition
  $(window).scroll(function(event) {
    if ($(document).scrollTop() >= $('#home').height() / 6) {
      $('#topnav').addClass('scrolled');
    } else{
      $('#topnav').removeClass('scrolled');
    }
  }).trigger('scroll');

  //Topnav Mobile-view toggle
  $('.navbar-toggle').on('click', function(event) {
    $(this).toggleClass('active');
  });

  // Show and hide color-switcher
  $(".color-switcher .switcher-button").on( 'click', function(){
	$( ".color-switcher" ).toggleClass("show-color-switcher", "hide-color-switcher", 800);
  });

  // Color Skins
  $('a.color').on( 'click', function(){
	var title = $(this).attr('title');
	$('#style-colors').attr('href', 'css/skin-' + title + '.css');
	return false;
  });

  //Close responsive nav
  $('#navigation li a').on('click', function() {
    if ($(window).width() < 768) {
      $('.navbar-toggle').on( 'click');
    }
  });

  //Navigation Scrolling
  $('a[href*=#]').on( 'click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 700);
        return false;
      }
    }
  });

  //Toggle menu button transition
  $(window).scroll(function(event) {
    if ($(document).scrollTop() >= $('#home,#blog-header').height()) {
      $('#menu-toggle').addClass('dark');
    } else{
      $('#menu-toggle').removeClass('dark');
    }
  }).trigger('scroll');


  //Sidebar open
  $('#menu-left #menu-toggle').on('click', function(event) {
    $(this).toggleClass('active');
    $('#menu-left').toggleClass('open');
  });
  $('#menu-right #menu-toggle').on('click', function(event) {
    $(this).toggleClass('active');
    $('#menu-right').toggleClass('open');
  });
  $('#menu-fade #menu-toggle').on('click', function(event) {
    $(this).toggleClass('active');
    $('#menu-fade').toggleClass('open');
  });

  //Sidebar Navigation
  $('#main-menu a').on( 'click', function(event) {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
      }
    }
    var timeSet = setTimeout(function(e){
      $('#menu-toggle').trigger('click');
    }, 1000);

	clearTimeout(timeSet);
    return false;
  });

  //Elements animation
  $('.animated').appear(function(){
    var element = $(this);
    var animation = element.data('animation');
    var animationDelay = element.data('delay');
    if (animationDelay) {
    var timeSet =  setTimeout(function(){
        element.addClass( animation + " visible" );
        if (element.hasClass('counter')) {
          element.find('.value').countTo();
        }
      }, animationDelay);
    } else{
      element.addClass( animation + " visible" );
      if (element.hasClass('counter')) {
        element.find('.value').countTo();
      }
		clearTimeout(timeSet);
    }
  },{accY: -150});

  $(window).resize(function() {
	var $container = $('#projects');
	$container.isotope({});

   $('#projects').isotope('reloadItems');
  });

  //Background images
  $('#backgrounds img').each(function() {
    var image = $(this).attr('src');
    $(this).parents('li').css('background-image', 'url('+image+')');
    $(this).remove();
  });

  // Side Images
  $('.bg-img').each(function() {
    var image = $(this).attr('src');
    $(this).parents('.img-holder').css('background-image', 'url('+image+')');
    $(this).remove();
  });

  //Portfolio Modal
  $('.project-overlay a').on('click', function(){
    var projectUrl = $(this).attr("href");

    var project = '<div class="modal fade" id="project-modal"><div class="modal-dialog"><div class="modal-content"></div></div></div>';

    $(project).modal({
      remote: projectUrl + ' #project'
    })

    return false;

  });

  //Testimonials slides
  $('#testimonials-slider').flexslider({
    directionNav: false,
    animation: "slide"
  });
  //Members slides
  $('#members-slider').flexslider({
    directionNav: false,
    animation: "fade",
	pauseOnHover: true
  });

  //Blog Carousel
  $("#blog-carousel2").owlCarousel({
    items : 2,
    itemsDesktop : [1000,2],
    itemsDesktopSmall : [900,2],
    itemsTablet: [600,2],
    itemsMobile : [480,1],
    autoPlay: true,
	stopOnHover: true,
    pagination: true,
    navigation: false,
    navigationText: ['', '']
  });
  $("#blog-carousel").owlCarousel({
    items : 3,
    itemsDesktop : [1000,3],
    itemsDesktopSmall : [900,2],
    itemsTablet: [600,2],
    itemsMobile : [480,1],
    autoPlay: true,
	stopOnHover: true,
    pagination: true,
    navigation: false,
    navigationText: ['', '']
  });
  //On Click Open Contact form Index5
  $('#trigger-overlay').on( 'click', function() {
      $('#contact-panel').addClass('open');
    });
  $('#contact-panel .overlay-close').on( 'click', function() {
      $('#contact-panel').removeClass('open');
    });

  //Notify me

    $("#notifyMe").notifyMe();

  //Google Maps
  function initMap() {
    var myLatlng = new google.maps.LatLng(51.566439, -0.288216); // <- Your latitude and longitude
    var styles = [{"featureType":"water","stylers":[{"visibility":"on"},{"color":"#acbcc9"}]},{"featureType":"landscape","stylers":[{"color":"#f2e5d4"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#c5c6c6"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#e4d7c6"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#fbfaf7"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#c5dac6"}]},{"featureType":"administrative","stylers":[{"visibility":"on"},{"lightness":33}]},{"featureType":"road"},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":20}]},{},{"featureType":"road","stylers":[{"lightness":20}]}]

    var mapOptions = {
      zoom: 15,
      center: myLatlng,
	  mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      disableDefaultUI: true,
      zoomControl: false,
      scrollwheel: false,
      styles: styles
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var infowindow = new google.maps.InfoWindow({
        content: "We are here!"
    });

    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: 'images/pin.png',
        title: 'We are here!'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  }

  if ($('#map').length) {
    google.maps.event.addDomListener(window, 'load', initMap);
    $('#map').css('position', 'absolute');
  }


})(jQuery);

    //Placeholder

    $('input,textarea').on( 'focus', function(){
       $(this).data('placeholder',$(this).attr('placeholder'))
       $(this).attr('placeholder','');
    });
    $('input,textarea').blur(function(){
       $(this).attr('placeholder',$(this).data('placeholder'));
    });

	$('input, textarea').placeholder();

	//Tabs
    $('#skillsTab a').on( 'click', function (e) {
        e.preventDefault()
        $(this).tab('show')
    })
