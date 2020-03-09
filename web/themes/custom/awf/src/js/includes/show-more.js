/**
 * @file
 * Custom display code for the /about/history page.
 *
 */

(function ($) {
  // DOC READY
  $(function () {
    //Add a class to all Years and Descriptions after the first two.
    $('.field--name-field-year-and-description').each(function(){
      $(this).find('.field__item').not( ':nth-child(1)' ).not( ':nth-child(2)' ).addClass('field__item_hidden');
    });
    //Hide all Year and Descriptions after the first two by default.
    $( '.field__item_hidden' ).hide();
    //Hide the Show Me More element if a Decade has less than 3 Years.
    $('.paragraph--type--history-list').each(function(){
      var $this = $(this);
      if($(this).find('.field__item_hidden').length == 0) {
        $(this).find( '.show-more-button' ).hide();
      }
    });
    //Show the relevant Years and Descriptions on click of the Show Me More element, and also hide the element. 
    $('.show-more-button').on('click', function(e) {
      $( this ).hide();
      $( this ).parents('.paragraph--type--history-list').find('.field__item_hidden').show(900);
    });      
  }); 
})(jQuery);