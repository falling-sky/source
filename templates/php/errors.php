<?php

require "common.php";


function store_data() {
 global $privateconfig;
 if (isset( $privateconfig["paths"]["errorlog"] )) {
   $path = $privateconfig["paths"]["errorlog"];
   $handle = fopen($path,"a");
   
   $date = date(DATE_RFC2822);
   $a = array("date"=>$date, 
   "HTTP_REFERER" => $_SERVER["HTTP_REFERER"],
   "HTTP_ACCEPT_LANGUAGE"  => $_SERVER["HTTP_ACCEPT_LANGUAGE"],
   "HTTP_USER_AGENT" => $_SERVER["HTTP_USER_AGENT"],
   "HTTP_ACCEPT_ENCODING" => $_SERVER["HTTP_ACCEPT_ENCODING"],
   "REMOTE_ADDR" => $_SERVER["REMOTE_ADDR"],
   "_REQUEST" => $_REQUEST);
   $buffer = yaml_emit($a,YAML_UTF8_ENCODING);
   fwrite($handle, $buffer);
   fclose($handle);
 }
}


function fake_callback() {
# Output this in jsonP compatible format.
  $callback = param_val("callback", "/^[a-zA-Z0-9_]+\$/");
  $json = '({"dummy":"response"})';
  if ($callback) {
    header("Content-type: application/javascript;charset=ascii");  
    echo $callback . ' (' . $json . ');';  
  } else {
    header("Content-type: text/plain;charset=ascii");
    echo "callback" . ' (' . $json . ');';    
  }
}


store_data();
fake_callback();


?>