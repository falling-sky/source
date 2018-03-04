<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="{{lang}}" xml:lang="{{lang}}">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>{{Test your IPv6.}}</title>
[% if eq .Basename "index" %]
  <meta name="description" content='{{This will test your browser and connection for IPv6 readiness, as well as show you your current IPv4 and IPv6 address.}}' /> [% end %]
  <meta name="keywords" content="test,ipv4,ipv6,isp" />
  <meta name="y_key" content="6a3ded130c3ff129" />
  <link rel="stylesheet" href="/index.css?version=[% .GitInfo.Version %]" type="text/css" />

  <!-- generic -->
  <link rel="SHORTCUT ICON" href="/images/favicon.ico" />

  <!-- apple -->
  <link rel="apple-touch-icon" href="/images/favicon-120.png?version=[% .GitInfo.Version %]"/> 
  <link rel="apple-touch-icon" href="/images/favicon-128.png?version=[% .GitInfo.Version %]" sizes="128x128"/> 
  <link rel="apple-touch-icon" href="/images/favicon-152.png?version=[% .GitInfo.Version %]" sizes="152x152"/> 
  <link rel="apple-touch-icon" href="/images/favicon-167.png?version=[% .GitInfo.Version %]" sizes="167x167"/> 
  <link rel="apple-touch-icon" href="/images/favicon-180.png?version=[% .GitInfo.Version %]" sizes="180x180"/> 
  <link rel="apple-touch-icon" href="/images/favicon-256.png?version=[% .GitInfo.Version %]" sizes="256x256"/> 
  
  <!-- android -->
  <link rel="icon" href="/images/favicon-256.png?version=[% .GitInfo.Version %]" sizes="256x256"/> 
  <link rel="icon" href="/images/favicon-192.png?version=[% .GitInfo.Version %]" sizes="192x192"/> 
  <link rel="icon" href="/images/favicon-128.png?version=[% .GitInfo.Version %]" sizes="128x128"/> 
  
  <!-- touch bar -->
  <link rel="mask-icon" href="/images/website_icon.svg?version=[% .GitInfo.Version %]" color="green"/>


  <meta property="og:image" content="https://test-ipv6.com/images/snapshot.png" />

   <script type="text/javascript"  src="/site/config.js?version=[% .GitInfo.Version %]"></script>
   <script type="text/javascript"  src="/index.js.{{locale}}?version=[% .GitInfo.Version %]"></script>

[% if eq .Basename "stats" %]
<script type="text/javascript"  src="/stats.js.{{locale}}?version=[% .GitInfo.Version %]"></script>
[% end %]

<!--[if IE 6]>
<script type="text/javascript">
BrowserName="IE6";
</script>
<![endif]-->


<script type="text/javascript">
//  Load help pages inside mini tabs if possible; else
//  make same function load entire document with real headers
function help_page (url,text) {
  console.log("help_page")

  if(document.getElementById("is_index_page") !== null) {
      console.log("help_page using help_popup");
      GIGO.help_popup(url,text);
  } else {
      console.log("help_page changing document url");
      document.location = url;
  }
  return false;
};
</script>


</head>

<body>
