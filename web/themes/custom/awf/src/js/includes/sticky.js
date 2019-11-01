/**
 * @file
 * Loading and Intializing javascript to make element sticky.
 *
 * Docs: https://github.com/leafo/sticky-kit/
 */

// Load sticky kit library.
require('sticky-kit');

(function ($) {
  // DOC READY
  $(function () {

    // Initialize sticky item within a parent.
    $('.make-sticky h2').stick_in_parent({
      parent: '.f-container'
    }).on("sticky_kit:stick", function (e) {
      // Add z-index value to be on top.
      $(this).css({
        'z-index': 1
      })
    });

  });
})(jQuery);
