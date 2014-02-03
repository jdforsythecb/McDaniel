quoteObj = {};
quoteObj.currentProduct = 0; // stores a counter telling us which product # we're currently adding to the "cart"
quoteObj.currentFormPart = "form-part-one"; // default the first form part, stores the div id of the current form part we're viewing

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
function getNextFormPart(elmt) {
	if(!elmt.hasAttribute("data-next")) return false;
	else {
		nxt = elmt.getAttribute("data-next");
		if (nxt==="") return false;
		else return nxt;
	}
}


/* displayNextFormPart()
 * takes in the return value from getNextFormPart()
 * hides the current form (preserving its values)
 * shows the next form part
 */
function displayNextFormPart(nextFormPartData) {
	hideElmt = document.getElementById(quoteObj.currentFormPart);
	showElmt = document.getElementById(nextFormPartData);
	
	// hide the current form part (remove the form-visible class and add the form-hidden class)
	removeClass("form-visible", hideElmt);
	addClass("form-hidden", hideElmt);
	
	// show the next form part (remove the form-hidden class and add the form-visible class)
	removeClass("form-hidden", showElmt);
	addClass("form-visible", showElmt);
	
	// update the currently visible form part
	quoteObj.currentFormPart = nextFormPartData;
}


/* removeClass()
 * 
 * removes the specified class name from the specified element's classList
 * 
 * uses the .classList method if available (as usual, in almost every browser now except IE<9.0 - http://caniuse.com/classlist)
 * 
 * otherwise uses regex to remove it from the .className string
 */
function removeClass(className, elmt) {
	// does the browser's javascript implementation support the Element.classList specification and its methods?
	if (document.documentElement.classList) {
		elmt.classList.remove(className);
	}
	
	// classList methods are not supported, so use regex
	else {
		// if the element doesn't exist or doesn't have a class, do nothing
		if (!elmt || !elmt.className) return false;
		else {
			// remove the className from the class list for the element
			var regex = new RegExp("(^|\\s)" + className + "(\\s|$)", "g");
			elmt.className = elmt.className.replace(regex, "$2");
		}		
	}
}

/* addClass()
 * 
 * adds the specified class to the specified element
 * 
 * uses the .classList method if available
 * 
 * otherwise jsut appends to the .className string
 */
function addClass(className, elmt) {
	// does the browser's javascript implementation support the Element.classList specification and its methods?
	if (document.documentElement.classList) {
		elmt.classList.add(className);
	}
	// otherwise just append to the string
	else {
		elmt.className += " " + className;
	}
}



/* validateRadioGroup()
 * 
 * checks a group of radio inputs to validate that one of them is selected
 * 
 * returns false if no radio is selected
 * 
 * returns the element that is selected if there is one
 * 
 */
function validateRadioGroup(radiosName) {
	var radios = document.getElementsByName(radiosName);
	// cache length of array
	var i = radios.length;
	// loops until i=0 (because if(0) returns false)
	for (i;i;i--) { 
		if (radios[i-1].checked) return radios[i-1];
	}
	// if we haven't returned, then none of the radios are selected
	return false;
}


/* displayValidationError()
 * 
 * displays validation error information
 * 
 * takes an element type, an id, and an error object
 * 
 * error = {type: warning/error, msg:string}
 * 
 */
function displayValidationError(elmtType, id, errObj) {
	switch(elmtType) {
		case "ul":
		default:
			console.log(errObj.type + ": " + errObj.msg);
			break;
	}
	
}


/************************************************************************************************
 * FORM PART ONE (PRODUCT CHOICE)
 ************************************************************************************************/
function formPartOneContinue() {
	// make sure one of the radios (product types) is selected
	var productType = validateRadioGroup("productType");
	
	if (productType === false) {
		displayValidationError("ul", "form-part-one-products", {type:'error', msg:'Please pick a product type to continue...'});
	}
	
	else {
		// we have no further validation for this form part because it's just radios so we can safely
		// collapse this form part and display the next one
		displayNextFormPart(getNextFormPart(productType));
	}	
}




/************************************************************************************************
 * PRODUCT: LOOSE
 ************************************************************************************************/
function formPartTwoLooseContinue() {
	// make sure one of the radios (stock/custom) is selected
	var stockType = validateRadioGroup("looseStock");
	
	if (stockType === false) {
		displayValidationError("ul", "form-part-two-loose-stock", {type:'error', msg:'Please pick a stock image or choose custom for a different design...'});
	}
	
	else {
		// we have no further validation for this form part because it's just radios, so we can safely
		// collapse this form and display the next one
		
		// if we chose one of the stock designs, add a class to the form-part-three-loose-stock-image div equal to the
		// value of the stock image radio button (this is used in the css to specify the background image for that envelope)
		if (!(stockType.value === "stockCustom")) {
			addClass(stockType.value, document.getElementById("form-part-three-loose-stock-image"));
		}
		// the custom image should already be set to something generic (i.e. "CUSTOM DESIGN HERE") so no need to do that
		
		// regardless of the choice (stock or custom) we will still use the data-next attribute to display the next form part
		displayNextFormPart(getNextFormPart(stockType));
	}
}





/************************************************************************************************
 * PRODUCT: BOXED SETS
 ************************************************************************************************/







/************************************************************************************************
 * PRODUCT: MAILED
 ************************************************************************************************/






/************************************************************************************************
 * PRODUCT: BOOKLETS
 ************************************************************************************************/
