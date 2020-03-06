(function($) {
	//Define the plugin's name here
	var __name = 'scroll2';
	//--
	$[__name] = function(top, options) {
	try {
		
		//-- Plugin gymnastics - Part 1/3
		//---------------------------------------------
		var self = this; // prevent from loosing the scope
		self.top = top;
    var i = false; // I have no idea what this does.
		//---------------------------------------------
		
		//-- init
		//---------------------------------------------
		self.defaults = {
			animTime: 666,
			animFX: 'easeOutExpo',
			callback: function() {}
		};
		
		self.initialize = function() {
			self.options = $.extend({}, self.defaults, options); //merging defaults with passed arguments
			//-
			ignite();
		};
		
		//-- Start
		//---------------------------------------------
		function ignite() {
			if(window.isMobile) {
				window.scrollTo(self.top, 0);
				self.options.callback();
			}
			else
			$('body,html').animate({
          scrollTop: self.top + 'px'
            }, self.options.animTime, self.options.animFX, function() {
            if(!i) {
              self.options.callback();
            }
            i = true;
          });
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
