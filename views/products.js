$(document).ready(function() {
	// set the products tab to active
	$("#nav-products").addClass("nav-active");
	var maxWidth = $(window).width()*0.9;
	var maxHeight = $(window).height()*0.95;

	// modal dialog settings
	$("#imageZoom").dialog({
		autoOpen: false,
		modal: true,
		title: "Product",
		width: "auto",
		height: "auto",
		maxWidth: maxWidth,
		maxHeight: maxHeight,
		resizable: false,
		draggable: false
	});

	// when modal dialog closes
	$("#imageZoom").bind("dialogclose", function(event, ui) {
		$("#zoomedImage").attr("src", "");
	});
	
	
	// bind click events to all sample images (li>imgs where we haven't set data-zoomable to false)
	$("ul.product-samples>li>img:not([data-zoomable='false'])").click(function(event) {
		var elmt = event.currentTarget,
			w, h, title;
		
		// prevent default click behavior - not necessary if not links
		// event.preventDefault();
		
		// get the path to the full image file
		// the ids for the li are set to subfolder-imagefilename where subfolder is the subfolder in /img/products
		// so we need to replace the FIRST "-" in id with a "/" and add that to the path
		// notice we're not using the g (global) flag, so we only replace the first occurrence
		var imgSrc = "/img/products/" + elmt.id.replace("-", "/") + "-full.png";
		
		// if we actually got a source image for the click, continue
		if (imgSrc !== "") {
			// set the width and height depending on the data-orientation attribute
			if ($(elmt).data("orientation") === "portrait") {
				w = 250;
				h = 473;
			}
			else if ($(elmt).data("orientation") === "landscape") {
				w = 473;
				h = 250;
			}
			else if ($(elmt).data("orientation") === "square") {
				w = 473;
				h = 473;
			}
			
			// set the title based on the alt attribute of the child img element
			title = $(elmt).attr("alt");
			
			// and show the modal
			setZoomImage({
				src: imgSrc,
				width: w,
				height: h,
				title: title
			});
		}
				
	})
	// and show a click-pointer for all these elements (but only on the img)
	.addClass("clickable");
	
	
});

var setZoomImage = function(imgData) {
	$("#zoomedImage").attr({
		src: imgData.src,
		width: imgData.width,
		height: imgData.height
	});
	$("#imageZoom").dialog("option", "title", imgData.title);
	$("#imageZoom").dialog("open");
	$(".ui-widget-overlay").click(function(){
		$("#imageZoom").dialog("close");
	});
};
