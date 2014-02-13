$(document).ready(function() {
	// set the products tab to active
	$("#nav-contact").addClass("nav-active");

	/* jQuery validation plugin */
	$("#contactForm").validate({
		// check each field after focus leaves it (unless it's always been empty)
		onfocusout: function(element) { $(element).valid(); },

		// how to highlight invalid elements
		highlight: function(element, errorClass, validClass) {
			$(element).addClass(errorClass, {duration:600}).removeClass(validClass, {duration:400});
			$(element.form).find("label[for="+element.id+"]").addClass("redText", {duration:400});
		},

		// how to un-highlight newly-valid elements
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass(errorClass, {duration:600}).addClass(validClass, {duration:400});
			$(element.form).find("label[for="+element.id+"]").removeClass("redText", {duration:400});
		},

		// validation rules
		rules: {
			contactChurch: "required",
			contactName: "required",

			// require phone OR email
			contactPhone: {
				require_from_group: [1, ".requirement-group"],
				phoneUS: true
			},
			contactEmail: {
				require_from_group: [1, ".requirement-group"],
				email: true,
			},
			contactAddress: "required",
			contactCity: "required",
			// our custom validation method
			contactState: {
				required: true,
				stateUS: true
			},
			contactZip: {
				required: true,
				zipcodeUS: true
			},
			contactMessage: "required"
		},

		// validation error messages
		messages: {
			contactChurch: "Please specify the name of the church",
			contactName: "Please specify your name",
			contactPhone: {
				require_from_group: "We need your phone number or e-mail to contact you",
				phoneUS: "This is not a valid phone number"
			},
			contactEmail: {
				require_from_group: "We need your e-mail or phone number to contact you",
				email: "Please enter your e-mail in the form name@provider.com"
			},
			contactAddress: "Please specify the address of the church",
			contactCity: "Please specify a valid two-letter state abbreviation",
			contactZip: {
				required: "Please specify a valid zip code for the church",
				zipcodeUS: "This is not a valid US zip code"
			},
			contactMessage: "Please type a message to us"
		},

		// where to inject the error message elements
		errorPlacement: function(error, element) {
			error.insertAfter(element);
		},

		/* options for the jQuery Form plugin */
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				url: "/actions/contactSend.php",
				type: "post",

				// do this (synchronously) before submitting the form
				beforeSubmit: function(formData, jqForm, options) {
					// start spinner
					$("body").addClass("ajax-loading");
				},

				// do this after the form submit gets a response
				success: function(responseText, statusText, xhr, $form) {
					// stop spinner
					$("body").removeClass("ajax-loading");
					// handle the received data
					alert(responseText);
				}
			});
		}

	});

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