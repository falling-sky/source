
 <script type="text/javascript">
  $(document).ready(function() {
    console.log("fixup_html.inc")
    try { GIGO.fixup_html_per_site_config();} catch(e) {0};
    console.log("fixup_html.inc part 2 ")
    try { GIGO.fixup_html_per_locale();} catch(e) {console.log(e)};
  });
  </script>
