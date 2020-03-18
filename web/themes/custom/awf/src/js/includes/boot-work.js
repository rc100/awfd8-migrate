if (typeof $ == 'undefined') var $ = jQuery;

(function () {
  'use strict';

  $(document).ready(function () {

    //- Start work
    var eWhereWeWork = $('.wherewework');
    new $.wherewework(eWhereWeWork,{});
    
    
  });

})();
