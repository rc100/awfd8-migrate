(function($) {
    //Define the plugin's name here
    var __name = 'nav';
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
            waypointOffset: 200,
            headerWaypointOffset: 200,
            winWidth: 960,
            animTime: 200,
            animFX: 'easeOutExpo',
            onStart: function(){},
            outiseClickElement: 'body',
            bodyClasses: '',
            fixedOffset: 200,
            headerFixedOffset: 100,
            initTopOffset: 0,
            pushElements: null
        };
        
        self.initialize = function() {
            self.options = $.extend({}, self.defaults, options); //merging defaults with passed arguments
            //-
            ignite();
            
        };
        
        //-- Vars
        //---------------------------------------------
        var eSubnavs, eSubnavIndicator, aSliderOpts, eRedArrowLinks, eSearch, nWinWidth, eMobileNav;

        //-- See if header-section exist
        //---------------------------------------------
        var headerSection = $('.header-section');

        //-- Start
        //---------------------------------------------
        function ignite(){

            window.navShowing = false;
            
            eMainnav = self.el.find('.mainnav');
            eSubnavs = {
                'whatwedo' : self.el.find('.subnav[data-rel="whatwedo"]'),
                'aboutus' : self.el.find('.subnav[data-rel="aboutus"]')
            };
            eSubnavIndicator = self.el.find('#subnavindicator');
            eRedArrowLinks = eSubnavs['whatwedo'].find('ul li a:not(.box, .flex-next, .flex-prev)');
            eSearch = self.el.find('.search');
            eSearch.parent().addClass('toggle-class');
            nWinWidth = self.options.winWidth;
            initNav();
            //- DEFAULTS
            aSliderOpts = {
                animation: "slide",
                slideshow: false,
                minItems: 1,
                maxItems: 1,
                smoothHeight: true,
                start: function(slider) {
                    self.options.onStart(slider);
                    setTimeout(function() {
                        // initNav();
                    },800); // need delay
                }
            };
            //-
            buildMobileNav();

            function pathActive () {

                var current = location.pathname;
                var whatwedoLinks = '/wildlife-conservation/all';
                var aboutUsLinks = [
                                    'blog', 
                                    'news', 
                //                     'safaris',
                //                     'partners',
                //                     'history',
                //                     'careers',
                //                     'resources',
                //                     'financials',
                //                     'trustees',
                //                     'staff',
                                    'contact'
                                    ];
                // console.log('current' + current);
                $('.subnav ul li a').each(function() {
                    var $this = $(this); 
                    if ($this.attr('href') === current) {
                        $(this).addClass('active');
                    }
                    if (current === whatwedoLinks) {
                      $('a#whatwedo').addClass('active-trail');
                    } else {
                      for (var i = 0; i < aboutUsLinks.length; i++) {
                        if(window.location.href.indexOf(aboutUsLinks[i]) > -1) {
                          $('a#aboutus').addClass('active-trail');
                        }
                      }
                    }
                });
                if(current.indexOf("about") > -1){ 
                  if(!$('a#aboutus').hasClass('active-trail')) {
                    $('a#aboutus').addClass('active-trail');
                  }
                }
                if(current.indexOf("about/careers") > -1){ 
                  $('a[title="Careers"]').addClass('active');
                } else if(current.indexOf("blog") > -1){ 
                  $('a[title="Blog"]').addClass('active');
                } else if(current.indexOf("news") > -1){ 
                  $('a[title="News"]').addClass('active');
                } else if(current.indexOf("about/history") > -1){ 
                  $('a[title="History"]').addClass('active');
                } else if(current.indexOf("about/staff") > -1){ 
                  $('a[title="Staff"]').addClass('active');
                } else if(current.indexOf("about/trustees") > -1){ 
                  $('a[title="Trustees"]').addClass('active');
                } else if(current.indexOf("about/safaris") > -1){ 
                  $('a[title="AWF Safaris"]').addClass('active');
                } else if(current.indexOf("about/financials") > -1){ 
                  $('a[title="Financials"]').addClass('active');
                } else if(current.indexOf("about/partners") > -1){ 
                  $('a[title="Partners"]').addClass('active');
                } else if(current.indexOf("about/resources") > -1){ 
                  $('a[title="Resources and Documents"]').addClass('active');
                } else {
                }
            }
      
            pathActive();

        }
        function bindEvents() {
            //- 
            var fnToggle = function(sNav1, sNav2, eLink) {

                fnHideSearch();

                if(eSubnavs[sNav1].is(':visible')) return hideNav(sNav1);

                if(eSubnavs[sNav2].is(':visible')) return hideNav(sNav2, function() {
                    showNav(sNav1);
                });
                else showNav(sNav1);

                return false;
            };
            var fnClickEvent = function(eLink) {
                switch(eLink.attr('id')) {
                    case 'whatwedo':
                        return fnToggle('whatwedo', 'aboutus', eLink);
                        break;
                    case 'aboutus':
                        return fnToggle('aboutus', 'whatwedo', eLink);
                        break;
                }
            };

            var fnHideSearch = function() {
                !eSearch.hasClass('open') || eSearch.removeClass('open');
            };


            //- Search toggle
            eSearch.click(function(e){
                e.stopPropagation();
            });

            self.el.find('#search-toggle').click(function() {
                eSearch.toggleClass('open');
                eSearch.parent('.toggle-class').toggleClass('toggle-class');
                !eSearch.hasClass('open') || eSearch.find('input[type="text"]').focus();
                if (eSearch.hasClass('open')) {
                  hideAllNav();
                };
                return false;           
            });

            //- Prevent nav from closing when clicking on container
            self.el.click(function(e) {
                var sNode = e.target.nodeName.toLowerCase();
                if(sNode != 'a' && sNode != 'img' && sNode != 'li') {
                    e.stopPropagation();
                    return false;
                }
            });
            // WHAT WE DO, ABOUT US
            self.el.find('a#whatwedo, a#aboutus').click(function(e) {
                e.stopPropagation();
                //-
                var eLink = $(this);

                if (headerSection.length) {
                  return fnClickEvent(eLink);
                } else {
                    if(!self.el.hasClass('fixed')) {
                        $.scroll2(self.el.offset().top, {
                            animTime: self.options.animTime,
                            animFX: 'easeInOutExpo',
                            callback: function() {
                                return fnClickEvent(eLink);
                            }}
                        );
                    }
                    else 
                       return fnClickEvent(eLink);
                    
                    return false;
                }
            });

            //- Red arrow indicator
            eRedArrowLinks.click(function(e) {
                e.stopPropagation();
                //-
                
                var 
                targetNav = $(this).attr('href'), 
                aClasses = [
                    'first',
                    'second',
                    'third',
                    'fourth'
                ];

                //- Where we work
                if ($(this).parent().index() == 5) return true;

                //-
                self.el.find('.subnav ul li').removeClass('active');
                $(this).parent('li').addClass('active');

                eSubnavIndicator.removeClass('first second third fourth sixth');
                eSubnavIndicator.addClass(aClasses[$(this).parent().index()]);
                //-
                self.el.find('.rightnav').hide();
                $(targetNav).show().removeClass('hidden');
                
                return false;
            });

            //- nav links
            eSubnavs['whatwedo'].find('ul.slides li a.box').click(function(e) {
                e.stopPropagation();
                return true;
            });
            eSubnavs['aboutus'].find('a').click(function(e) {
                e.stopPropagation();
                return true;
            });
            //- init scroll offset
            updatePos(self.options.initTopOffset);
        }
        function highliteCurrentWhatWeDoSection() {
            var s = self.options.bodyClasses, i = 0;
            switch(true) {
                case s.indexOf('wildlife-conservation') != -1:
                    i = 0;
                    break;
                case s.indexOf('land-protection') != -1:
                case s.indexOf('habitat-protection') != -1:
                    i = 1;
                    break;
                case s.indexOf('community') != -1:
                    i = 2;
                    break;
                case s.indexOf('economic') != -1:
                    i = 3;
                    break;
            }
            eRedArrowLinks.eq(i).trigger('click');
        }
        function initNav() {
            _.each(eSubnavs, function(v,k) {
                v.hide().css('left',0);
            });
            highliteCurrentWhatWeDoSection();
        }
        function hideNav(sRel, callback) {
            //- if callback, hide directly so that there is no time gap between both navs
            var nTime = !_.isUndefined(callback) ? 0 : self.options.animTime;
            //-
            unbindOutsideClickListener();

            self.el.find('#' + sRel).removeClass('active');
            //-
            eSubnavs[sRel]
            .stop()
            .removeClass('show')
            .transition({
                top: '-' + eSubnavs[sRel].height() + 'px'
            }, nTime, self.options.animFX, function() {
                $(this).hide();
                if(!_.isUndefined(callback)) callback();
            });

            return false;
        }
        function bindOutsideClickListener() {

            //- Content click trigger (close nav)
            $(self.options.outiseClickElement).bind('click', function() {
                if(headerSection.length) {
                  if(self.el.hasClass('absolute')) {
                    self.el.toggleClass('absolute fixed'); 
                    var windowTop = $(window).scrollTop();
                    if(windowTop < 50){
                      if($('body').hasClass('front')) {
                        $('.header-section').removeClass('fixed');
                      }
                    }
                  }
                } else {
                  hideAllNav();
                  if(self.el.hasClass('absolute')) self.el.toggleClass('absolute fixed');                   
                }
                if(window.isPortrait && self.options.bodyClasses.indexOf('home') != -1) $('section.brown-back').toggleClass('navPushed');
            });
        }
        function unbindOutsideClickListener() {
            $(self.options.outiseClickElement).unbind('click');
        }
        function showNav(sRel) {

            bindOutsideClickListener();

            self.el.find('#' + sRel).addClass('active');
            //-
            eSubnavs[sRel]
            .stop()
            .addClass('show')
            .show()
            .transition({
                top:'0',
                left:'0'
            }, self.options.animTime, self.options.animFX, function() {
            });
        }
        function hideAllNav() {
            _.each(eSubnavs, function(v,k) {
                hideNav(k);
            });
            //- hide mobile too
             self.el.find('.mobile-nav').removeClass('mobile-show');
            window.navShowing = false;
            return false;
        }
        function doPlugins() {
            
            aSliderOpts.itemWidth = '500px';
            aSliderOpts.itemMargin = 0;
            eSubnavs['whatwedo'].find('.flexslider').flexslider(aSliderOpts);
            //-
            bindEvents();
        }
        function bindMobileEvents() {

            var nLevels = 0;

            //- Mobile nav trigger
            self.el.find('.btn-navbar').click(function(e) {
                e.stopPropagation();
                // remove all the click listening by checking if it has toggle-class
                if( !$(e.target).parent().hasClass('toggle-class') || !$(e.target).hasClass('toggle-class')) {
                    $('.search.open').removeClass('open');
                }
                var windowTop = $(window).scrollTop();
                //-
                self.el.toggleClass('absolute fixed');
                if(window.isPortrait && self.options.bodyClasses.indexOf('home') != -1) $('section.brown-back').toggleClass('navPushed');
                if(!eMobileNav.is(':visible')) {
                    $('.header-section').addClass('fixed');
                    window.navShowing = true;
                    bindOutsideClickListener();
                    nLevels = 0; // subnav level
                    //- reset nav to first menu
                    eMobileNav.transition({
                        x: 0
                    },  self.options.animTime);

                    //- scroll to top
                    if(!$('.mobile-show').length) {
                      $('.mobile-nav').addClass('mobile-show');
                    }

                    // $.scroll2(0, {
                    //  animTime: self.options.animTime,
                    //  animFX: self.options.animFX,
                    //  callback: function() {
                    //  }
                    // });
                }
                else {
                    window.navShowing = false;

                    if(windowTop < 20) {
                      if($('body').hasClass('front')) {
                        $('.header-section').removeClass('fixed');
                      }
                    } else {
                        if(headerSection.length) {
                            if(!$('.header-section').hasClass('fixed')) {
                              $('.header-section').addClass('fixed');
                            }
                            if(!$('nav').hasClass('fixed')) {
                              $('nav').addClass('fixed');
                            }
                        }
                    }

                    eMobileNav.find('.mobile-nav').removeClass('mobile-show');

                }
                return false;
            });
            //-
            self.el.find('.sub > a').click(function(e) {
                if(!$(this).hasClass('submenu-title')){
                    e.stopPropagation();
                    //-
                    $(this).next('ul').show();

                    nLevels++;

                    eMobileNav.transition({
                        x: '-' + nWinWidth * nLevels
                    },  self.options.animTime);
                    //-
                    return false;

                }
            });

            //- back
            self.el.find('.menu-title > a').click(function(e) {
                e.stopPropagation();
                //-
                var eThisUl = $(this).closest('ul');

                nLevels--;
                nLevels = nLevels >= 0 ? nLevels : 0;
                //-
                eMobileNav.transition({
                    x: '-' + nWinWidth * nLevels
                },  self.options.animTime, function() {
                    eThisUl.hide();
                });
                //-
                return false;
            });
            //-
            if(window.isMobile) self.el.addClass('fixed');
            doPlugins();
        }

        function buildMobileNav() {
            eMobileNav = $('<div class="mobile-holder"/>');

            var eDonateBtn = $([
                '<li class="spaced">',
                    '<a class="fullbtn donatebtn center clear subhead white" href="#">',
                        'DONATE',
                    '</a>',
                '</li>'].join(''));

            eDonateBtn.find('a').attr('href',self.el.find('a.donate').attr('href'));
            var eSearchForm = self.el.find('form.search-form').clone();
            var eSearchBar = $('<li class="spaced"/>').append(eSearchForm);

            eSearchForm
            .attr('id',eSearchForm.attr('id') + '-mobile')
            .removeClass('search-form search')
            .addClass('search-m')
            .append('<input class="sprite mag-brown-small form-submit" type="submit" name="op">')
            .find('.form-actions').remove();

            // copy main nav - one level ul
            eMobileNav.append(
                eMainnav
                .find('ul.mainmenu')
                .clone()
                .removeClass('mainmenu')
                .attr('id','')
                .addClass('mobile-nav')
                //.append(eSearchBar)
                .append(eDonateBtn)
            );
            // arrows
            eMobileNav.find('.hidden').remove();
            eMobileNav
            .find('.down')
            .before('<span class="sprite arrow-right-grey"></span>')
            .remove();

            // WHAT WE DO
            var eSubUl = $('<ul/>');
            if (headerSection.length) {

                eSubnavs['whatwedo'].find('ul.four.columns:first li').has('a.subtitle').each(function() {

                    var eSubLi = $('<li/>');
                    var eSubSubUL = $('<ul/>').addClass('submenu');
                    var sHref = $(this).find('a.subtitle').attr('href');
                    var sMainMenu = $(this).find('a.main-menu-only').attr('href');
                    var sText = $(this).find('a.subtitle').text();

                    if(sHref.indexOf('#') != -1) {
                        var eDiv = eSubnavs['whatwedo'].find(sHref);
                        // has sub-subnav ?
                        eDiv.find('ul li a.box').each(function() {
                            
                            var eLink = $(this).clone();
                            eLink.find('.arrow').remove();
                            eLink.removeAttr('class');
                            eLink.text(eLink.text());
                            //-
                            eSubSubUL.append($('<li/>').append(eLink));
                        });

                        //- add back link
                        eSubSubUL.prepend('<li class="menu-title"><a href="#"><span class="sprite arrow-left-orange"></span>' + sText + '</a></li>');

                        //- remove duplicate all wildlife
                        eSubSubUL.find('a[href$="wildlife-conservation/all"]:gt(0)').parent().remove();

                        //- insert
                        eSubLi.append(eSubSubUL);
                        eSubUl.append(eSubLi);
                        
                    }
                    else { // where we work
                        eSubUl.append($(this).clone());
                    }
                    eSubLi.prepend('<a href="' + sMainMenu +'" class="submenu-title">' + $(this).find('a.subtitle').text() + '</a><a href="#" class="submenu-ul"><span class="sprite arrow-right-grey"></span></a>');
                });

            } else {

                eSubnavs['whatwedo'].find('ul.four.columns:first li').has('a').each(function() {
                    var eSubLi = $('<li/>');
                    var eSubSubUL = $('<ul/>').addClass('submenu');
                    var sHref = $(this).find('a').attr('href');
                    var sText = $(this).text();


                    if(sHref.indexOf('#') != -1) {
                        var eDiv = eSubnavs['whatwedo'].find(sHref);
                        // has sub-subnav ?
                        eDiv.find('ul.slides li a').each(function() {
                            
                            var eLink = $(this).clone();
                            eLink.find('img').remove();
                            eLink.find('.arrow').remove();
                            eLink.removeAttr('class');
                            eLink.text(eLink.find('p').text());
                            //-
                            eSubSubUL.append($('<li/>').append(eLink));
                        });

                        //- add back link
                        eSubSubUL.prepend('<li class="menu-title"><a href="#"><span class="sprite arrow-left-orange"></span> ' + sText + '</a></li>');

                        //- remove duplicate all wildlife
                        eSubSubUL.find('a[href$="wildlife-conservation/all"]:gt(0)').parent().remove();

                        //- insert
                        eSubLi.append(eSubSubUL);
                        eSubUl.append(eSubLi);
                    }
                    else { // where we work
                        eSubUl.append($(this).clone());
                    }
                    eSubLi.prepend('<a href="#">' + $(this).text() + '<span class="sprite arrow-right-grey"></span></a>');
                });
            }



            eSubUl.prepend('<li class="menu-title"><a href="#"><span class="sprite arrow-left-orange"></span>' + eMainnav.find('#whatwedo').text() + '</a></li>');

            // append to mobile nav
            eMobileNav.find('li').eq(0).append(eSubUl);

            // ------------------------------------------
            // ABOUT US
            var eAboutUs = eMobileNav.find('ul > li:eq(2)');
            eAboutUs.append($('<ul/>').append(eSubnavs['aboutus'].find('li').clone().removeAttr('class')));
            eAboutUs.find('ul').prepend('<li class="menu-title"><a href="#"><span class="sprite arrow-left-orange"></span> ' + eMainnav.find('#aboutus').text() + '</a></li>');
            
            //- Append mobile nav
            self.el.find('.mobile-holder').remove();
            self.el.append(eMobileNav);

            //- Add .sub classes
            eMobileNav.find('li').has('ul').addClass('sub');
            //-
            assignWidth();
            bindMobileEvents();
        }

        function assignWidth() {
            eMobileNav.find('.mobile-nav, .mobile-nav ul').css('width', nWinWidth);
            eMobileNav.find('.mobile-nav ul').css('left', nWinWidth);
        }

        var close = self.close = function(){
            hideAllNav();
        };

        var updateWidth = self.updateWidth = function(winWidth) {
            nWinWidth = winWidth;
            assignWidth();
        };

        var updatePos = self.updatePos = function(nOffset) {
            if(window.isMobile || window.navShowing) return;
            //- Fix nav on scroll - HOME
            if(self.options.bodyClasses.indexOf('home') == -1) return;
            if(headerSection.length) {
                if(nOffset < self.options.headerFixedOffset) {
                    $('.header-section').removeClass('fixed');
                    self.el.removeClass('fixed');
                    _.isNull(self.options.pushElements) || self.options.pushElements.addClass('navPushed');
                }
                else {
                    $('.header-section').addClass('fixed');
                    self.el.addClass('fixed');
                    _.isNull(self.options.pushElements) || self.options.pushElements.removeClass('navPushed');
                };

            } else {
                if(nOffset < self.options.fixedOffset) {
                    self.el.removeClass('fixed');
                    _.isNull(self.options.pushElements) || self.options.pushElements.addClass('navPushed');
                }
                else {
                    self.el.addClass('fixed');
                    _.isNull(self.options.pushElements) || self.options.pushElements.removeClass('navPushed');
                };

            } 
        };

        //---------------------------------------------
        //-- Plugin gymnastics - Part 2/3
        //---------------------------------------------

        self.initialize();
        $(document).on('click', function(e) {
            if(headerSection.length) {
              // remove all the click listening by checking if it has toggle-class
              if( !$(e.target).parent().hasClass('toggle-class') || !$(e.target).hasClass('toggle-class')) {
                $('.search.open').removeClass('open');
                hideAllNav();
              }
              if( !$(e.target).parent().hasClass('mobile-holder') || !$(e.target).hasClass('mobile-holder')) {
                $('.mobile-nav').removeClass('mobile-show');
              }
            }
        });
        $(document).on('taphold', function(e) {
            if(headerSection.length) {
              // remove all the click listening by checking if it has toggle-class
              if( !$(e.target).parent().hasClass('toggle-class') || !$(e.target).hasClass('toggle-class')) {
                $('.search.open').removeClass('open');
                hideAllNav();
              }
              if( !$(e.target).parent().hasClass('mobile-holder') || !$(e.target).hasClass('mobile-holder')) {
                $('.mobile-nav').removeClass('mobile-show');
              }
            }
        });
        $(document).on('scroll', function(e) {
            if(window.isMobile){
              if( !$(e.target).parent().hasClass('toggle-class') || !$(e.target).hasClass('toggle-class')) {
                $('.search.open').removeClass('open');
                hideAllNav();
              }
              var windowTop = $(window).scrollTop();
              $('.mobile-nav').removeClass('mobile-show');
              if(windowTop < 20){
                if($('body').hasClass('front')) {
                  if(headerSection.length) {
                    $('.header-section').removeClass('fixed');
                    $('nav').removeClass('fixed');
                  }
                };
              } else {
                if(!$('.header-section').hasClass('fixed')) {
                  $('.header-section').addClass('fixed');
                };

                if(headerSection.length) {
                  if(!$('nav').hasClass('fixed')) {
                    $('nav').addClass('fixed');
                  }
                };
              }
            };
           
        });
        
    }
    catch(e) {
        dumpError(e);
    };
    }
    //-- Plugin gymnastics - Part 3/3
    //---------------------------------------------
    $.pluginMutator(__name);
})(jQuery);