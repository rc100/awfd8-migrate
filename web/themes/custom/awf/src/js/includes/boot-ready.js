try {

//if(typeof Drupal == 'undefined') var Drupal = { settings: { basePath: '/drupal/' } };
//Drupal.settings.libPath = Drupal.settings.basePath + 'sites/all/libraries/';
//Drupal.behaviors.initColorbox = null;
//Drupal.behaviors.initColorboxPlainStyle = null;

window.config = {
  path: {
    root: '/',
    base: '/themes/awf/',
    img: {
      base: null,
      '404': null
    }
  }
};
window.config.path.img.base = window.config.path.base + 'img/';
window.config.path.img['404'] = window.config.path.img.base + '404.jpg';

if(typeof $ == 'undefined') var $ = jQuery;
// $.browser check
typeof $.browser == 'undefined' || typeof $.browser.msie == 'undefined' ? $.browser = {
  msie: '',
  version: ''
} : '';

//- Globals
var eOverview, eWhereWeWork, nMaxMastheadWidth = 1600;

(function() {
  'use strict';
  //-
  window.googleMapApiKey = 'AIzaSyAk4NQ5UyzV8M9bO-0Hync36CA4_aETsu8';

  $(document).ready(function(){
    //- Launch
    //---------------------------------------------
    //- Slip topbar (scroll) if mobile
    var browser         = navigator.userAgent;
    var browserRegex    = /(Android|BlackBerry|IEMobile|Nokia|Opera M(obi|ini))/;
    var isMobile       = false;
    var isiOS      = false;
    if(browser.match(browserRegex)) isMobile = true;
    //- iOS check
    var iOSRegex    = /(iP(hone|od))/;
    if(browser.match(iOSRegex)) {
      isiOS = true;
      isMobile = true;
    }
    if(isMobile)
      //- Hide top bar
      setTimeout(function(){
        window.scrollTo(0,1);
      }, 0);
      
    // store globals
    window.isiOS = isiOS;
    window.isMobile = isMobile;
    window.isBadIE = $('html').hasClass('lt-ie9');
    window.orient = getOrientation();

    //- init masthead width check
    //checkOnMasthead($('body').width());
    
    var fnAddSprite = function(eSlider) {
      // add .sprite to next, prev element for icon display
      eSlider
      .find('a.flex-prev, a.flex-next')
      .hide();

      eSlider.find('a.flex-prev')
      .append($('<span/>').addClass('flex-prev sprite'))
      .fadeIn(666);

      eSlider.find('a.flex-next')
      .append($('<span/>').addClass('flex-next sprite'))
      .fadeIn(666);
    };


//- -----------------------------
    //- FLEXSLIDERS

    //- DEFAULTS
    var aDefaultSliderOpts = {
      animation: "slide",
      slideshow: false,
      minItems: 1,
      smoothHeight: true,
      itemMargin: 1,
      maxItems: (window.isMobile ? 1 : 3),
      start: function(slider) {
        fnAddSprite(slider);
      }
    };

    //- WHERE WE WORK - animals
    var aSliderOpts = aDefaultSliderOpts;
    var eNode = $('#module-15').find('.flexslider');
    window.isMobile || (aSliderOpts.itemWidth = 125);
    window.isMobile || (aSliderOpts.itemMargin = 25);
    aSliderOpts.start = function(slider) {
      fnAddSprite(slider);
    };
    eNode.flexslider(aSliderOpts);
    aSliderOpts = null;

    
    //- ----------------------------
    //- MODULE 15
    eWhereWeWork = $('.region-content-preface');
    !eWhereWeWork.length || new $.wherewework(eWhereWeWork,{
      'navOffset': $(".mainnav").height()
    });
    //- ----------------------------

    $('.box').hover(
      function () {
        $(this).addClass('hover');
      }, 
      function () {
        $(this).removeClass('hover');
      }
    );
    //- Responsive Image Maps (needs to be after $.nav)
    $('img[usemap]').rwdImageMaps();
  });
  function getOrientation() {
    var sOrient = $(window).height() > $(window).width() ? 'portrait' : 'landscape';
    window.isPortrait = sOrient == 'portrait';
    return sOrient;
  }
  function scrollNavPos() {
    $('nav').nav('updatePos',$(window).scrollTop());
  }
  
  //- SCROLL HOOK
  if($('body').hasClass('home'))
  window.addEventListener("touchmove", scrollNavPos, false);
  $(window).scroll(function(){
    scrollNavPos();
  });
  
})();
}
catch(e) {
  dumpError(e);
}
