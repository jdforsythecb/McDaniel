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
		width: Math.min(700,maxWidth),
		height: "auto",
		maxWidth: maxWidth,
		maxHeight: maxHeight,
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
		// only open the dialog if we have a source for the image
		if (imgData.src !== "") setZoomImage(imgData.src, imgData.width, imgData.height, imgData.title, imgData.caption);
	});
	
	
	initialize_galleriffic();
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




var initialize_galleriffic = function() {
	
	// we only want these styles applied when javascript is enabled
	$("div.content").css("display", "block");
	
	// initially set opacity on thumbs and add additional styling for hover effect on thumbs
	var onMouseOutOpacity = 0.67;
	$('#thumbs ul.thumbs li, div.navigation a.pageLink').opacityrollover({
		mouseOutOpacity:   onMouseOutOpacity,
		mouseOverOpacity:  1.0,
		fadeSpeed:         200,
		exemptionSelector: '.selected'
	});
	
	// initialize gallerific gallery
	var gallery = $('#thumbs').galleriffic({
        delay:                     2500, // in milliseconds
        numThumbs:                 5, // The number of thumbnails to show page
        preloadAhead:              5, // Set to -1 to preload all images
        enableTopPager:            false,
        enableBottomPager:         false,
        maxPagesToShow:            7,  // The maximum number of pages to display in either the top or bottom pager
        imageContainerSel:         '#slideshow', // The CSS selector for the element within which the main slideshow image should be rendered
        controlsContainerSel:      '#controls', // The CSS selector for the element within which the slideshow controls should be rendered
        captionContainerSel:       '#caption', // The CSS selector for the element within which the captions should be rendered
        loadingContainerSel:       '#loading', // The CSS selector for the element within which should be shown when an image is loading
        renderSSControls:          true, // Specifies whether the slideshow's Play and Pause links should be rendered
        renderNavControls:         true, // Specifies whether the slideshow's Next and Previous links should be rendered
        playLinkText:              'Play Slideshow',
        pauseLinkText:             'Pause Slideshow',
        prevLinkText:              '&lsaquo; Prev',
        nextLinkText:              'Next &rsaquo;',
        nextPageLinkText:          'Next &rsaquo;',
        prevPageLinkText:          '&lsaquo; Prev',
        enableHistory:             false, // Specifies whether the url's hash and the browser's history cache should update when the current slideshow image changes
        enableKeyboardNavigation:  true, // Specifies whether keyboard navigation is enabled
        autoStart:                 false, // Specifies whether the slideshow should be playing or paused when the page first loads
        syncTransitions:           true, // Specifies whether the out and in transitions occur simultaneously or distinctly
        defaultTransitionDuration: 900, // If using the default transitions, specifies the duration of the transitions
        onSlideChange:             function(prevIndex, nextIndex) {
        	
        	// number of blank thumbs (lis) we added to the end of the list to keep the layout from going awry
        	var numBlankThumbs = 3;
        	
        	console.log(this);
        	
        	// if the next index is one of the blanks, go to the beginning
        	if (nextIndex > (this.data.length - (numBlankThumbs+1) ) ) {
        		nextIndex = 0;
        		prevIndex = this.data.length-1;
        		//this.gotoImage(this.data[0]);
        		this.gotoIndex(0,true,true);
        	}
        	
        	else {
        	
	        	// 'this' refers to the gallery, which is an extension of $("#thumbs")
	        	this.find("ul.thumbs").children()
	        		.eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
	        		.eq(nextIndex).fadeTo('fast', 1.0);
	        }
        },
        /*
        onTransitionOut:           undefined, // accepts a delegate like such: function(slide, caption, isSync, callback) { ... }
        onTransitionIn:            undefined, // accepts a delegate like such: function(slide, caption, isSync) { ... }
        */
        onPageTransitionOut:       function(callback) {
        	this.fadeTo(0, 0.0, callback);
        },
        onPageTransitionIn:        function() {
        	var prevPageLink = this.find("a.prev").css("visibility", "hidden");
        	var nextPageLink = this.find("a.next").css("visibility", "hidden");
        	
        	// show appropriate next/prev page links
        	if (this.displayedPage > 0) prevPageLink.css("visibility", "visible");
        	
        	var lastPage = this.getNumPages() - 1;
        	if (this.displayedPage < lastPage) nextPageLink.css("visibility", "visible");
        	
        	this.fadeTo(200, 1.0);
        },
        onImageAdded:              undefined, // accepts a delegate like such: function(imageData, $li) { ... }
        onImageRemoved:            undefined  // accepts a delegate like such: function(imageData, $li) { ... }
    });

	// event handlers for custom next/prev page links
	gallery.find("a.prev").click(function(e) {
		gallery.previousPage();
		e.preventDefault();
	});
	gallery.find("a.next").click(function(e) {
		gallery.nextPage();
		e.preventDefault();
	});
};