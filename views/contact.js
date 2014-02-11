$(document).ready(function() {
	// set the products tab to active
	$("#nav-contact").addClass("nav-active");
});


var loadingSpinner = function(action) {
	switch(action) {
		case "start":
			$("body").addClass("ajax-loading");
			break;
		case "stop":
			$("body").removeClass("ajax-loading");
			break;
	}
};