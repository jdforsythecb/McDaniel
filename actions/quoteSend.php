<?php
//var_dump($_POST);
sleep(1); // pretend to be a post request taking time
echo "JSON: " . json_encode($_POST, JSON_FORCE_OBJECT); // raw dump

?>