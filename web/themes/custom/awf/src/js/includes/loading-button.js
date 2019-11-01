/**
 * @file
 * Adding SVG loading animation to button
 */

(function ($) {
  // DOC READY
  $(function () {

    if($('.btn-orange-line').length) {
      $('.btn-orange-line').append('<span class="line -right"></span><span class="line -top"></span><span class="line -left"></span><span class="line -bottom"></span>');
    };
  

  });
})(jQuery);
