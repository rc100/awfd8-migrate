/**
 * @file
 * Custom display code for wildlife/all.
 *
 */

(function ($) {
    // DOC READY
    $(function () {
    // var dangerValues = {
    //   VARIED: -1,
    //   CRITICALLY: 0,
    //   ENDANGERED: 1,
    //   VULNERABLE: 2,
    //   NEAR: 3,
    //   LEAST: 4,
    // };
    
    // var dangerValue = dangerValues[ value ];
    
    // $('.item-list').each(function(){
    //   $(this).find('article').addClass(dangerValue);
    // });
    
    //Init isotope
    var $grid = $('.item-list').isotope({
      itemSelector: '.node--view-mode-isotope', 
      layoutMode: 'fitRows', 
      getSortData: {
        animals: '[data-species]',  
        size: '[data-size]',
        danger: '[data-danger]'
      }  
    });
    
    // Bind button click for the Sort Bar
    $('#sort-bar').on( 'click', 'a', function() {
      var sortValue = $(this).attr('data-sort-value');
      $grid.isotope({ sortBy: sortValue });
    });
    
    // Bind button click for the Layout Bar
    $('#display-bar').on( 'click', 'a', function() {
      var layoutModeValue = $(this).attr('data-layout-mode');
      $grid.isotope({ layoutMode: layoutModeValue });
    }); 
        
    // Change active class on buttons in the Sort Bar
    $('#sort-bar').each( function( i, sortBar ) {
      var $sortBar = $( sortBar );
      $sortBar.on( 'click', 'a', function() {
        $sortBar.find('.active').removeClass('active');
        $( this ).addClass('active');
      });
    });

    // Change active class on buttons in the Display Bar
    $('#display-bar').each( function( i, displayBar ) {
      var $displayBar = $( displayBar );
      $displayBar.on( 'click', 'a', function() {
        $displayBar.find('.active').removeClass('active');
        $( this ).addClass('active');

      });
    });
  });
})(jQuery);