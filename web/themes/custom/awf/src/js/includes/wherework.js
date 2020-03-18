(function ($) {
  var __name = "wherewework";
  $[__name] = function (el, options) {
    try {
      var self = this;
      self.el = el = $(el);
      $(self.el).data(__name, self);
      self.defaults = {
        animFX: "easeOutExpo",
        animTime: 666,
        openedMargin: 0,
        closedMargin: "100%",
        dotEntrySpeed: 200,
        navOffset: 0,
        tabIgnore: "#collapse",
        animateTooltipOnce: true,
        scrollClass: "scroll",
        image404: Drupal.settings.basePath + "sites/all/themes/awf/img/404.jpg",
        outiseClickElement: "body"
      };
      self.initialize = function () {
        self.options = $.extend({}, self.defaults, options);
        ignite()
      };
      var flipClass = "flip-v";
      var tabsCollapse = {collapseTop: "550px", expandTop: "49px", trigger: "a.collapse"};
      var shouldScroll = false;
      var init = true;
      var aDotOffset = {};
      var aBubbleTextMaxLength = [18, 36];
      var iScrollTimeout = null;
      var eIntroClone = null;

      function ignite() {
        aDotOffset.top = -20 + parseInt(self.el.find("#content-map").css("marginTop"));
        aDotOffset.left = -20;
        eIntroClone = _.isNull(eIntroClone) ? self.el.find(".intro-text").clone() : eIntroClone;
        eIntroClone.hide();
        shouldScroll = self.el.hasClass(self.options.scrollClass);
        init = window.isMobile || window.isPortrait || doTabs(true);
        if (isMobileInterface()) {
          self.el.find("img.map").eq(0).show();
          reorderContents()
        }
        Tooltip.dismiss()
      }

      function bindEvents() {
        self.el.find('[rel="toggle"]').click(function (e) {
          e.stopPropagation();
          if ($(this).hasClass("map-open")) return toggleContent("open");
          if ($(this).hasClass("map-close")) return toggleContent("close");
          return false
        });
        if (!isMobileInterface()) self.el.find(".content-tabs div li a").hover(function () {
          Tooltip.autopilot("abort");
          Tooltip.show($(this));
          Dots.activateFromList($(this).parent("li").index())
        }, function () {
        });
        self.el.bind("click", function (e) {
          e.stopPropagation();
          return false
        });
        if (!isMobileInterface()) self.el.find("ul.dots li a").click(function (e) {
          e.stopPropagation();
          return true
        });
        self.el.find(tabsCollapse.trigger).click(function (e) {
          e.stopPropagation();
          return toggleTabs($(this))
        });
        Tooltip.init();
        if (shouldScroll) {
          $(window).scroll(function () {
            clearTimeout(iScrollTimeout);
            iScrollTimeout = setTimeout(function () {
              scrollToView()
            }, self.options.animTime / 3)
          });
          scrollToView()
        }
      }

      function bindOutsideClickListener() {
        $(self.options.outiseClickElement).bind("click", function () {
          toggleContent("close")
        })
      }

      function unbindOutsideClickListener() {
        $(self.options.outiseClickElement).unbind("click")
      }

      function scrollToView() {
        self.el.stop().animate({top: $(window).scrollTop() - 8}, self.options.animTime, self.options.animFX)
      }

      function toggleContent(trig) {
        switch (trig) {
          case"open":
            self.el.animate({marginLeft: self.options.openedMargin}, self.options.animTime, self.options.animFX, function () {
              Dots.stop();
              Dots.draw();
              bindOutsideClickListener()
            });
            break;
          case"close":
            self.el.animate({marginLeft: self.options.closedMargin}, self.options.animTime, self.options.animFX, function () {
              Tooltip.dismiss();
              Dots.stop();
              unbindOutsideClickListener()
            });
            break
        }
        return false
      }

      function reorderContents() {
        if (window.isPortrait) {
          self.el.find("#content-map").before(eIntroClone.show())
        }
        self.el.find(".maplist").each(function () {
          if (!$(this).find("h3").length) $(this).prepend($("<h3>").text(self.el.find('ul.tabs li a[href="#' + $(this).attr("id") + '"]').text()))
        })
      }

      function cleanup(fnCallback) {
        Tooltip.kill();
        Dots.kill();
        self.el.find(".nine.columns .intro-text").remove();
        self.el.find(".intro-text").show();
        self.el.find(".content-tabs").css("top", 0).find(".maplist").show();
        self.el.find(tabsCollapse.trigger).unbind("click");
        fnCallback()
      }

      function isMobileInterface() {
        return window.isPortrait || window.isMobile
      }

      var Tooltip = {
        el: self.el.find("#tooltip"),
        animOffset: 25,
        fullWidth: 960,
        leftOffset: 100,
        tip: {height: 40, leftOffset: 80},
        timer: null,
        autoStart: true,
        isHovered: false,
        autopilotSpeed: 3e3,
        init: function () {
          var self = this;
          self.el.hover(function () {
            Tooltip.isHovered = true
          }, function () {
            Tooltip.isHovered = false;
            Dots.hoverOut()
          })
        },
        show: function (eLink) {
          var sImgPath, fnApplyImg, fnShowTooltip, el, nTop, nHeight;
          el = this.el;
          fnApplyImg = function (imgSrc, callback) {
            el.find(".left-column").css({backgroundImage: "url(" + imgSrc + ")", height: nHeight + "px"});
            callback()
          };
          fnShowTooltip = function () {
            el.stop().show().transition({y: "-=" + this.animOffset + "px", opacity: 1}, 666, self.options.animFX)
          };
          this.autopilot("stop");
          nTop = this.position(eLink.attr("data-coords").split(","));
          el.find(".bubble p").removeClass("twoliner threeliner");
          var l = eLink.text().length;
          if (l >= aBubbleTextMaxLength[0] && l < aBubbleTextMaxLength[1]) el.find(".bubble p").addClass("twoliner");
          if (l >= aBubbleTextMaxLength[1]) el.find(".bubble p").addClass("threeliner");
          el.find(".bubble p").text(eLink.text());
          el.find(".title").text(eLink.attr("data-title"));
          el.find(".desc").text(eLink.attr("data-desc"));
          el.find(".more").remove();
          el.click(function () {
            document.location.href = eLink.attr("href")
          });
          nHeight = el.find(".right-column").height();
          var eDummyImg = $("<img/>").attr("src", eLink.attr("data-img"));
          eDummyImg.load(function (response, status, xhr) {
            fnApplyImg($(this).attr("src"), function () {
              fnShowTooltip()
            })
          }).bind("error", function () {
            fnApplyImg(self.options.image404, function () {
              fnShowTooltip()
            })
          })
        },
        position: function (aCoords) {
          var t, l, el, f, d;
          el = this.el;
          t = parseInt(aCoords[1]);
          l = parseInt(aCoords[0]);
          el.removeClass("reverse-v");
          el.removeClass("reverse-h");
          t -= parseInt(this.animOffset * 2);
          l -= parseInt(this.leftOffset);
          if (t < el.height()) {
            el.addClass("reverse-v");
            t += el.height() - this.tip.height;
            l += this.tip.leftOffset
          } else t -= el.height() - this.animOffset;
          f = this.fullWidth - this.el.width();
          d = this.fullWidth / 2 + l;
          if (d > f) el.addClass("reverse-h");
          t += aDotOffset.top;
          l += aDotOffset.left;
          el.css({left: l + "px", top: t + "px", opacity: 0});
          return t
        },
        autopilot: function (trig) {
          if (isMobileInterface()) return;
          var loop = function (i) {
            var e = self.el.find(".maplist.active li");
            if (i >= e.length) return Tooltip.autopilot("stop");
            Tooltip.show(e.eq(i).find("a"));
            Dots.activateFromList(e.eq(i).index());
            this.timer = setTimeout(function () {
              loop(++i)
            }, Tooltip.autopilotSpeed)
          };
          var stop = function () {
            if (self.options.animateTooltipOnce) Tooltip.autopilot("abort");
            Tooltip.dismiss();
            clearTimeout(this.timer)
          };
          switch (trig) {
            case"loop":
            default:
              !this.autoStart || loop(0);
              break;
            case"stop":
              stop();
              break;
            case"abort":
              this.autoStart = false;
              break
          }
        },
        dismiss: function () {
          deactivate(self.el.find("#content-map").find(".dot"));
          this.isHovered = false;
          this.el.stop().animate({opacity: 0}, this.animTime, this.animFX, function () {
            $(this).hide()
          })
        },
        kill: function () {
          this.dismiss();
          this.autopilot("stop")
        }
      };
      var Dots = {
        map: self.el.find("#content-map"),
        model: $("<a/>").css({position: "absolute"}).addClass("dot").append($("<span/>")),
        activeDot: null,
        hoverOutTimer: null,
        init: function () {
          this.draw()
        },
        stop: function () {
          this.undraw()
        },
        draw: function () {
          var eModel, eMap, eMapList, eImg, eActiveMap;
          eModel = this.model;
          eMap = this.map;
          eActiveMap = self.el.find(".maplist.active");
          eImg = self.el.find("img." + eActiveMap.attr("id"));
          this.undraw();
          Tooltip.dismiss();
          eActiveMap.find("ul.dots li").each(function () {
            var link = $(this).find("a");
            var eLi = $(this);
            var coords = link.attr("data-coords");
            coords = _.isUndefined(coords) ? "" : coords.split(",");
            var eDot = eModel.clone();
            link.attr("data-id", "dot-" + $(this).index());
            eDot.css({
              top: parseInt(parseInt(trim(coords[1].toString())) + aDotOffset.top) + "px",
              left: parseInt(parseInt(trim(coords[0].toString())) + aDotOffset.left) + "px"
            }).attr("data-ref", link.attr("data-id"));
            Dots.bindEvents(eActiveMap, eLi, eDot);
            eDot.hide();
            eMap.append(eDot)
          });
          var makeDotEntry = function (i) {
            var eDots = eMap.find(".dot");
            if (i > eDots.length) return Tooltip.autopilot();
            eDots.eq(i).addClass("activate").show();
            setTimeout(function () {
              eDots.eq(i).removeClass("activate");
              makeDotEntry(++i)
            }, self.options.dotEntrySpeed)
          };
          makeDotEntry(0)
        },
        bindEvents: function (eActiveMap, eLi, eDot) {
          var eMap;
          eMap = this.map;
          eDot.hover(function () {
            clearTimeout(Dots.hoverOutTimer);
            Tooltip.show(eActiveMap.find('a[data-id="' + $(this).attr("data-ref") + '"]'));
            Dots.activeDot = $(this);
            Tooltip.autopilot("abort");
            if (!$(this).hasClass("active")) {
              Tooltip.show(eActiveMap.find('a[data-id="' + $(this).attr("data-ref") + '"]'))
            }
            deactivate(eMap.find(".dot:not(:eq(" + eLi.index() + "))"));
            activate($(this))
          }, function () {
            Dots.hoverOut()
          });
          if (!isMobileInterface()) eDot.click(function (e) {
            e.stopPropagation();
            document.location.href = eActiveMap.find('a[data-id="' + $(this).attr("data-ref") + '"]').attr("href")
          })
        },
        hoverOut: function () {
          Dots.hoverOutTimer = setTimeout(function () {
            if (Tooltip.isHovered) return;
            deactivate(Dots.activeDot);
            Tooltip.dismiss();
            Dots.activeDot = null
          }, 300)
        },
        undraw: function () {
          this.map.find(".dot").remove()
        },
        activateFromList: function (index) {
          self.el.find(".dot").removeClass("active").eq(index).addClass("active")
        },
        kill: function () {
          this.undraw()
        }
      };

      function doTabs() {
        var fnChange = function (id, s) {
          if (id != self.options.tabIgnore) {
            deactivate(s.tabs.removeClass(s.selected));
            activate(s.tab(id).addClass(s.selected));
            deactivate(s.items.hide());
            activate(s.item(id).show());
            self.el.find("img.map").hide();
            self.el.find("img.map." + id.replace(/#/, "")).show();
            if (!shouldScroll) {
              self.el.find(tabsCollapse.trigger).show();
              init || expandTabsPanel();
              init ? setTimeout(function () {
                collapseTabsPanel()
              }, self.options.animTime) : ""
            }
            Dots.init();
            Tooltip.dismiss()
          }
          return false
        };
        self.el.find(tabsCollapse.trigger).show();
        bindEvents();
        $.fn.onTabChange = $.idTabs.extend(fnChange);
        return self.el.find(".tabs").onTabChange()
      }

      function expandTabsPanel() {
        var el = self.el.find(".content-tabs");
        el.find(tabsCollapse.trigger).removeClass(flipClass);
        el.find("a.active").addClass("selected");
        el.animate({top: tabsCollapse.expandTop}, self.options.animTime, self.options.animFX);
        el = self.el.find(".intro-text");
        el.fadeOut(self.options.animTime);
        $.scroll2(0, {animTime: self.options.animTime, animFX: self.options.animFX})
      }

      function collapseTabsPanel() {
        var el = self.el.find(".content-tabs");
        el.find(tabsCollapse.trigger).addClass(flipClass);
        el.find("a.active").removeClass("selected");
        el.animate({top: tabsCollapse.collapseTop}, self.options.animTime, self.options.animFX);
        el = self.el.find(".intro-text");
        el.fadeIn(self.options.animTime)
      }

      function toggleTabs(el) {
        if (el.hasClass(flipClass)) expandTabsPanel(); else collapseTabsPanel();
        return false
      }

      function activate(el) {
        _.isNull(el) || el.addClass("active")
      }

      function deactivate(el) {
        _.isNull(el) || el.removeClass("active")
      }

      var viewportUpdate = self.viewportUpdate = function () {
        cleanup(function () {
          ignite()
        })
      };
      self.initialize()
    } catch (e) {
      dumpError(e)
    }
  };
  $.pluginMutator(__name)
})(jQuery);