(function($) {
	//Define the plugin's name here
	var __name = 'footer';
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
			animFX: 'easeOutExpo',//cubic-bezier(0,0.9,0.3,1)',
			animTime: 333,
			showTextFields: false
		};
		
		self.initialize = function() {
			self.options = $.extend({}, self.defaults, options);
			//-
			ignite();
		};
		
		//-- Vars
		//---------------------------------------------
		var isFocused, nTextFieldHeight, iFocusCheck;
		//-- Start
		//---------------------------------------------
		function ignite(){
			isFocused = false;
			eTextfield = self.el.find('.webform-component-textfield').remove();
			nTextFieldHeight = eTextfield.height();
			//-
			self.el.find('input.form-email').after(eTextfield);
			!self.options.showTextFields || showTextFields();
			bindEvents();
		}
		function bindEvents() {
			self.el.find('input[type="email"]').focus(function() {
				isFocused = true;
				startInterval();
				showTextFields();
			});
			self.el.find('input[type="text"]').focus(function() {
				isFocused = true;
			});
			self.el.find('input[type="text"], input[type="email"]').blur(function() {
				isFocused = false;
				clearInterval(iFocusCheck);
				setTimeout(function() {
					hideTextFields();
				},1200);
			});
			/*
			//- Attach Drupal behaviors
			var eForm = self.el.find('form');
			try {
				Drupal.behaviors.webform = {
					attach: function(eForm) {
						if(_.isUndefined(eForm)) return;
						try {
							eForm.ajaxComplete(function(event, xhr, settings) {
								new $.footer($(event.currentTarget).parents('footer'),{
									showTextFields: true
								});
							});
						}
						catch(e) {}
					}
				};
			}
			catch(e) {}*/

		}
		function startInterval() {
			if(isFocused)
			iFocusCheck = setInterval(function() {
				eTextfield.not(':visible') ? showTextFields() : '';
			},300);

		}
		function setFieldFocus() {
			var eFirstName, eLastName;
			eFirstName = self.el.find('#edit-submitted-first-name');
			eLastName = self.el.find('#edit-submitted-last-name');
			if(eFirstName.val() == '') return eFirstName.focus();
			if(eLastName.val() == '') return eLastName.focus();
		}
		function showTextFields() {
			var eFields = self.el.find('.webform-component-textfield:not(:visible)');
			eFields
			.stop()
			.hide()
			.slideToggle(self.options.animTime, self.options.animFX, function() {
				//setFieldFocus();
			});
			return;
			/*
			.css({
				'height' : 0,
				'opacity': 0
			})
			.show()
			.transition({
				height: nTextFieldHeight,
				opacity: 1
			}, self.options.animTime, self.options.animFX, function() {
				setFieldFocus();
			});*/
		}
		function hideTextFields() {
			
			if(!isFocused && !self.options.showTextFields) 
				self.el.find('.webform-component-textfield')
				.slideToggle(self.options.animTime, self.options.animFX);
			//-
			return;
			/*
			self.el.find('.webform-component-textfield').eq(0).transition({
				height: 0,
				opacity: 0
			}, self.options.animTime / 2, self.options.animFX, function() {

				$(this).hide();

				self.el.find('.webform-component-textfield').eq(1).transition({
					height: 0,
					opacity: 0
				}, self.options.animTime / 2, self.options.animFX, function() {
					$(this).hide();
				});
			});*/
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
