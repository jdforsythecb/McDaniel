$(document).ready(function() {
	// set the products tab to active
	$("#nav-products").addClass("nav-active");

	// modal dialog settings
	$("#imageZoom").dialog({
		autoOpen: false,
		modal: true,
		title: "Product",
		width: 700,
		resizable: true
	});

	// when modal dialog closes
	$("#imageZoom").bind("dialogclose", function(event, ui) {
		$("#zoomedImage").attr("src", "");
		$("#zoomedImageCaption").html("");
	});

	// bind all links with class "zoomable-image" to a click handler
	$(".zoomable-image").click(function(event) {
		// prevent from going to #ZoomImage and messing with the history state
		event.preventDefault();
		// open the modal dialog with the proper image
		var imgData = getImageData(event.currentTarget.id);
		console.log(imgData);
		// only open the dialog if we have a source for the image
		if (imgData.src !== "") setZoomImage(imgData.src, imgData.width, imgData.height, imgData.title, imgData.caption);
	});
});

var setZoomImage = function(source, width, height, title, caption) {
	$("#zoomedImage").attr({
		src: source,
		width: width,
		height: height
	});
	$("#imageZoom").dialog("option", "title", title);
	$("#zoomedImageCaption").html(caption);
	$("#imageZoom").dialog("open");
	$(".ui-widget-overlay").click(function(){
		$("#imageZoom").dialog("close");
	});
};

var getImageData = function(id) {
	var baseImageSrc = "/img/products/";
	var baseImageExt = ".png";
	var img, w, h, title, caption;

	switch(id) {
		case "loose-butterfly":
			img = "loose-butterfly-full";
			w = 250;
			h = 473;
			title = "Butterfly Welcome Envelope";
			caption = "This is one of our most popular loose/pew envelopes, the beautiful, full-color butterfly image with a message welcoming visitors to your church. This is also a great backup for your regular envelope members who may forget their envelope, or for new members to request envelopes.";
			break;

		case "loose-dove-blue":
			img = "loose-dove-blue-full";
			w = 250;
			h = 473;
			title = "Blue Dove Welcome Envelope";
			caption = "This is our blue dove welcome envelope";
			break;

		case "loose-dove-green":
			img = "loose-dove-green-full";
			w = 250;
			h = 473;
			title = "Green Dove Welcome Envelope";
			caption = "This is our green dove welcome envelope";
			break;

		default:
			img = "";
			w = 0;
			h = 0;
			title = "";
			caption = "";
	}

	// if img is empty, leave it - otherwise put the filename between the path and extension
	img = (img === "") ? "" : baseImageSrc + img + baseImageExt;

	return {
		src: img,
		width: w,
		height: h,
		title: title,
		caption: caption
	};

};
