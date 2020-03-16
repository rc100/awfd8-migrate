function ucfirst(str) {
	// http://kevin.vanzonneveld.net
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   bugfixed by: Onno Marsman
	// +   improved by: Brett Zamir (http://brett-zamir.me)
	// *     example 1: ucfirst('kevin van zonneveld');
	// *     returns 1: 'Kevin van zonneveld'
	str += '';
	var f = str.charAt(0).toUpperCase();
	return f + str.substr(1);
}
function capitalize(str) {
	str += '';
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
function lowerize(str) {
	str += '';
    return str.toLowerCase();
}
function trim(str) {
	str += '';
    return str.trim();
}