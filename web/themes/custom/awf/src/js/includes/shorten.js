/**
 * @file
 * Loading and Intializing javascript to shorten text by character count.
 *
 * Docs: https://github.com/rayestrada/jquery.shorten
 */

// Load shorten library.
require('jquery-shorten-plus');

(function ($) {
  // DOC READY
  $(function () {

    // Initialize on selector.
    $('.shorten').shorten();

  });
})(jQuery);
