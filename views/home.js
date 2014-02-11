$(document).ready(function() {
	// set the active header>ul>li class to .nav-active (show which tab we're on)
	$("#nav-home").addClass("nav-active");

	// make the 3 columns on the home page the same height
	var left = $("#column-left");
	var middle = $("#column-middle");
	var right = $("#column-right");

	console.log("left height: " + left.height());
	console.log("middle height: " + middle.height());
	console.log("right height: " + right.height());

	console.log("lcss: " + left.css("height"));
	console.log("mcss: " + middle.css("height"));
	console.log("rcss: " + right.css("height"));

	var maxHeight = Math.max(left.height(), middle.height(), right.height());
	console.log("max: " + maxHeight);

	left.height(maxHeight);
	middle.height(maxHeight);
	right.height(maxHeight);
});