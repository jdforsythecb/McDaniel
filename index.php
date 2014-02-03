<?php

// load a view
function load_view($file) {
	// first we load the first part of the html, template-top.html
	include('/template-top.html');
	
	// now load the proper page into the div#content
	include($file);
	
	// and load the end of the html, template-bottom.html
	include('/template-bottom.html');
}

// load the proper view
function open_page($page) {
	// see if the page passed to index.php is a valid page we've made
	// if not, we will default to home
	if (!isset($page)) { $page = ""; }
	
	switch(strtolower($page)) {
		case "products":
			load_view("/views/products.html");
			break;
		case "file":
			load_view("/views/file.html");
			break;
		case "quote":
			load_view("/views/quote.html");
			break;
		case "renew":
			load_view("/views/renew.html");
			break;
		case "contact":
			load_view("/views/contact.html");
			break;
			
		// whether it's home or the page is not valid, default to home
		default:
			load_view("/views/home.html");
			break;
	}
}


// get the page that has (maybe) been set from $_GET and load it
if (isset($_GET) && (count($_GET) == 1)) {
	// get the key of the first (and should be only) GET parameter
	// this allows us to just pass, e.g. ?home and not have to do a ?page=home
	$page = key($_GET);
}

else {
	$page = '';
}

// now load...
open_page($page);


























