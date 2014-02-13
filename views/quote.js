// this is where we do the form wizardry and validation
$(document).ready(function() {

	// set the active header>ul>li class to .nav-active
	$("#nav-quote").addClass("nav-active");

	$("#quoteForm").wizard({
		/* the options for the jQuery Wizard plugin ************************************************************************/

		// animations for the jQuery wizard
		animations: {
			show: {
				options: {
					duration: 300,
					easing: "swing"
				},
				properties: {
					opacity: "show"
				}
			},
			hide: {
				options: {
					duration: 0,
					easing: "swing"
				},
				properties: {
					opacity: "hide"
				}
			}
		},


		// class of the submit step
		submit: ".submit",

		// custom transitions (validations) before leaving step
		transitions: {		
			productType: function($step, action) {
				// since we have disabled tab-navigation through the radios we need to implement
				// custom validation and error handling for this step
				
				// get the checked radio, if any
				var branch = $step.find("[name=productType]:checked").val();

				// if there's no checked radio...
				if(!branch) {
					// add an error class span
					$('<span class="error">Please pick a product type for your quote</span>').insertAfter($step.find(".radio-images"));

					// attach event listeners to all the radios so that when one is clicked, it removes the error span
					$step.find("[name=productType]").bind("click", function() {
						// when a product type is clicked, remove the error span
						$step.find(".radio-images + span.error").remove();

						// and unbind the event listeners
						$step.find("[name=productType]").unbind("click");
					});
				}

				// if there is a checked radio...
				else {
					// remove the error span to remove the error on back button
					var err = $step.find(".radio-images + span.error");
					if (!!err) err.remove();
				}

				// return the radio value (next branch) or 'undefined' (don't move forward)
				return branch;
			},

			looseStock: function($step, action) {
				// since we have disabled the tab-navigation for the radios we must implement
				// custom validation and error-handling


				// check that a stock image radio is selected
				var check = $step.find("[name=looseStock]:checked").val();
				if(!check) {
					// add an error class span
					$('<span class="error">Please pick a product type for your quote</span>').insertAfter($step.find(".radio-images"));

					// attach event listeners to all the radios so that when one is clicked, it removes the error span
					$step.find("[name=looseStock]").bind("click", function() {
						// when a product type is clicked, remove the error span
						$step.find(".radio-images + span.error").remove();

						// and unbind the event listeners
						$step.find("[name=looseStock]").unbind("click");
					});
					
					return false;
				}
				else {
					// remove the error span to remove the error on back button
					var err = $step.find(".radio-images + span.error");
					if (!!err) err.remove();

					// use the validation plugin to see if the quantity is valid, if not prevent continuing
					check = $step.find("[name=looseStockQty]").valid();

					if(!check) {
						// the number box will have it's own validation message
						return false;
					}

					else {
						// everything is good 
						// the id of the next (and final) step
						return "contact";
					}
				}
				
			}
		},




	/* the options for the jQuery Validate plugin ************************************************************************/
	}).validate({
		/* check each field after focus leaves it (unless it's always been empty)
		 *
		 * this is good enough because every step has its own validation until the final submit (contact info) step
		 * where the form will be validated prior to being able to submit
		 */
		onfocusout: function(element) { $(element).valid(); },

		// how to highlight invalid elements
		highlight: function(element, errorClass, validClass) {
			$(element).addClass(errorClass, {duration:400}).removeClass(validClass, {duration:400});
			$(element.form).find("label[for="+element.id+"]").addClass("redText", {duration:400});
		},

		// how to un-highlight newly-valid elements
		unhighlight: function(element, errorClass, validClass) {
			$(element).removeClass(errorClass, {duration:400}).addClass(validClass, {duration:400});
			$(element.form).find("label[for="+element.id+"]").removeClass("redText", {duration:400});
		},


		// validation rules
		rules: {
			productType: "required",
			contactChurch: "required",
			contactName: "required",
			contactPhone: {
				required: true,
				phoneUS: true
			},
			contactFax: {
				required: false,
				phoneUS: true
			},
			contactEmail: {
				required: true,
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
			}
		},

		// validation error messages
		messages: {
			contactChurch: "Please specify the name of the church",
			contactName: "Please specify your name",
			contactPhone: {
				required: "We need your phone number to contact you",
				phoneUS: "This is not a valid phone number"
			},
			contactFax: {
				phoneUS: "This is not a valid fax number"
			},
			contactEmail: {
				required: "We need your e-mail address to contact you",
				email: "Please enter your e-mail in the form name@provider.com"
			},
			contactAddress: "Please specify the address of the church",
			contactCity: "Please specify the city the church is located in",
			contactState: "Please specify a valid two-letter state abbreviation",
			contactZip: {
				required: "Please specify a valid zip code for the church",
				zipcodeUS: "This is not a valid US zip code."
			}
		},

		// where to inject the error message elements (insert after the invalid input elements)
		errorPlacement: function(error, element) {
			error.insertAfter(element);
		},




		/* the options for the jQuery Form plugin ************************************************************************/
		// what to do when form is valid for submission
		submitHandler: function(form) {
			$(form).ajaxSubmit({
				// target: target element to be updated with server response,
				// beforeSubmit: pre-submit callback
				// success: post-submit callback
				// url: override form's action attribute
				// type: override form's method attribute
				// dataType: 'xml', 'script', or 'json' (expected server response type)
				// clearForm: bool (clear all form fields after successful submit)
				// resetForm: bool (reset the form after successful submit)
				url: "/actions/quoteSend.php",
				type: "post",

				// $.ajax options can be used here, too, e.g.
				// timeout: 3000

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

					// should check for status and maybe resubmit on error?

				}
			});
		}
	});

});