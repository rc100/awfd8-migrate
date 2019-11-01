/**
 * @file
 * Loading and intializing a javascript google map library
 *
 * Docs: https://developers.google.com/maps/documentation/javascript/tutorial
 */

// Enable info window
var infowindow = new google.maps.InfoWindow();
// Enable bounds
var bounds = new google.maps.LatLngBounds();

var map = new google.maps.Map(document.getElementById('googlemap'), {
  // disable default UI and add our own settings
  // https://developers.google.com/maps/documentation/javascript/controls#DisablingDefaults
  disableDefaultUI: true,
  fullscreenControl: true,
  scrollwheel: false,
  zoomControl: true,
  zoom: 10,
  // Google map custom styles: https://snazzymaps.com/explore
  // N/A - we are centering using bounds
  // center: new google.maps.LatLng(45.5506509, -122.6624718)
});

var locations = [
  ['CHIEF PDX', 45.5506509, -122.6624718, 'Portland, OR'],
  ['CHIEF DC', 38.9089576, -77.0422005, 'Washington, DC']
];

function placeMarker(location) {
  var latLng = new google.maps.LatLng(location[1], location[2]);
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAtCAYAAAAk09IpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpkMWJiOTlkOC0zODFlLTQxZDQtOTM0Ny05YzFjZGEzOGZjMDIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTRFRDdFOEE4MzNGMTFFN0JGM0Q5MUVFQUI0RkIyRTAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTRFRDdFODk4MzNGMTFFN0JGM0Q5MUVFQUI0RkIyRTAiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozODhhNTJiOS03YWMwLTQ1NGEtOWUxOC0xYTNmZDkzZTYwM2UiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDoyODFhNTBkMC1lNDU2LTExN2EtOTQ2ZC1jMjBlYzExNjVmZjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7gv1QSAAAFJklEQVR42sxYe1BUZRQ/vAUlaZH3W5ZdHissq4i8hSAcHhVmWUk04dBjJscyrT8a/rFybMpGJ5vp8U+lhiVR/GHOuI0oNELBIjQQA/EQXF4BoYC6sAt0znJ3ZrGdvd/dB9OZOfN9937nnu93z3de9zosLy/D/4WchT5wdaQ7GoctyLHIm5GjkN245XvIzcityG3IHXz6dgZKhYNBEPk47EYuab4x6DMydgcmJudgfGIWdLpFvYyrqzNEhHqnh4WIICUpYgZv1SBXI19k2cOB75gQRCIORzu6RopU7begFXl2TsOr2H2dCygSQiEpMRTi44Iu461K5N/NWcYsGARSjsMnX1c1eVy73muxL6QlR8L+0pQFnB4mfYLBIJCTDU19B+saeuDm0JTVzhngvxFyM6WQnSE5jZcHmH0GgZxAEAerfmgB3eKSTSJlFH3sXDX5NryGgHQ4vvGgjKMJIKWNzQOHvvtRZTMgBlpaWoaqGhXgi76Ol6+aBYNAwnH4go5mQbtol1xCkVf3aw9N6bjizFnm+IXaG+69AxN2TW7qkdtw9kIz7X3SJBi0inxIPb330i+da5Jtr9R3Q1fPWC7um2PKMgc4860Z1a+ki4pV0YTognEopoQmhORRwVCSJYe4zYH668aOfjivbIHhidtMz//ROUxDAe4fiSHeZwjt9N9UN31YMquBSndth6MVxavuKaQhsC9/O7zzWS1cauQ/7vsaLVnnocxUcTZe9hmOKUlIYitIlf0HiIG8NrjDp4efARlnLT66NTxNQ4Kxz8RS4WMhT491UPliAa9cZXkBG5gRPZh4YzB+d2bYjkga5gd+Ik9euXhxEARu2sgrd/culSwQmczALJZhITcXZ4gM8uGVc3LSQ9Aag3Fi7fjuaxaY5LSYaQdGJwW9qAHM5Ib1bkwPtPeqYWxqhleupWsQ1H/zh7i3aD0NQ8Zgen19PNksM6+Fj75V8sp9eE7JpC/IX+9XncZg6qKj/JjNWXO1DT44c9nk2j08xkOnqqHtLzWTLonYV5+MjfuZa8lbw8exf/GbmWWLqs9/aoB23LAwTQYx4QGwoNPBn/2j8P2VVugZGmfS4bvJE2QxgX2GdtSZ67ZGMSV/k74j8sjPSvZC2dQ5oGeKiEULep+0HfRxAWdx/+kHQ/v0nscSNQ97eQhWagkQ2qc4f8uccU/saNSLkke/W/SobE0qduHKPsdx3ymTzRUuHMP+tD4/J8auQHY9Egs5GZLrOD1mtgdGKt9bslUTI/G3CxDS+/QTCoqS55GXzYKhvoIE0UJ2AcPpJSD9vF8HHKDqbfLQ8+jQNgWCFgfUe4b75AUmMBy9XJAXN5CUGGYTIBkpYkBf7Ca9fLXJlHWoAO0ns7q6OFkFhOoedzz7qKIIBsMBojLxMZnXGiopTIDwENF7OFWxVG1zgN7Et2rOzZJaBCRvZzRZpZ77CwFWgeHohef2JC2FBosEAYkI84Znn9xG39UvCeln+KzThcMrQsM9Z0Wevou6bQaGA/RlVqr44u4iOZM8pYW05MhanH4ltNNjpbKifJlakRBiVojWMS1QQ1NmSdvJap1/qFxkp0v0/+9M/rHEdoLWSQ55xm5gOEDKuOiAE1hfTK4/9bgCcP0UTpVCdTtamDqOoHPW41GsdthMKeRlR1PX9rYlSi0Cg9ahaluGTjpP4UtEv1uz06MMxzO/ZmA4QIMU7hS+K0AkEBTgVWHo9C0hB2t/12Pv/BYVZFj5Af2+BS9lOzC2pH8FGACHpLs3zjjqTgAAAABJRU5ErkJggg=='
  });
  google.maps.event.addListener(marker, 'click', function () {
    infowindow.close(); // Close previously opened infowindow
    // Set infowindow content
    infowindow.setContent("<div id='infowindow'><div><strong>" + location[0] + "</strong></div><div>" + location[3] + "</div></div>");
    infowindow.open(map, marker);
  });
  bounds.extend(latLng);
}

for (var i = 0; i < locations.length; i++) {
  placeMarker(locations[i]);
}

// Sets the viewport to contain the given bounds
map.fitBounds(bounds);

google.maps.event.addDomListener(window, "resize", function () {
  var center = map.getCenter();
  google.maps.event.trigger(map, "resize");
  map.setCenter(center);
});
