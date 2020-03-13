/**
 * @file
 * Custom display code for wildlife/all.
 *
 */

(function ($) {
    // DOC READY
    $(function () {   
    // Change the values for the data-danger attr to a number, so Isotope can sort by that number.
    $('.item-list').each(function() {
      if($(this).find('.node--view-mode-isotope[data-danger="varied"]')) {
        $(this).find('.node--view-mode-isotope[data-danger="varied"]').attr('data-danger', '0');
      }
      if($(this).find('.node--view-mode-isotope[data-danger="critically-endangered"]')) {
        $(this).find('.node--view-mode-isotope[data-danger="critically-endangered"]').attr('data-danger', '1');
      }
      if($(this).find('.node--view-mode-isotope[data-danger="endangered"]')) {
        $(this).find('.node--view-mode-isotope[data-danger="endangered"]').attr('data-danger', '2');
      }
      if($(this).find('.node--view-mode-isotope[data-danger="vulnerable"]')) {
        $(this).find('.node--view-mode-isotope[data-danger="vulnerable"]').attr('data-danger', '3');
      }   
      if($(this).find('.node--view-mode-isotope[data-danger="near-threatened"]')) {
        $(this).find('.node--view-mode-isotope[data-danger="near-threatened"]').attr('data-danger', '4');
      }     
      if($(this).find('.node--view-mode-isotope[data-danger="least-concern"]')) {
        $(this).find('.node--view-mode-isotope[data-danger="least-concern"]').attr('data-danger', '5');    
      };
      if($(this).find('.node--view-mode-isotope[data-danger="least-threatened"]')) {
        $(this).find('.node--view-mode-isotope[data-danger="least-threatened"]').attr('data-danger', '5');    
      };       
    });
   
    //Add Divs for Endangered 
    $( '[data-danger="0"]' ).first().before( '<div class="tile-danger-0"><a name="varied">Varied</a></div>' );
    $( '[data-danger="1"]' ).first().before( '<div class="tile-danger-1"><a name="critically">Critically-Endangered</div>' );
    $( '[data-danger="2"]' ).first().before( '<div class="tile-danger-2"><a name="endangered">Endangered</a></div>' );
    $( '[data-danger="3"]' ).first().before( '<div class="tile-danger-3"><a name="vulnerable">Vulnerable</a></div>' );
    $( '[data-danger="4"]' ).first().before( '<div class="tile-danger-4"><a name="near">Near-threatened</a></div>' );
    $( '[data-danger="5"]' ).first().before( '<div class="tile-danger-5"><a name="least">Least Threatened</a></div>' );

    //Add Divs for Size 
    $( '[data-size="extra-large"]' ).first().before( '<div class="tile-size-0"><a name="extra">Extra-Large</a></div>' );
    $( '[data-size="large"]' ).first().before( '<div class="tile-size-1"><a name="large">Large</a></div>' );
    $( '[data-size="medium"]' ).first().before( '<div class="tile-size-2"><a name="medium">Medium</a></div>' );
    $( '[data-size="small"]' ).first().before( '<div class="tile-size-3"><a name="small">Small</a></div>' );

    //Hide these by default   
    $('.jumpto-size').hide();
    $('.jumpto-danger').hide();
    $( 'div[class^="tile-danger"]' ).hide();
    $( 'div[class^="tile-size"]' ).hide();

    //Show and Hide these with clicks of the Sort Bar
    $('.select-az').on( 'click', function() {
      $('.jumpto-size').hide();
      $('.jumpto-danger').hide();
      $( 'div[class^="tile-danger"]' ).hide();
      $( 'div[class^="tile-size"]' ).hide();
    });
    $('.select-size').on( 'click', function() { 
      $('.jumpto-size').show();
      $('.jumpto-danger').hide();
      $( 'div[class^="tile-size"]' ).show();
      $( 'div[class^="tile-danger"]' ).hide();
    });
    $('.select-danger').on( 'click', function() {
      $('.jumpto-danger').show();
      $('.jumpto-size').hide();
      $( 'div[class^="tile-danger"]' ).show();
      $( 'div[class^="tile-size"]' ).hide();
    });
    
    // quick search regex
    var qsRegex;

    //Init isotope
    var $grid = $('.item-list').isotope({
      itemSelector: '.node--view-mode-isotope', 
      layoutMode: 'fitRows',
      filter: function() {
        return qsRegex ? $(this).text().match( qsRegex ) : true; 
      },  
      getSortData: {
        animals: '[data-species]',  
        size: '[data-size]',
        danger: '[data-danger]'
      }  
    });

    // use value of search field to filter
    var $quicksearch = $('.quicksearch').keyup( debounce( function() {
      qsRegex = new RegExp( $quicksearch.val(), 'gi' );
      $grid.isotope();
    }, 200 ) );
  
  // debounce so filtering doesn't happen every millisecond
  function debounce( fn, threshold ) {
    var timeout;
    threshold = threshold || 100;
    return function debounced() {
      clearTimeout( timeout );
      var args = arguments;
      var _this = this;
      function delayed() {
        fn.apply( _this, args );
      }
      timeout = setTimeout( delayed, threshold );
    };
  }
    
    // Bind button click for the Sort Bar
    $('#sort-bar').on( 'click', 'a', function() {
      var sortValue = $(this).attr('data-sort-value');
      sortValue = sortValue.split(',');
      $grid.isotope({ sortBy: sortValue });
      console.log(sortValue);
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