<?php

$mailto = 'sales@mcdaniel.com';
// make email from us (we'll set reply-to to the customer)
$fromemail = $mailto;

$http_referrer = getenv( "HTTP_REFERER" );

$headersep = "\r\n";
$content_type = 'Content-Type: text/plain; charset="utf-8"';

$subject = "McDaniel Quote Request";



// the data passed from the form
$productType = (!isset($_POST['productType'])) ? "" : $_POST['productType'];

// loose inputs
$looseStock = (!isset($_POST['looseStock'])) ? "" : $_POST['looseStock'];
$looseStockQty = (!isset($_POST['looseStockQty'])) ? "" : $_POST['looseStockQty'];

// boxed sets inputs
$boxedQty = (!isset($_POST['boxedQty'])) ? "" : $_POST['boxedQty'];
$boxedInk = (!isset($_POST['boxedInk'])) ? "" : $_POST['boxedInk'];
$boxedColor = (!isset($_POST['boxedColor'])) ? "" : $_POST['boxedColor'];
$boxedShipping = (!isset($_POST['boxedShipping'])) ? "" : $_POST['boxedShipping'];


// mailed inputs
$mailedQty = (!isset($_POST['mailedQty'])) ? "" : $_POST['mailedQty'];
$mailedInk = (!isset($_POST['mailedInk'])) ? "" : $_POST['mailedInk'];
$mailedColor = (!isset($_POST['mailedColor'])) ? "" : $_POST['mailedColor'];
$mailedFrequency = (!isset($_POST['mailedFrequency'])) ? "" : $_POST['mailedFrequency'];


// booklet inputs
$bookletQty = (!isset($_POST['bookletQty'])) ? "" : $_POST['bookletQty'];
$bookletInk = (!isset($_POST['bookletInk'])) ? "" : $_POST['bookletInk'];
$bookletShipping = (!isset($_POST['bookletShipping'])) ? "" : $_POST['bookletShipping'];
$bookletFrequency = (!isset($_POST['bookletFrequency'])) ? "" : $_POST['bookletFrequency'];




// contact info
$contactChurch = (!isset($_POST['contactChurch'])) ? "" : $_POST['contactChurch'];
$contactName = (!isset($_POST['contactName'])) ? "" : $_POST['contactName'];
$contactPhone = (!isset($_POST['contactPhone'])) ? "" : $_POST['contactPhone'];
$contactFax = (!isset($_POST['contactFax'])) ? "" : $_POST['contactFax'];
$contactEmail = (!isset($_POST['contactEmail'])) ? "" : $_POST['contactEmail'];
$contactAddress = (!isset($_POST['contactAddress'])) ? "" : $_POST['contactAddress'];
$contactCity = (!isset($_POST['contactCity'])) ? "" : $_POST['contactCity'];
$contactState = (!isset($_POST['contactState'])) ? "" : $_POST['contactState'];
$contactZip = (!isset($_POST['contactZip'])) ? "" : $_POST['contactZip'];
$contactNotes = (!isset($_POST['contactNotes'])) ? "" : $_POST['contactNotes'];

if (function_exists( 'get_magic_quotes_gpc' ) && get_magic_quotes_gpc()) {$notes = stripslashes( $notes );}



// build the email body
$msg = "Quote Request Sent: ";
date_default_timezone_set("America/New_York");
$msg .= date("F j, Y, g:i a") . "\n\n";

$msg .= "Product Type: ";

switch($productType) {
	case "loose":
		$msg .= "LOOSE DOLLAR ENVELOPES\n\n"
			  . "Stock: " . $looseStock . "\n\n"
			  . "Quantity: " . $looseStockQty;
		break;
		
	case "boxed":
		$msg .= "DOLLAR BOXED SETS\n\n"
			  . "Quantity: " . $boxedQty . "\n\n"
		      . "Ink: " . $boxedInk . "\n\n"
		      . "Border/Background: " . $boxedColor . "\n\n"
		      . "Ship to: " . $boxedShipping;
		break;
		
	case "mailed":
		$msg .= "DOLLAR MAILED TO MEMBERS\n\n"
			  . "Quantity: " . $mailedQty . "\n\n"
		      . "Ink: " . $mailedInk . "\n\n"
		      . "Border/Background: " . $mailedColor . "\n\n"
		      . "Frequency: " . $mailedFrequency;
		break;
		
	case "booklet":
		$msg .= "BOOKLETS\n\n"
			  . "Quantity: " . $bookletQty . "\n\n"
		      . "Ink: " . $bookletInk . "\n\n"
		      . "Ship to: " . $bookletShipping . "\n\n"
		      . "Frequency: " . $bookletFrequency;
}

$msg .= "\n\n\n\n";
$msg .= "Contact Information:\n\n";
$msg .= "Church: " . $contactChurch . "\n" .
				  "Address: " . $contactAddress . "\n" .
				  "City: " . $contactCity . "\n" .
				  "State: " . $contactState . "\n" .
				  "Zip: " . $contactZip . "\n\n" .
				  "Contact: " . $contactName . "\n" .
				  "Email: " . $contactEmail . "\n" .
				  "Phone: " . $contactPhone . "\n" .
				  "Fax: " . $contactFax . "\n\n\n" .
				  "Notes: " . $contactNotes;


$headers = "From: \"$contactName\" <$fromemail>" . $headersep . "Reply-To: \"$contactName\" <$contactEmail>" . $headersep . "X-Mailer: chfeedback.php 2.15.0" .$headersep . 'MIME-Version: 1.0' . $headersep . $content_type;

$success = @mail($mailto, $subject, $msg, $headers);

if ($success) {
	echo "success";
}
else {
	echo "failure";
}