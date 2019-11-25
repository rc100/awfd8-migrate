/**
 * @file
 * Common javascript file for loading scripts.
 *
 */

// Import scripts.
// require('./includes/eqheights');
// require('./includes/accordion');
// require('./includes/table');
// require('./includes/throttle');
// require('./includes/viewport');
require('./includes/dlmenu');
// require('./includes/menu');
// require('./includes/share');
// require('./includes/shorten');
// require('./includes/skip-links');
require('./includes/form');
// require('./includes/tabs');
// require('./includes/sticky');
require('./includes/loading-button');
// Lazysizes documentation: https://github.com/aFarkas/lazysizes.

// require('lazysizes');

(function ($) {
  // DOC READY
  $(function () {


    // Place code here or in a includes script file and require above.

    // Example of throttling.
    // $(window).on('resize', throttle(function () {
    //   console.log('resize');
    // }));

  });
})(jQuery);

// Example Drupal behavior.
// - Reinitialize something after an AJAX call.
// - using Drupal settings that are sent from php.
// To understand behaviors, see https://drupal.org/node/756722#behaviors.
// (function ($, Drupal) {
//   Drupal.behaviors.my_custom_behavior = {
//     attach: function (context, settings) {
//       // Do something Drupally
//     }
//   };
// })(jQuery, Drupal);
