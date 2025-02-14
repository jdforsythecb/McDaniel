$(document).ready(function() {
	// set the home tab to active
	$("#nav-home").addClass("nav-active");

	// modal dialog settings
	$("#moreInfo").dialog({
		autoOpen: false,
		modal: true,
		title: "MoreInfo",
		width: 700,
		resizeable: false
	});

	// when modal dialog closes
	$("#moreInfo").bind("dialogclose", function(event, ui) {
		$("#moreInfoContent").html("");
	});

	// bind all anchors with "is-modal" class to a click handler
	$("a.is-modal").click(function(event) {
		// prevent from going to the target
		event.preventDefault();

		// open the modal dialog with the proper content
		var data = getMoreInfoData(event.currentTarget.id);

		// only open the dialog if we have data
		if (data.title !== "") setMoreInfo(data.title, data.content);

	});
});

var getMoreInfoData = function(id) {
	var title = "",
		content = "";

	switch(id) {
		case "about-us":
			title = "About McDaniel Envelope";
			content = "McDaniel Envelope was started in 1917 by a Christian family in order to serve the needs of churches just like yours. For over 90 years we have been finding new and better tools for churches to increase stewardship, track attendance, manage finances, and keep up-to-date census data on their members.<br/><br/>Today, the third and fourth generation of this family continue to strive to meet the changing needs of churches in the modern day. From envelopes to calendars, booklets to business envelopes, and now church management software and electronic giving - we try to offer any product that will help Christians better and more efficiently serve our Lord.<br/><br/>In keeping our promise to do all we can to help you and your church, we commit to providing you the best quality offertory products at the best possible price.";
			break;
		case "customization":
			title = "Customization";
			content = "At McDaniel Envelope we manufacture every one of our products in-house. Controlling our manufacturing process allows us to keep costs low, be ever more environmentally-friendly, and to deliver the best quality offertory products on the market.<br/><br/>With our high-quality printing process and in-house graphic design team, we can turn your ideas into reality - from featuring your church logo in vibrant colors to printing a full-color picture of your church on every weekly envelope - you dream it and we can achieve it. Our custom-built software and hardware combinations allows us to achieve the highest quality at the lowest cost, and we pass the savings on to you.<br/><br/>Check out our prices and see the sample designs on this site. There's no more need for the drab, black-and-white envelopes of the past. Engage your members with beautiful, full-color stewardship messages. And ask about our all-in-one church management software, Total Church Solutions, and our online offering system, myEoffering.";
			break;
		default:
	}

	return {
		title: title,
		content: content
	};
};

var setMoreInfo = function(title, content) {
	$("#moreInfoContent").html(content);
	$("#moreInfo").dialog("option", "title", title);
	$("#moreInfo").dialog("open");
	$(".ui-widget-overlay").click(function() {
		$("#moreInfo").dialog("close");
	});
};