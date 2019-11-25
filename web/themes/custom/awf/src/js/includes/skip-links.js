/**
 * @file
 * Loading and Intializing javascript to animate skip links.
 *
 * Docs: https://github.com/flesler/jquery.scrollTo
 */

// Load scrollto library.
require('jquery.scrollto');

(function ($) {
  // DOC READY
  $(function () {

    // Initialize on selector.
    $('.skip-links').on('click', function () {
      var target = $(this).attr('href');
      $.scrollTo(target, 800, {
        onAfter: function () {
          $(target).focus();
        }
      });
    });

  });
})(jQuery);
