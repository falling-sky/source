<hr/>
<div id="about">
<p>  Copyright (C) 2010, 2014 Jason Fesler. {{ All rights reserved. }}  Version [% .GitInfo.Version %]<br/>

 <a href="mirrors.html">{{ Mirrors }}</a> |
<!-- <a href="mission.html">{{ Mission }}</a> | -->
 <a href="https://github.com/falling-sky/source/wiki">{{ Source }}</a> |
 <a href="mailto:jfesler@test-ipv6.com?subject=test-ipv6.com">{{ Email }}</a>
 - &nbsp; - 
<a href="attributions.html">{{ Attributions }}</a>
[% if eq $page "index" %]  
<span class="ghost">
  |  <a href="#" onclick=" GIGO.showdebug(); return false;">Debug</a> 
</span>
[% end %]


  |

<a href="#" onclick="return help_page('locale.html','Locale')">
<img src="/images/icon_987_red.png" height=20 border=0>
{{locale}}
</a>
<!-- ( TODO put percentage here -->

<br/>
[% PROCESS "inc/disclaimer.inc" %]
</p>
</div>

[% PROCESS "inc/fixup_html.inc" %]
[% PROCESS "inc/fixup_html_minimal.inc" %]

</body>
</html>
