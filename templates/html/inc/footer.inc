<hr/>
<div id="about">
<p>  Copyright (C) 2010, 2020 Jason Fesler. {{ All rights reserved. }}  Version [% .GitInfo.Version %] ([% .GitInfo.Hash %])<br/>

 <a href="/mirrors.html">{{ Mirrors }}</a> |
<!-- <a href="mission.html">{{ Mission }}</a> | -->
 <a href="https://github.com/falling-sky/source/wiki">{{ Source }}</a> |
 <a href="mailto:jfesler@test-ipv6.com?subject=test-ipv6.com">{{ Email }}</a>
 - &nbsp; -
<a href="/attributions.html">{{ Attributions }}</a>
[% if eq $page "index" %]
<span class="ghost">
  |  <a href="#" onclick=" GIGO.showdebug(); return false;">Debug</a>
</span>


[% end %]


  |

<a href="#" onclick="return help_page('locale.html','Locale')">
<img src="/images/icon_987_red.png" class="em1" border="0" />{{locale}}</a>
{{percenttranslated}}


<span id="social" style="display:none">
|  {{Share on:}} 
</span>


<br/>
[% PROCESS "inc/disclaimer.inc" %]
</p>
</div>

[% PROCESS "inc/fixup_html.inc" %]
[% PROCESS "inc/fixup_html_minimal.inc" %]

</body>
</html>
