<?php

require "common5.php";


global $survey_ip;
$survey_ip=0;
if (isset($mirrorconfig)) {
 if (isset($mirrorconfig["options"])) {
   if (isset($mirrorconfig["options"]["survey_ip"])) {
     $survey_ip = $mirrorconfig["options"]["survey_ip"];
   }
 }
}

make_db_handle();



function get_ua() {
  global $dbhandle;
  $ua = $_SERVER["HTTP_USER_AGENT"];
  $sql = sprintf("INSERT INTO user_agents (user_agent) VALUES ('%s')",mysql_real_escape_string($ua,$dbhandle));
  $result = mysql_query($sql,$dbhandle);  
  # Ignore result.  We expect dupes often.

  # Get the ID  
  $sql = sprintf("SELECT id FROM user_agents WHERE user_agent = '%s'",mysql_real_escape_string($ua,$dbhandle));
  $result = mysql_query($sql,$dbhandle);  
  // Check result
  // This shows the actual query sent to MySQL, and the error. Useful for debugging.
  if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $sql;
    die($message);
  }    
  
  $row = mysql_fetch_assoc($result);
  return $row["id"];
}


function fetch_time ($name) {
  $t = param_val($name,"/^(ok|bad|slow|timeout)(,[0-9]+)?\$/");   
  if (!isset($t)) return "-1";
  $a = explode(",",$t);
  return $a[1];
}
function fetch_status ($name) {
  $t = param_val($name,"/^(ok|bad|slow|timeout)(,[0-9]+)?\$/");   
  if (!isset($t)) return "undef";
  $a = explode(",",$t);
  return $a[0];
}

function fetch_addr ($name) {
  global $survey_ip;
  $t = param_val($name,"/^[a-fA-F0-9:.]*\$/");
  if (!isset($t)) return "";
  if ($survey_ip) return $t;
  return "a29";
#  return $t;
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

function makehash ($string) {
   return hash("md5",$string,false);
}


function store_data() {
  $cookie = fetch_cookie();  # Validated for certain safety measures.
  $ua_id = get_ua();
  $tokens = param_val("tokens","/^[:_a-zA-Z0-9 ,-]+\$/");
 

  global $dbhandle;
  
  $sql = sprintf("REPLACE INTO survey (
      status_a, 
      status_aaaa,
      status_ds4,
      status_ds6,
      status_ipv4,
      status_ipv6,
      status_v6ns,
      status_v6mtu,
      status_dsmtu,
      
      time_a,
      time_aaaa,
      time_ds4,
      time_ds6,
      time_ipv4,
      time_ipv6,
      time_v6ns,
      time_v6mtu,
      time_dsmtu,
      
      tokens,
      ua_id,
      
      cookie, ip, ip4, ip6
      
      )
     VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s',
             '%s','%s','%s','%s','%s','%s','%s','%s','%s',
             '%s','%s',
             '%s','%s','%s','%s')",
 
      
      mysql_real_escape_string(fetch_status("a"),$dbhandle),
      mysql_real_escape_string(fetch_status("aaaa"),$dbhandle),
      mysql_real_escape_string(fetch_status("ds4"),$dbhandle),
      mysql_real_escape_string(fetch_status("ds6"),$dbhandle),
      mysql_real_escape_string(fetch_status("ipv4"),$dbhandle),
      mysql_real_escape_string(fetch_status("ipv6"),$dbhandle),
      mysql_real_escape_string(fetch_status("v6ns"),$dbhandle),
      mysql_real_escape_string(fetch_status("v6mtu"),$dbhandle),
      mysql_real_escape_string(fetch_status("dsmtu"),$dbhandle),

      mysql_real_escape_string(fetch_time("a"),$dbhandle),
      mysql_real_escape_string(fetch_time("aaaa"),$dbhandle),
      mysql_real_escape_string(fetch_time("ds4"),$dbhandle),
      mysql_real_escape_string(fetch_time("ds6"),$dbhandle),
      mysql_real_escape_string(fetch_time("ipv4"),$dbhandle),
      mysql_real_escape_string(fetch_time("ipv6"),$dbhandle),
      mysql_real_escape_string(fetch_time("v6ns"),$dbhandle),
      mysql_real_escape_string(fetch_time("v6mtu"),$dbhandle),
      mysql_real_escape_string(fetch_time("dsmtu"),$dbhandle),
      
      mysql_real_escape_string($tokens,$dbhandle),
      mysql_real_escape_string($ua_id,$dbhandle),


      mysql_real_escape_string($cookie,$dbhandle),
      mysql_real_escape_string(remote_addr(),$dbhandle),
      mysql_real_escape_string(fetch_addr("ip4"),$dbhandle),
      mysql_real_escape_string(fetch_addr("ip6"),$dbhandle)


    


        );
#        print $sql;
  $result = mysql_query($sql,$dbhandle);  
  if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $sql;
    die($message);
  }  
#  header("HTTP/1.0 204 No Content");
}


store_data();
fake_callback();


?>