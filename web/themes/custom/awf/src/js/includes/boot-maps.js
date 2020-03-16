if (typeof $ == 'undefined') var $ = jQuery;

(function () {
  'use strict';

  $(document).ready(function () {

    //- Start maps
    var eNode = $('.gotmap');
    new $.gotmap(eNode, {});

    function dumpError(e){if(typeof e==="object"){if(e.message){console.log("\nMessage: "+e.message)}if(e.stack){console.log("\nStacktrace:");console.log("====================");console.log(e.stack)}}else{console.log("dumpError :: argument is not an object")}}


  });

})();
