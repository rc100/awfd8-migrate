
(function($) {
	//Define the plugin's name here
	var __name = 'transformer';
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
		self.defaults = {};
		
		self.initialize = function() {
			self.options = $.extend({}, self.defaults, options); //merging defaults with passed arguments
			//-
			ignite();
			
		};

		var aFormElements = [
			'file',
			'input',
			'select',
			'textarea'
		],
		nMaxLabelLength = 15;

		//-- Start
		//---------------------------------------------
		function ignite() {
			/*
			//- Attach Drupal behaviors
			var eForm = self.el;
			try {
				Drupal.behaviors.webform = {
					attach: function(eForm) {
						if(_.isUndefined(eForm)) return;
						try {
							eForm.ajaxComplete(function(event, xhr, settings) {
								new $.transformer(event.currentTarget);
							});
						}
						catch(e) {}
					}
				};
			}
			catch(e) {
				dumpError(e);
			}*/
			
			//- Add tabindex to each form element
			var i = 0;
			_.each(aFormElements, function(v,k) {
				self.el.find(v).attr('tabindex',++i);
			});
			//-
			doRadio();
			doSelect();
			doFile();
			//-
			bindSpecifics();
			showOn();
		}
		function showOn() {
			self.el.css('opacity',0).show().transition({
				opacity:1
			},666);
		}
		function doRadio() {
			var eRadio = self.el.find('input[type="radio"]'),
			eSwitch = $('<div class="radio-switch"/>');
			//-

			if(self.el.find('.radio-switch').length) return;

			eRadio.before(eSwitch);
			eRadio.siblings('.radio-switch').click(function(e) {
				//-
				var v = $(this).siblings('input[type="radio"]').attr('name');
				eRadio.filter('[name="' + v + '"]')
				.removeAttr('checked')
				.siblings('.radio-switch').removeClass('on');
				//-
				$(this).addClass('on')
				.next('input[type="radio"]')
				.attr('checked','checked').trigger('change');
			});
			//- Label click
			eRadio.siblings('label').each(function() {
				if($(this).text().length > nMaxLabelLength) self.el.addClass('radio-stack');
			})
			.click(function(e) {
				$(this).siblings('.radio-switch').trigger('click');
			});
		}
		function doSelect() {
			self.el.find('select').chosen();
			self.el.find('.chzn-search').hide();
		}
		function doFile() {
			if(self.el.find('.form-managed-file .relative').length) return self.el.find('.form-managed-file .form-submit').show();
			//-
			self.el.find('.form-managed-file input, .form-managed-file .awf-pseudo-file-input').wrapAll('<div class="relative left"></div>');
			self.el.find('.form-managed-file .form-submit').show();
		}
		function bindSpecifics() {
			var s = '';
			//- edit-submitted-how-did-you-hear-about-awf
			s = '#webform-component-other-input'
			self.el.find('#edit-submitted-how-did-you-hear-about-awf').bind('change', function() {
				var b = valMatch($(this).attr('id'), $(this).val());
				if(b) self.el.find(s).show();
				else self.el.find(s).hide(); 
			});
		}
		function valMatch(sElement, sVal) {
			switch(sElement) {
				case 'edit-submitted-how-did-you-hear-about-awf':
					if( 
					(sVal == 'Online Job Board') || 
					(sVal == 'University Posting/Career Fair') || 
					(sVal == 'Other')) return true;
					return false;
			}
		}
		//-
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
