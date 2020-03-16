(function($) {
  //Define the plugin's name here
  var __name = 'home';
  //--
  $[__name] = function(el, options) {
  try {
    
    //-- Plugin gymnastics - Part 1/3
    //---------------------------------------------
    var self = this; // prevent from loosing the scope
    self.el = el = $(el); // store the passed element
    $(self.el).data(__name, self); // store the plugin instance into the element
    //---------------------------------------------
    
    
    //-- init
    //---------------------------------------------
    self.defaults = {
      animFX: 'cubic-bezier(0,0.9,0.3,1)',
      animTime: 999,
      showRelatedYT: false,
      showCtrlYT: 1,
      enablejsapiYT: 0
    };
    
    self.initialize = function() {
      self.options = $.extend({}, self.defaults, options);
      //-
      ignite();
    };
    
    //-- Vars
    //---------------------------------------------
    var sShowMeFullText = '';
    //-- Start
    //---------------------------------------------
    function ignite(){
      sShowMeFullText = self.el.find('h2.showme span.text').text();
      fixTextHeight();
      //-
      bindEvents();
    }
    function bindEvents() {


      //- DONATIONS Pie
      var eNode = self.el.find('#pie');
      !eNode.length || new $.pie(eNode,{
        'animTime': 2000 // millisecondstap
      });

      //- NEWSLETTER JUMP TO LINK
      self.el.find('a#newsletter-signup').click(function() {
        self.el.find('footer').find('input[type="email"]').focus();
        var nOffset = self.el.find('footer').offset().top + 240;
        $.scroll2(nOffset, {
          animTime: 666, 
          animFX: 'easeOutExpo'
        });
        return false;
      });

      //- Show me drop down
      self.el.find('#show-me-filter').chosen();
      //- HERO
      self.el.find('#hero').flexslider({
        animation: "slide",
        minItems: 1,
        maxItems: 1,
        start: function(slider) {
          //self.options.onStart(slider);
          self.el.find('.flex-direction-nav li a').empty().append('<span></span>');
        },
        before: function(slider) {
          removeYT(slider);
        }
      })
      //- YouTube click
      .find('ul.slides li a').click(function() {
        if($(this).attr('href').indexOf('youtube.com') != -1) return parseYT($(this));
        return true;
      });

      var showAnotherReason = function(el) {
          var $container = el.parents('div.reason-item');
          var total = $container.siblings().length;
          var cur = parseInt($container.attr("data-item"));

          $container.fadeOut("fast", function () {

              if (cur >= total) {
                  $container.parent().find('.reason-item-0').fadeIn("medium");
              } else {
                  $container.parent().find('.reason-item-' + (cur + 1)).fadeIn("fast");
              }
          });
      };

      //- Grid
      self.el.find('.reason-more').on('click', function () {
        showAnotherReason($(this));
      });
      var eShowMeContainer = self.el.find('#show-me-block .container');
      var nShowMePageHeight = parseInt(eShowMeContainer.height()) + 20;

      self.el.find('#show_me_more').on('click', function () {
          var page = parseInt(self.el.find('#show-me-block .container').attr('data-page'));
          var total = parseInt(self.el.find('#show-me-ajax').children().length);
          page += 1;

          self.el.find('#show-me-loader').css('height', (page * nShowMePageHeight) + 'px');
            if (page >= total) {
                self.el.find('#show_me_more').hide();
                /*transition({
                  opacity: 0
                }, self.options.animTime, function() {
                  $(this).hide();
                });*/
            }
          self.el.find('#show-me-block .container').animate({
              height: (page * nShowMePageHeight) + 'px'
          }, 800, function () {
              self.el.find('#show-me-block .container').attr('data-page', page);
          });
      });

      Drupal.behaviors.show_me_ajax = {
        attach: function (context, settings) {
          if (typeof context == "undefined") {
            $.ajax({
              url: Drupal.settings.basePath + 'ajax/show_me',
              type: 'GET',
              data: {
                'show_me_filter': self.el.find('#show-me-filter').val()
              },
              success: function (data) {
                self.el.find('#show-me-block .container #show-me-ajax').html(data);

                self.el.find('.reason-more').on('click', function () {
                  showAnotherReason($(this));
                });

                self.el.find('#show-me-block .container').css({
                  height: nShowMePageHeight + 'px'
                });

                //- SHARE
                new $.share(self.el.find('.share'),{});

                self.el.find('#show-me-block .container').attr('data-page', '1');
                self.el.find('#show_me_more').show();
                /*.transition({
                 opacity:1
                 }, self.options.animTime);*/
                self.el.find('#show-me-loader').transition({
                  opacity: '0'
                }, self.options.animTime, function () {
                  $(this).css({
                    display: 'none',
                    height: nShowMePageHeight + 'px'
                  });
                });
              }
            });
          }
        }
      };

      self.el.find('#show-me-filter').on('change', function () {
        //-
        adjustTitle($(this).val());

          self.el.find('#show-me-loader').css('display', 'block').transition({
              opacity: '.8'
          }, 500);
          Drupal.behaviors.show_me_ajax.attach();
      });

    }
    function adjustTitle(sVal) {
      switch(sVal.toLowerCase()) {
        case 'news':
        case 'projects':
          self.el.find('h2.showme span.text').text('Show me');
          break;
        default:
          self.el.find('h2.showme span.text').text(sShowMeFullText);
          break;
      }
    }
    function removeYT(slider) {
      self.el.find('#hero').find('iframe').remove();
    }
    function parseYT(eLink) {
      var eFrame, sYoutubeId, sYoutubeEmbedURL, eMask;

      sYoutubeEmbedURL = window.location.protocol+'//www.youtube.com/embed/';
      sYoutubeId = eLink.attr('href').split('v=')[1];

      //- exit if no you tube url found
      if(_.isUndefined(sYoutubeId)) return true;

      //-
      eMask = $('<div class="mask black"/>').transition({'opacity': 0});
      eFrame = 
        $('<iframe />')
        .css({
          'height':eLink.parent().height() + 'px',
          'width':eLink.parent().width() + 'px',
          'position':'absolute',
          'z-index':'1002'
        })
        .attr('frameborder','0')
        .attr('width',eLink.parent().width())
        .attr('height',eLink.parent().height())
        .attr({
          'src' : sYoutubeEmbedURL + sYoutubeId + '?wmode=transparent&autoplay=1' + 
          (self.options.showRelatedYT || '&rel=0') +
          '&controls=' + (self.options.showCtrlYT || '0') + 
          ''//&enablejsapi=' + (self.options.enablejsapiYT || '0')
        })
        .load(function() {
          setTimeout(function() {
            eMask.spinnerizer('kill');
            eMask.transition({
              opacity: 0
            }, 666, function() {
              $(this).remove();
            });
          },2000);
        });

      self.el.find('#hero .flex-viewport')
        .prepend(eFrame).prepend(
          eMask.transition({
            opacity: 1
          }, self.options.animTime)
          .spinnerizer({
            color: '#FFF'
          })
        );
      
      //-
      return false;
    }
    function fixTextHeight() {
      self.el.find('.box.double').each(function() {

        var __
        , nImageHeight = $(this).find('.show-me-image-250').height()
        , nBoxHeight = parseInt($(this).height() - (nImageHeight > 0 ? 150 : 0) - nImageHeight)
        , eParags = $(this).find('> p:not(:has("a.carrot"))')
        , eHeader = $(this).find('h2').eq(0)
        , nTextHeight = parseInt((eHeader.length ? eHeader[0].clientHeight : 0) + 1)
        , nCounter = 0
        , nStripParag = -1
        // could implement a better approach...
        , nWordCount = (nTextHeight > 95 ? (nTextHeight > 140 ? 8 : 15) : (nTextHeight < 50 ? 35 : 30));
        //-
        eParags.each(function() {
          if($(this).html().replace(/\s|&nbsp;/g, '').length == 0) {
            $(this).remove();
            eParags.eq(nCounter).remove();
          }
          else {
            nTextHeight += getTextHeight($(this)[0]);
            if(nStripParag > -1) $(this).remove();
            if(nTextHeight >= nBoxHeight && nStripParag == -1) {
              nStripParag = nCounter;
            }
            nCounter++;
          }
        });

        //- truncate text
        if(nTextHeight >= nBoxHeight) 
          trimText($(this), nStripParag, nWordCount);
      });
    }
    function getTextHeight(eTextContainer) {
      return eTextContainer.clientHeight + 1;
    }
    function trimText(eBox, n, w) {
      var p = eBox.find('> p').eq(n)
      , t = p.text()
      , a = t.split(' ')
      , s = '';
      
      for(var i = 0; i < w; i++) s += ($.trim(a[i]) + ' ');
      s = $.trim(s);
      var l = s.substr(s.length - 1, 1);
      p.text(s).append((s.indexOf('...') == -1 ? (l == '.' ? '..' : '...') : ''));
    }
    //---------------------------------------------
    //-- Plugin gymnastics - Part 2/3
    //---------------------------------------------
    self.initialize();
  }
  catch(e) {
    dumpError(e);
  };
  }
  
  //-- Plugin gymnastics - Part 3/3
  //---------------------------------------------
  $.pluginMutator(__name);
})(jQuery);
