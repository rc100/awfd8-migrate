/**
 * @file
 * Intializing javascript equal heights.
 *
 * Docs: https://github.com/liabru/jquery-match-height
 */

// Load equal heights library.
require('jquery-match-height');

(function ($) {
  // DOC READY
  $(function () {

    // Initialize equal heights on a selector.
    $('.eqheight').matchHeight();

  });
})(jQuery);
