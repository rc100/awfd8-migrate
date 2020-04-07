// Search page filter.

(function ($) {

    function filterCollapse() {
        $('.filter--collapse').each(function () {
            var me = $(this);
            var title = me.find('h3');
            title.addClass('closed').wrapInner('<a href="#"></a>').find('a').append('<div class="control plus">+</div>');
            var content = me.find('.item-list__links');
            var control = title.find('.control');
            title.find('a').click(function () {
                // When user clicks on a facet.
                if (control.is('.plus')) {
                    title.removeClass('closed').addClass('open');
                    content.slideDown();
                    control.text('-').addClass('minus').removeClass('plus');
                    $(this).blur();
                    return false;
                } else {
                    title.removeClass('open').addClass('closed');
                    content.slideUp();
                    control.text('+').addClass('plus').removeClass('minus');
                    $(this).blur();
                    return false;
                }
            });
            var hiddenStyles = {
                overflow: "hidden",
                display: "none",
            };
            // Hide the facets -- Why is adding this necessary?
            content.css(hiddenStyles);

        }).each(function () {
            // Opens the items that have active filters.
            var link = $(this).find('h3 a');
            var content = $(this).find('.item-list__links');
            if (content.find('input:checked').length > 0) {
                link.click();
                return false;
            }
        });
    }

    Drupal.behaviors.globalFunctions = {
        attach: function (context, settings) {
            filterCollapse();
        }
    };

})(jQuery);
