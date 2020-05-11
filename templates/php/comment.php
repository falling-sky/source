<?php

require "common.php";

function translate($data) {
 // Based on
 // http://ankwebprogramming.wordpress.com/2011/10/08/translating-text-using-the-google-translate-api-and-php-json-and-curl/
 //  Kartik Rangholiya

  global $privateconfig;


  $ENDPOINT = 'https://www.googleapis.com/language/translate/v2';
  $values = array(
                'key'    => $privateconfig["google_translate"]["key"],
                'target' => $privateconfig["google_translate"]["language"],
                'q'      => $data
            );
            $formData = http_build_query($values);

            $ch = curl_init($ENDPOINT);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $formData);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('X-HTTP-Method-Override: GET'));

            $json = curl_exec($ch);
            curl_close($ch);

            $data = json_decode($json, true);

            if (!is_array($data) || !array_key_exists('data', $data)) {
                return "n/a";
            }
            if (!array_key_exists('translations', $data['data'])) {
                return "n/a";
            }

            if (!is_array($data['data']['translations'])) {
                return "n/a";
            }
            foreach ($data['data']['translations'] as $translation) {
                return $translation['translatedText'];
            }
            return "n/a";
}

function chunk_of_text($title,$chunk,$translate) {
  global $mirrorconfig;
  global $privateconfig;
  $chunk_e = htmlentities($chunk);
  $html = "<div>";
  $html .= " <div class=heading><span style='background-color: black; color: white; width: 100%;'>$title</span></div>";
  $html .= " <div class=userinput><pre><code style='font-size: 125%'>$chunk_e</code></pre></div>";
  if ($translate) {
      if ($privateconfig["google_translate"]["enable"]) {
        $chunk = translate($chunk);
        $html .= chunk_of_text("$title (translated)",$chunk,0);
      }
  }
  return $html;
}

function chunk_of_hash($title,$json) {
  global $mirrorconfig;
  global $privateconfig;

  $r = json_decode($json,true);
  //$y = yaml_emit($r);
  $y = json_encode($r,JSON_PRETTY_PRINT);
  return chunk_of_text($title,$y,0);
}

function chunk_of_results($title,$json) {
  global $mirrorconfig;
  global $privateconfig;

  $r = json_decode($json,true);
  $n = Array();
  $n["tests"] = Array();

  foreach ($r["tests"] as $key=>$array) {
    $n["tests"][$key] = $array["status"] . " " . sprintf('%.03f',$array["time_ms"]/1000.0);
  }
  $n["tokens"]=$r["tokens"];
  //$y=yaml_emit($n);
  $y = json_encode($n,JSON_PRETTY_PRINT);
  return chunk_of_text($title,$y,0);


}



function get_css($filename) {
  $buf = file_get_contents($filename);
  if (strlen($buf)) {
    return "<style>$buf</style>";
  } else {
    return "";
  }
}


function store_data_html() {
  global $mirrorconfig;
  global $privateconfig;

  $cookie = fetch_cookie();  # Validated for certain safety measures.
  $tokens = param_val("tokens","/^[a-zA-Z0-9 ,]+\$/");

  if ($_POST["consent"] != "given")   { 
    header("HTTP/1.1 400 Bad Request");
    print htmlentities("consent not given");
    exit(1);
  }

  if ($_POST["nobots"] != "serious") {
    header("HTTP/1.1 500 Internal server error");
    print htmlentities("nobots value wrong, received \"".  $_POST["nobots"] . "\"");
    exit(1);
  }

  if ($_POST["purpose"] == "-") {
    header("HTTP/1.1 400 Bad Request");
    print htmlentities("'purpose' must be specified to post this comment.");
    exit(1);

  }
  $base = htmlentities($_POST["subdomain"]);
#  $css = get_css("index.css");


  $message =  <<<HEREDOC
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="http://$base">
<title>feedback</title>
   <link REL="SHORTCUT ICON"   HREF="http://test-ipv6.com/images/favicon.ico">
  <META http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
HEREDOC;



  $message .= "<div>site name: $base</div>";
  $message .= "<div>";
  $message .= $_POST["form_tab_main"];
  $message .= "</div>";

  $ua = $_SERVER["HTTP_USER_AGENT"];
  $message .= chunk_of_text("user agent",$ua,0);

  $message.= chunk_of_text("replay",$_POST["form_replay"],0);


  $message .= "<hr/>";
   $purpose = "notes";
  if (preg_match('/^[a-z0-9 -]+$/i',$_POST["purpose"])) {
    $purpose = $_POST["purpose"];
  }

  $message .= chunk_of_text($purpose,$_POST["notes"],1);
  $message.= chunk_of_text("comments",$_POST["comments"],0);

  $message .= chunk_of_results("results",$_POST["form_results"],0);
  $message .= chunk_of_hash("config",$_POST["form_config"],0);




  $contact = trim($_POST["contact"]);
  $result = filter_var($contact, FILTER_VALIDATE_EMAIL);

  if ($result) {
     $replyto = "Reply-to: $contact\r\n";
  } else {
     $replyto = "";  $contact="";
  }

  $to = $mirrorconfig["site"]["mailto"];
  $subject = $mirrorconfig["site"]["name"] . " feedback [$contact]";
  $headers = $replyto . "Content-type: text/html; charset=utf-8";
  $headers = $headers . "\nContent-Transfer-Encoding: base64";

  $message64 = base64_encode($message);

  mail($to,$subject,$message64,$headers);
  print "Feedback sent; thank you for your assistance.<p>";
  print "If you included contact details, you may be contacted for further information, by " . $mirrorconfig["site"]["contact"]   . "</hr>";

}



