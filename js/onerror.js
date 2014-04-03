

window.onerror = function(message, url, linenumber) {
 var eurl;
 // Use an Image hack to effectively pass errors to errors.php
// if ((BrowserName) && (BrowserName==="IE6"))
//   return;
// }
 if ((BrowserName) && (BrowserName === "IE6")) {
   if ((linenumber) && (parseInt(linenumber) < 100)) {
     // Hard to trust this. IE6 sucks.
     return;
   }
 }


 if ((url) && (linenumber)) {
  eurl =  'http://ds.master.test-ipv6.com/errors.php?';
  eurl = eurl + "message=" + encodeURIComponent(message);
  eurl = eurl + "&url=" + encodeURIComponent(url);
  eurl = eurl + "&linenumber=" + encodeURIComponent(linenumber);
  eurl = eurl + "&lang=" + encodeURIComponent("[% GET langUC %]");
  eurl = eurl + "&version=" + encodeURIComponent("[% GET version %]");
 (new Image).src = eurl;
 }
 return false;  // Go ahead and write to the browser's error log
};

