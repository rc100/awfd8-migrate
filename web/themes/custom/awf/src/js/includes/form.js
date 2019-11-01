/**
 * @file
 * Form alters for accessibility.
 *
 */
(function ($, Drupal) {
  Drupal.behaviors.formInput = {
    attach: function (context, settings) {
      // Do something Drupally
      $webformEmailInput = $("form.webform-submission-newsletter-form .form-item input");
        
        // if($webformInput.val()) {
        //   $(this).parent('div').addClass('something');
        // }
      $webformEmailInput.on("keyup", function() {
        if($(this).val()) {
          $(this).parent().addClass("with-value");
        } else {
          $(this).parent().removeClass("with-value");
        }
      });
    }
  };
})(jQuery, Drupal);

