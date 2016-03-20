
 <script type="text/javascript">


// We want to show the "stats" tab if the site is configured for it.
//Since we are now loading configs separately, instead of compiling
//the web content tuned for a single site, we now must go find
//and customize the stats tab on page load.


try {

   if (MirrorConfig.options.show_stats) {
      // FIx the URL, show the tab

      var arr_elms = [];
      arr_elms = document.body.getElementsByTagName("a");
      var elms_len = arr_elms.length;
      for (i=0; i<elms_len; i=i+1) {
      if(arr_elms[i].getAttribute("tabname") != null){  
         if (arr_elms[i].getAttribute("tabname") === "stats") {
           arr_elms[i].href = MirrorConfig.options.show_stats;
         } 
      }
      }

      // Show the tab
      arr_elms = document.body.getElementsByTagName("li");
      elms_len = arr_elms.length;
      for (i=0; i<elms_len; i=i+1) {
      if(arr_elms[i].getAttribute("tabname") != null){  
         if (arr_elms[i].getAttribute("tabname") === "stats") {
           arr_elms[i].style.display = 'inline';
         } 
      }
      }
   }


} catch(e) {
  var myAnchor = document.getElementById("tab_main");
  var mySpan = document.createElement("div");
  if (myAnchor && mySpan) {
    mySpan.innerHTML = "Site configuration issue: bad or missing /site/config.js";
    myAnchor.parentNode.replaceChild(mySpan, myAnchor);
  }
};


  </script>

