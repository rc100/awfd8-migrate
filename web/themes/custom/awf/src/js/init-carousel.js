/**
 * @file
 * Owl Carousel
 * Loading and intializing a carousel library.
 *
 * Docs: https://www.owlcarousel.owlgraphic.com/docs/api-options.html
 */

// Load owl carousel library.
require('owl.carousel');
require('owl.carousel/dist/assets/owl.carousel.min.css');

(function ($) {
  // DOC READY
  $(function () {

    // Initialize owl carousel on a selector.
    var $owl = $('.owl-carousel');
    $owl.owlCarousel({
      items: 1,
      loop: true,
      autoplay: true,
      autoplayTimeout: 6000,
      autoplaySpeed: 1000,
      autoplayHoverPause: true,
      nav: true,
      navText: ['<a href="#" class="pd">previous slide</a>', '<a href="#" class="pd">next slide</a>'],
      dots: false
    }).after('<div class="owl-autoplay-controls"><a href="#" class="owl-start pd">Start</a><a href="#" class="owl-stop pd">Stop</a></div>');

    // Prevent default link interaction on carousel controls.
    $('a.pd').on('click', function(e) {
      e.preventDefault();
    });

    // Trigger start.
    $('.owl-start').on('click', function () {
      $owl.trigger('play.owl.autoplay', [1000])
    });

    // Trigger stop.
    $('.owl-stop').on('click', function () {
      $owl.trigger('stop.owl.autoplay')
    });
  });
})(jQuery);
