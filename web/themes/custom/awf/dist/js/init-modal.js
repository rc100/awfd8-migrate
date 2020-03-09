/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	// /**
	//  * @file
	//  * Fancybox
	//  * Loading and intializing a javascript modal library.
	//  *
	//  * Docs: https://fancyapps.com/fancybox/
	//  */

	// // Load fancybox library.
	// require('fancybox')(jQuery);
	// require('fancybox/dist/css/jquery.fancybox.css');

	// (function ($) {
	//   // DOC READY
	//   $(function () {

	//     // Initialize fancybox on a selector.
	//     $('.fancybox').fancybox({
	//       // Accessibility edits:
	//       // Set focus to the modal on show.
	//       afterShow: function () {
	//         $(this.wrap).queue(function () {
	//           $(this).focus();
	//         });

	//         // Trigger click of close buton if you tab out.
	//         $('a.fancybox-close').keydown(function (e) {
	//           if (e.which == 9 && !e.shiftKey) {
	//             $(this).trigger('click');
	//           }
	//         });
	//       },
	//       // Set focus to the trigger on close.
	//       afterClose: function () {
	//         $(this.element).focus();
	//       }
	//     });

	//   });
	// })(jQuery);


/***/ })
/******/ ]);