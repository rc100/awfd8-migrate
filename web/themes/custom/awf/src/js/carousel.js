
// require('owl.carousel');
// require('owl.carousel/dist/assets/owl.carousel.min.css');

(function($, Drupal) {

	Drupal.behaviors.customBehavior = {

		attach: function(context, settings) {

			// Initialize jcarousel on a selector.
			$('.jcarousel').jcarousel({
				animation: {
					duration: 800,
					easing:   'linear',
					wrap: 'both',
					complete: function() {
					}
				}
			});



			// $('.owl-carousel img').on('dblclick', function(e){
			// 	e.preventDefault();
			// 	e.stopPropagation();
				
			// 	var src = $(this).attr('src');
			// 	var htmlWrapper = '<div id="popoutWrapper"><div id="popoutInner"><img src="' + src + '" /></div></div>';
		
			// 	if( ! $('#popoutWrapper').length ) {
			// 		$('#block-views-block-gallery-entity-block-1').append(htmlWrapper);
			// 	} 

			// 	var asgAlert = function(){
			// 		$(document).click(function() {
						
			// 			// if( $('#popoutWrapper').length ) {
			// 			// 	alert('found');
			// 			// 	$('#popoutWrapper').remove();
			// 			// }
			// 			$('#popoutWrapper').remove();
			// 		});
			// 	}

			// 	asgAlert();
 				
			// });

		}

	};

} (jQuery, Drupal))