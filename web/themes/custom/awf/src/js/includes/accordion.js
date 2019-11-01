/**
 * @file
 * Intializing javascript accordions.
 *
 */

(function ($) {
  // DOC READY
  $(function () {

    // Set the selectors to target.
    var accordionContainer = '.custom-accordion';
    var accordionContent = '.accordion-content';
    var accordionTrigger = '.accordion-trigger';

    // Initialize the accordions.
    $(accordionContainer).each(function (i) {
      $(this).addClass('js-tm-accordion-enabled');
      if (i > 0) {
        $(this).addClass('js-collapsed')
          .find(accordionContent)
          .slideUp('fast');
      }
    });

    // Initialize onclick behavior.
    $(accordionContainer + ' ' + accordionTrigger + ' a').on('click', function (e) {
      e.preventDefault();
      $(this).closest(accordionContainer)
        .toggleClass('js-collapsed');
      $(this).parent()
        .next(accordionContent)
        .slideToggle('fast');
    });

  });
})(jQuery);
