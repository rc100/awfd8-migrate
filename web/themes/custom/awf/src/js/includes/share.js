/**
 * @file
 * Add Sharing behavior to share links.
 *
 */

(function ($) {
  // DOC READY
  $(function () {
    $('body').has('.share-container').each(function(){
      setTimeout(function(){
        //--------------------------
        // SHARETHIS a11y
        //--------------------------

        // Loop through an array of data-network names
        ['facebook', 'twitter', 'linkedin', 'sharethis'].forEach(function( platform ) {
          // Adds a11y to sharing icons
          $('.st-btn[data-network="' + platform + '"').attr({
            'title' : 'social ' + platform.charAt(0).toUpperCase() + platform.slice(1) + '',
            'aria-label' : 'Open ' + platform + ' sharing modal',
            'tabindex' : '0',
            'role' : 'content-info',
          });

          // Adds enter key functionality to work like a click
          $('.st-btn[data-network="' + platform + '"').keypress( function( e ) {
            if ( e.which && e.which == 13 ) { //  13 is character code for enter
              // event.preventDefault();
              $(this).click();
            }
          });
        });

// 	// Checks to see if container is empty because of browser social blocking
        if ($('.sharethis-inline-share-buttons').is(':empty')) {
          $('.share').addClass('no-social');
          $('.sharethis-inline-share-buttons').append('<div class="no-social">Your browser may be blocking social sharing.</div>');
        }
      }, 100);
    });
    $('.share-container a.share').on('click',function(e){
      e.preventDefault();
      $(this).toggleClass('share-enabled');
    });
  });

})(jQuery);
