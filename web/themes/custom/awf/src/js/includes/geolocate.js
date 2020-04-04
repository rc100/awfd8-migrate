/**
 * @file
 * Contains geolocate.js.
 */

(function ($, Drupal) {
  Drupal.behaviors.geoLocate = {
    attach: function (context, settings) {
      // Modify webforms and other content for users in the UK.
      // The 'in-uk' class is set via preprocess in awf.theme, using custom
      // awf_geolocate module.
      if ($('body').hasClass('in-uk')) {
        var ukFormLink = 'https://secure.awf.org/donate-uk';

        // Modify the Webform block "awf_webform_home_donate" (uses the
        // "Homepage: Donate Form" Webform).
        $('.form-item-custom-amount .field-prefix', context).once('js-field-prefix').text('£');
        $('#block-awf-webform-home-donate input[name="passthrough"]').attr('value', ukFormLink);

        // Change URL for the "Join Us" link on homepage (below its <h1>).
        $('#homepage-hero-button', context).once('js-homepage-hero-button').attr('href', ukFormLink);

        // Modify the "Get Involved" Webform.
        if ($('.webform-submission-get-involved-form').length) {
          $('.webform-submission-get-involved-form input[name="passthrough"]').attr('value', ukFormLink);
          $('.webform-submission-get-involved-form .btn.golden').attr('href', ukFormLink);
          // Replace currency symbols.
          $('.webform-submission-get-involved-form .form-item-dollar-amount .field-prefix', context).once('js-prefix-currency').text('£');
          $('.webform-submission-get-involved-form .form-item-radios', context).once('js-radio-currency').find('label.option').each(function(){
            $(this).text(function () {
              return $(this).text().replace("$", "£"); 
            });
          });
        }
      }
    }
  };
})(jQuery, Drupal);
