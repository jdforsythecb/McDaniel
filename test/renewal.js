quoteObj = {};
// stores a counter telling us which product # we're currently adding to the "cart"
quoteObj.currentProduct = 0;

// holds our bread-crumb states
quoteObj.breadCrumbs = ["form-part-one"];


/*
 * GLOBAL HELPER FUNCTIONS
 */

/* getNextFormPart()
 * takes an element and finds the "data-next" attribute value which should contain the id of the next form part to show
 *   based on the selections
 * 
 * returns false if the element doesn't have the data-next or if it's empty (which in some DOM implementations
 * 	 means it doesn't exist)
 * 
 * note: where exactly the data-next is stored is dependent on each form part
 *   for instance, on the product selection form part one, the next form can change so it's set on each
 *   selectable radio button, but if loose is chosen and you move to form part two, there is only one
 *   path to move, so the data-next might be stored in the div. the formPartNumContinue() functions will
 *   have to know which element to grab the data from
 */
var getNextFormPart = function($elmt) {
	nxt = $elmt.data("next");
	
	// if this $elmt doesn't have the data-next attribute, or its empty return false
	if ((typeof nxt === 'undefined') || (nxt === "")) return false;
	
	// otherwise return the value of the data
	return nxt;
};


/* displayNextFormPart()
 * takes in the return value from getNextFormPart()
 * hides the current form (preserving its values)
 * shows the next form part
 */
var displayNextFormPart = function(nextFormPartData) {
	// make sure we actually got the next form part id
	if (!nextFormPartData) return false;
	
	$hideElmt = $("#" + quoteObj.breadCrumbs[quoteObj.breadCrumbs.length-1]);
	$showElmt = $("#" + nextFormPartData);
	
	// hide the current form part (remove the form-visible class and add the form-hidden class)
	$hideElmt.removeClass("form-visible");
	$hideElmt.addClass("form-hidden");
	
	// show the next form part (remove the form-hidden class and add the form-visible class)
	$showElmt.removeClass("form-hidden");
	$showElmt.addClass("form-visible");
	
	// update the bread crumbs
	quoteObj.breadCrumbs.push(nextFormPartData);
	
	return true;
};

/* displayPreviousFormPart()
 * 
 */
var displayPreviousFormPart = function() {
	// current bread crumb index
	var curr = quoteObj.breadCrumbs.length - 1;
	
	// if there is no previous form part (we're on the first form) there shouldn't be a button to do this
	// but return false to be sure
	if (curr < 1) return false;
		
	$hideElmt = $("#" + quoteObj.breadCrumbs[curr]);
	$showElmt = $("#" + quoteObj.breadCrumbs[curr-1]);
	
	// hide the current form part
	$hideElmt.removeClass("form-visible");
	$hideElmt.addClass("form-hidden");
	
	// show the previous form part
	$showElmt.removeClass("form-hidden");
	$showElmt.addClass("form-visible");
	
	// update the bread crumbs (remove the current, leaving the previous as the new current)
	quoteObj.breadCrumbs.pop();
};



/* validateRadioGroup()
 * 
 * checks a group of radio inputs to validate that one of them is selected
 * 
 * returns false if no radio is selected
 * 
 * returns the $element that is selected if there is one
 * 
 */
var validateRadioGroup = function(radiosName) {
	// if a radio of this group is checked, return it
	var $radio = $("input[type=radio][name=" + radiosName + "]:checked"); 

	if ($radio.length) {
		return $radio;
	}
	return false;
};


/* displayValidationError()
 * 
 * displays validation error information
 * 
 * takes an element type, an id, and an error object
 * 
 * error = {type: warning/error, msg:string}
 * 
 */
var displayValidationError = function(elmtType, id, errObj) {
	switch(elmtType) {
		case "ul":
		default:
			console.log(errObj.type + ": " + errObj.msg);
			break;
	}
	
};



/* displayAppError()
 * 
 * used for displaying errors with the app, separate from form validation errors
 */
var displayAppError = function(errObj) {
	console.log(errObj.type + " : " + errObj.msg);
};


/************************************************************************************************
 * ON DOCUMENT READY 
 ************************************************************************************************/
$(document).ready(function() {
	
	// as soon as the document is ready, we want to start attaching our event handlers to the form input
	// fields, so we can perform on-the-fly validation
	
	/* LOOSE ENVELOPES */
	
	// LOOSE STOCK
	$("looseStockQty").blur(function(event) {
		
	});
	
});






/************************************************************************************************
 * FORM PART ONE (PRODUCT CHOICE)
 ************************************************************************************************/
var formPartOneContinue = function() {
	// first check native form validation, if supported by the browser
	//console.log($("input[type=radio][name=productType]:first")[0].checkValidity());
	
	// make sure one of the radios (product types) is selected
	var $productType = validateRadioGroup("productType");
	
	// if we didn't get anything back, show validation error
	if (!$productType || !$productType.length) {
		displayValidationError("ul", "form-part-one-products", {type:'error', msg:'Please pick a product type to continue...'});
	}
	
	else {
		// we have no further validation for this form part because it's just radios so we can safely
		// collapse this form part and display the next one
		// if it fails, throw an error
		if (!displayNextFormPart(getNextFormPart($productType)))
			displayAppError({type:'error', msg:'Failed to load the next part of the form'});
	}
		
};




/************************************************************************************************
 * PRODUCT: LOOSE
 ************************************************************************************************/
var formPartTwoLooseContinue = function() {
	// make sure one of the radios (stock/custom) is selected
	var $stockType = validateRadioGroup("looseStock");
	
	// if we didn't get anything back, show validation error
	if (!$stockType || !$stockType.length) {
		displayValidationError("ul", "form-part-two-loose-stock", {type:'error', msg:'Please pick a stock image or choose custom for a different design...'});
	}
	
	else {
		// we have no further validation for this form part because it's just radios, so we can safely
		// collapse this form and display the next one
		
		// if we chose one of the stock designs, add a class to the form-part-three-loose-stock-image div equal to the
		// value of the stock image radio button (this is used in the css to specify the background image for that envelope)
		if (!($stockType.val() === "stockCustom"))
			$("#form-part-three-loose-stock-image").addClass($stockType.val());
			
		// the custom image should already be set to something generic (i.e. "CUSTOM DESIGN HERE") so no need to do that
		
		// regardless of the choice (stock or custom) we will still use the data-next attribute to display the next form part
		// if it fails, throw an error
		if (!displayNextFormPart(getNextFormPart($stockType)))
			displayAppError({type:'error', msg:'Failed to load the next part of the form'});
	}
};


	/* LOOSE STOCK SETS */
	var formPartThreeLooseStockContinue = function() {
		// validation - need to make sure there is a positive number in the quantity text field
		var $quantity = $("#looseStockQty");
		if (isNaN($quantity.val()) || !($quantity.val() > 0)) {
			displayValidationError("text", "form-part-three-loose-stock", {type:'error', msg:'Please enter a valid quantity'});
		}
		else {
			// show the contact information form part
			if(!displayNextFormPart(getNextFormPart($quantity)))
				displayAppError({type:'error', msg:'Failed to load the next part of the form'});
		}
		
	};





/************************************************************************************************
 * PRODUCT: BOXED SETS
 ************************************************************************************************/







/************************************************************************************************
 * PRODUCT: MAILED
 ************************************************************************************************/






/************************************************************************************************
 * PRODUCT: BOOKLETS
 ************************************************************************************************/