function store_data_text() {
  global $mirrorconfig;
  global $privateconfig;

  $cookie = fetch_cookie();  # Validated for certain safety measures.
  $tokens = param_val("tokens","/^[a-zA-Z0-9 ,]+\$/");

  if ($_POST["nobots"] != "serious") {
    header("HTTP/1.1 500 Internal server error");
    print htmlentities("nobots value wrong, received \"".  $_POST["nobots"] . "\"");
    exit(1);
  }

  if ($_POST["purpose"] == "-") {
    header("HTTP/1.1 400 Bad Request");
    print htmlentities("'purpose' must be specified to post this comment.");
    exit(1);

  }


  $message = sprintf("%-15s: %s\n", "contact", $_POST["contact"]);
  $message .= sprintf("%-15s: %s\n", "purpose", $_POST["purpose"]);
  $message .= sprintf("%-15s: %s\n", "tokens", $_POST["tokens"]);
  $message .= sprintf("%-15s: %s\n", "score_transition", $_POST["score_transition"]);
  $message .= sprintf("%-15s: %s\n", "score_strict", $_POST["score_strict"]);
  $message .= sprintf("%-15s: %s\n", "a", $_POST["a"]);
  $message .= sprintf("%-15s: %s\n", "aaaa", $_POST["aaaa"]);
  if (preg_match("/ok|slow/",$_POST["ds4"])) {
    $message .= sprintf("%-15s: %s (via ipv4)\n", "ds", $_POST["ds4"]);
  } else if (preg_match("/ok|slow/",$_POST["ds6"])) {
    $message .= sprintf("%-15s: %s (via ipv6)\n", "ds", $_POST["ds6"]);
  } else {
    $message .= sprintf("%-15s: %s (via ipv4)\n", "ds", $_POST["ds4"]);
    $message .= sprintf("%-15s: %s (via ipv6)\n", "ds", $_POST["ds6"]);
  }
  $message .= sprintf("%-15s: %s\n", "dsmtu", $_POST["dsmtu"]);
  $message .= sprintf("%-15s: %s\n", "ipv4", $_POST["ipv4"]);
  $message .= sprintf("%-15s: %s\n", "ipv6", $_POST["ipv6"]);
  $message .= sprintf("%-15s: %s\n", "v6mtu", $_POST["v6mtu"]);
  $message .= sprintf("%-15s: %s\n", "v6ns", $_POST["v6ns"]);
  $message .= "----------------------------\n";
  $message .= sprintf("%-15s: %s\n", "ip4", $_POST["ip4"]);
  $message .= sprintf("%-15s: %s %s\n", "ip6", $_POST["ip6"], $_POST["ip6subtype"]);
  $message .= sprintf("%-15s: %s\n", "remote_addr", remote_addr());
  $message .= sprintf("%-15s: %s\n", "user-agent",  $_SERVER["HTTP_USER_AGENT"]);
  $message .= sprintf("%-15s: %s\n", "referer", $_SERVER["HTTP_REFERER"]);
  $message .= sprintf("%-15s: %s\n", "subdomain", $_POST["subdomain"]);
  $message .= sprintf("%-15s: %s\n", "consent", $_POST["consent"]);


  $message .= "\n\nNotes\n--------------\n" . $_POST["notes"];

  if ($privateconfig["google_translate"]["enable"]) {
    $message .= "\n\nTranslated\n---------\n" . translate( $_POST["notes"]);
  }

  $message .= "\n\nComments\n--------------\n" . $_POST["comments"];



#  print_r($_SERVER);


  $charset = "UTF-8";

#  header("Content-type: text/html; charset=$charset");
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>Test your IPv6.</title>
   <link REL="SHORTCUT ICON"   HREF="http://test-ipv6.com/images/favicon.ico">
  <META http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>
<?php


  $contact = trim($_POST["contact"]);
  $result = filter_var($contact, FILTER_VALIDATE_EMAIL);
  if ($result) {
     $replyto = "Reply-to: $contact\r\n";
  } else {
     $replyto = "";  $contact="";
  }


  if (
      (preg_match('/\S/',$_POST["notes"])) || 
      (preg_match('/\S/',$_POST["comments"])) ||
      (preg_match('/\S/',$_POST["contact"]))
      ) {
    mail($mirrorconfig["site"]["mailto"],$mirrorconfig["site"]["name"] . " feedback [$contact]", $message,$replyto . "Content-type: text/plain; charset=$charset");
   }


  print "Feedback sent; thank you for your assistance.<p>";
  print "If you included contact details, you may be contacted for further information, by " . $mirrorconfig["site"]["contact"]   . "</hr>";
  print "<pre><code>";
  print "To: " .  $mirrorconfig["site"]["mailto"] . "\n\n";
   print htmlentities($message,ENT_COMPAT,"UTF-8");
   print "</code></pre>";
  print "</body>";



}
if ($mirrorconfig["options"]["comment_html"]) {
  store_data_html();
} else {
  store_data_text();
}
?>
