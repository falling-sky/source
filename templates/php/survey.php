<?php

require "common.php";

global $survey_ip;
$survey_ip = 0;
if (isset($mirrorconfig)) {
    if (isset($mirrorconfig["options"])) {
        if (isset($mirrorconfig["options"]["survey_ip"])) {
            $survey_ip = $mirrorconfig["options"]["survey_ip"];
        }
    }
}

make_db_handle();



function get_ua()
{
    global $db;
    $ua = $_SERVER["HTTP_USER_AGENT"];
    
    # Attempt to store, ignore result
    try {
        $query = "INSERT INTO user_agents (user_agent) VALUES (:user_agent)";
        $stmt  = $db->prepare($query);
        $stmt->execute(array(
            ":user_agent" => $ua
        ));
        $affected_rows = $stmt->rowCount();
    }
    catch (PDOException $ex) {
        # Do nothing with it.
    }
    
    # Get the ID
    $query = "SELECT id FROM user_agents WHERE user_agent = :user_agent";
    $stmt  = $db->prepare($query);
    $stmt->execute(array(
        ":user_agent" => $ua
    ));
    $affected_rows = $stmt->rowCount();
    $row           = $stmt->fetch(PDO::FETCH_ASSOC);
    
    return $row["id"];
}


function fetch_time($name)
{
    $t = param_val($name, "/^(ok|bad|slow|timeout|skipped)(,[0-9]+)?\$/");
    if (!isset($t))
        return "-1";
    $a = explode(",", $t);
    return $a[1];
}
function fetch_status($name)
{
    $t = param_val($name, "/^(ok|bad|slow|timeout|skipped)(,[0-9]+)?\$/");
    if (!isset($t))
        return "undef";
    $a = explode(",", $t);
    return $a[0];
}

function fetch_addr($name)
{
    global $survey_ip;
    $t = param_val($name, "/^[a-fA-F0-9:.]*\$/");
    if (!isset($t))
        return "";
    if ($survey_ip)
        return $t;
    return "a29";
    #  return $t;
}

function fake_callback()
{
    # Output this in jsonP compatible format.
    $callback = param_val("callback", "/^[a-zA-Z0-9_]+\$/");
    $json     = '({"dummy":"response"})';
    if ($callback) {
        header("Content-type: application/javascript;charset=ascii");
        echo $callback . ' (' . $json . ');';
    } else {
        header("Content-type: text/plain;charset=ascii");
        echo "callback" . ' (' . $json . ');';
    }
}

function makehash($string)
{
    return hash("md5", $string, false);
}


function store_data()
{
    global $db;
    $cookie = fetch_cookie(); # Validated for certain safety measures.
    $ua_id  = get_ua();
    $tokens = param_val("tokens", "/^[:_a-zA-Z0-9 ,-]+\$/");
    
    
    $query = "
  REPLACE INTO survey (
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
     VALUES (:status_a,
             :status_aaaa,
             :status_ds4,
             :status_ds6,
             :status_ipv4,
             :status_ipv6,
             :status_v6ns,
             :status_v6mtu,
             :status_dsmtu,
             :time_a,
             :time_aaaa,
             :time_ds4,
             :time_ds6,
             :time_ipv4,
             :time_ipv6,
             :time_v6ns,
             :time_v6mtu,
             :time_dsmtu,
             :tokens,
             :ua_id,
             :cookie,
             :ip,
             :ip4,
             :ip6)
";
    
    
    $stmt = $db->prepare($query);
    $stmt->execute(array(
        "status_a" => fetch_status("a"),
        "status_aaaa" => fetch_status("aaaa"),
        "status_ds4" => fetch_status("ds4"),
        "status_ds6" => fetch_status("ds6"),
        "status_ipv4" => fetch_status("ipv4"),
        "status_ipv6" => fetch_status("ipv6"),
        "status_v6ns" => fetch_status("v6ns"),
        "status_v6mtu" => fetch_status("v6mtu"),
        "status_dsmtu" => fetch_status("dsmtu"),
        
        "time_a" => fetch_time("a"),
        "time_aaaa" => fetch_time("aaaa"),
        "time_ds4" => fetch_time("ds4"),
        "time_ds6" => fetch_time("ds6"),
        "time_ipv4" => fetch_time("ipv4"),
        "time_ipv6" => fetch_time("ipv6"),
        "time_v6ns" => fetch_time("v6ns"),
        "time_v6mtu" => fetch_time("v6mtu"),
        "time_dsmtu" => fetch_time("dsmtu"),
        
        "tokens" => $tokens,
        "ua_id" => $ua_id,
        "cookie" => $cookie,
        "ip" => remote_addr(),
        "ip4" => fetch_addr("ip4"),
        "ip6" => fetch_addr("ip6")
    ));
    
#    $e = $stmt->errorInfo();
#    var_dump($e);
#    $affected_rows = $stmt->rowCount();
#    print "rows $affected_rows<br>";
    
}


store_data();
fake_callback();


?>