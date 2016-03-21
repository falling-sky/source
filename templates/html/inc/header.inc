<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" lang="{{lang}}" xml:lang="{{lang}}">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>{{Test your IPv6.}}</title>
[% if eq .Basename "index" %]
  <meta name="description" content='{{This will test your browser and connection for IPv6 readiness, as well as show you your current IPV4 and IPv6 address.}}' />
[% end %]
  <meta name="keywords" content="test,ipv4,ipv6,isp" />
  <meta name="y_key" content="6a3ded130c3ff129" />
  <link rel="SHORTCUT ICON" href="http://test-ipv6.com/images/favicon.ico" />
  <link rel="stylesheet" href="/index.css?version=[% .GitInfo.Version %]" type="text/css" />
  <link rel="apple-touch-icon" href="/images/knob_info.png"/> 
  <meta property="og:image" content="http://test-ipv6.com/images/snapshot.png" />

   <script type="text/javascript"  src="/site/config.js?version=[% .GitInfo.Version %]"></script>
   <script type="text/javascript"  src="/index.js.{{locale}}?version=[% .GitInfo.Version %]"></script>

<!--[if IE 6]>
<script type="text/javascript">
BrowserName="IE6";
</script>
<![endif]-->


<script type="text/javascript">
//  Load help pages inside mini tabs if possible; else
//  make same function load entire document with real headers
function help_page (url,text) {
  try {
//      GIGO.help_popup(url + " #content",text);
      GIGO.help_popup(url,text);
  }
  catch (err) {
    document.location = url;
  }
  return false;
};
</script>


</head>

<body>

