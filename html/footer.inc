<hr/>
<div id="about">
<p>  Copyright (C) 2010, 2014 Jason Fesler. [% " All rights reserved. " | i18n %] -- r[% GET git_Revision %]<br/>

 <a href="mirrors.html">[% " Mirrors " | i18n %]</a> |
 <a href="mission.html">[% " Mission " | i18n %]</a> |
 <a href="source.html">[% " Source " | i18n %]</a> |
 <a href="mailto:jfesler@test-ipv6.com?subject=test-ipv6.com">[% " Email " | i18n %]</a>
 - &nbsp; - 
<a href="attributions.html">[% " Attributions " | i18n %]</a>
[% IF page == "index" %]  
<span class="ghost">
  |  <a href="#" onclick=" GIGO.showdebug(); return false;">Debug</a> 
</span>
[% END %]
<br/>
[% PROCESS "disclaimer.inc" %]
</p>
</div>

[% PROCESS "fixup_html.inc" %]
[% PROCESS "fixup_html_minimal.inc" %]

</body>
</html>
