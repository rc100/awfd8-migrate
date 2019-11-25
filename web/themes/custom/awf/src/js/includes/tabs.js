/**
 * @file
 * Intializing javascript to make tabs.
 *
 */

(function ($) {
  // DOC READY
  $(function () {

    // Assign target selectors.
    var tabContainer = '.tm-tabs';
    var tabContent = '.tab-content';
    var tabLabel = '.tab-label';

    // Prepare the tabs for interaction.
    $(tabContainer).each(function () {
      // add class to provide default state
      $(this).addClass('js-tab-enabled');

      $(this).find(tabLabel).addClass('js-tab-label');

      // Empty string to append tab links.
      var tabLinks = '';

      // Loop through tab content.
      $(this).find(tabContent).each(function (i) {
        var tabLink = '<a href="#" data-tab="js-tab-number-' + i + '">' + $(this).find(tabLabel).text() + '</a>';

        if (i > 0) {
          // Hide the tab content that is not the first one.
          $(this).addClass('js-tab-hide');
          tabLink = '<li>' + tabLink + '</li>';
        }
        else {
          // Make the first tab link active.
          tabLink = '<li class="js-active">' + tabLink + '</li>';
        }

        tabLinks += tabLink;

        // Add an index specific class to content.
        $(this).addClass('js-tab-content').addClass('js-tab-number-' + i);
      });

      // Add the tabLinks to the markup.
      $(this).prepend('<ul class="js-tab-links">' + tabLinks + '</ul>');
    });


    // Trigger click events on the tabs we created.
    $('.js-tab-links a').on('click', function (e) {
      e.preventDefault();
      var $tab = $(this).data('tab');

      // Track active state of the tabContent.
      $(this).closest(tabContainer).find(tabContent).addClass('js-tab-hide');
      $(this).closest(tabContainer).find('.' + $tab).removeClass('js-tab-hide');

      // Track active state of the links.
      $(this).parent().siblings().removeClass('js-active');
      $(this).parent().addClass('js-active');

    });

  });
})(jQuery);
