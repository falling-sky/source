<?php


global $raw_cookie;
global $raw_query;
global $mirrorconfig;
global $privateconfig;
global $debug_common;
global $dbhandle;

#parse_str(preg_replace("/; */","&",$_SERVER["HTTP_COOKIE"]),$raw_cookie);
parse_str($_SERVER["QUERY_STRING"], $raw_query);

## Only uncomment if debugging. Has a demonstrated
## XSS and injection issue.  Thanks to Arbor for
## demonstrating (privately) this issue.
# if ($_SERVER["PHP_SELF"] == "/common.php") {
#  $debug_common = 1;
#  print "<pre><code>";
#  print htmlspecialchars(var_export($_SERVER));
#  print "</code></pre>";
# }

if (get_magic_quotes_gpc()) {
    function stripslashes_gpc(&$value)
    {
        $value = stripslashes($value);
    }
    array_walk_recursive($_GET, 'stripslashes_gpc');
    array_walk_recursive($_POST, 'stripslashes_gpc');
    array_walk_recursive($_COOKIE, 'stripslashes_gpc');
    array_walk_recursive($_REQUEST, 'stripslashes_gpc');
}

function param_val($name, $regex)
{
    global $raw_query;
    if (!isset($raw_query[$name])) {
        return;
    }
    $val = $raw_query[$name];
    if (preg_match($regex, $val)) {
        return $val;
    } else {
        header("HTTP/1.1 500 Internal server error");
        print "Invalid CGI parameter: $name (expected regex $regex, received value " . htmlentities($val) . ")";
        exit(1);
    }
}
;


function fetch_cookie()
{
    global $raw_cookie;
    
    # Too many mirrors are in the EU.
    # cookies are being disabled.
    # we're putting in placeholders
    # so that the stats scripts keep working
    # (although the stats meanings change
    # slightly, since a single person
    # hitting the site repeatedly will
    # skew the data).
    
    return "a29-placeholder-" . hash("md5", rand(), false);
    
    ####  if (isset($raw_cookie["Apache"])) {
    ####    $c = $raw_cookie["Apache"];
    ####    if (preg_match("/^[a-zA-Z0-9_:.-]+\$/",$c)) {
    ####       return $c;
    ####    } else {
    ####    header("HTTP/1.1 500 Internal server error");
    ####       print "Invalid Apache cookie: ";
    ####       print htmlentities($c);
    ####       exit(1);
    ####    }
    ####  } else {
    ####     return "no-cookie";
    #####    header("HTTP/1.1 500 Internal server error");
    #####    print "Missing Apache cookie";
    #####    exit(1);
    ####  }
}


function remote_addr()
{
    $ip = $_SERVER["REMOTE_ADDR"];
    if (preg_match("/^[a-fA-F0-9:.]+\$/", $ip)) {
        return $ip;
    } else {
        header("HTTP/1.1 500 Internal server error");
        print "REMOTE_ADDR looks suspicious";
        exit(1);
    }
}


function dumpit($v)
{
    global $debug_common;
    if ($debug_common) {
        print "<pre><code>";
        print htmlentities(var_export($v));
        print "<code></pre>";
    }
    
}


function prepareJSON($input, $replace)
{
    
    //This will convert ASCII/ISO-8859-1 to UTF-8.
    //Be careful with the third parameter (encoding detect list), because
    //if set wrong, some input encodings will get garbled (including UTF-8!)
    
    // Make sure your mbencode PHP module is loaded
    // if you're going to use UTF8 characters in the 
    // config files.
    
    try {
        $input = mb_convert_encoding($input, 'UTF-8', 'ASCII,UTF-8,ISO-8859-1');
    }
    catch (Exception $e) {
        $noop = 1;
    }
    
    //Remove UTF-8 BOM if present, json_decode() does not like it.
    if (substr($input, 0, 3) == pack("CCC", 0xEF, 0xBB, 0xBF))
        $input = substr($input, 3);
    
    
    // Remove the variable declaration at the start
    if ($replace) {
        $input = preg_replace($replace, "", $input);
    }
    
    // search and remove comments like /* */ and // 
    $input = preg_replace("#(/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+/)|([\s\t](//).*)#", '', $input);
    
    // Remove trailing commas
    $input = preg_replace('/,\s*([\]}])/m', '$1', $input);
    
    return $input;
}

function decodeJSON($input, $replace)
{
    $ret = json_decode(prepareJSON($input, $replace), 1);
    return $ret;
}

function find_config($a, $replace)
{
    // Given a list of possible locations, find and parse the config file.
    global $debug_common;
    foreach ($a as $filename) {
        if (file_exists($filename)) {
            if ($debug_common) {
                print "Found $filename, parsing..<br>\n";
            }
            $js = file_get_contents($filename);
            if ($js) {
                $ret = decodeJSON($js, $replace);
                if ($ret)
                    return $ret;
                print "could not parse $filename";
                exit(1);
            }
        }
    }
    print "Could not find (or possibly open due to safe mode) any of: ";
    foreach ($a as $filename) {
        print "$filename ";
    }
    exit(1);
}

function private_config()
{
    return find_config(array(
        "site/private.js",
        "private.js"
    ), '#PrivateConfig\s+=\s+#ms');
}

function site_config()
{
    return find_config(array(
        "site/config.js",
        "config.js"
    ), '#MirrorConfig\s+=\s+#ms');
}


function make_db_handle()
{
    global $privateconfig;
    global $db;
    if (!$db) {
        $dsn = sprintf("mysql:host=%s;dbname=%s;charset=utf8", $privateconfig["db"]["host"], $privateconfig["db"]["db"]);
        $db  = new PDO($dsn, $privateconfig["db"]["username"], $privateconfig["db"]["password"], array(
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ));
    }
    return $db;
}


$mirrorconfig  = site_config();
$privateconfig = private_config();


?>