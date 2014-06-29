<div id="navcontainer">
<ul id="navlist">

<li><a href="/" 
[% IF page == "index" %] id="current" [% SET tabbed = 1 %] [% END %]>[% "Test IPv6" | i18n %]</a></li>



<li><a href="/faq.html" 
[% IF page == "faq" %] id="current" [% SET tabbed = 1 %] [% END %]>[% "FAQ" | i18n %]</a></li>



<li><a href="/mirrors.html" 
[% IF page == "mirrors" %] id="current" [% SET tabbed = 1 %] [% END %]>[% "Mirrors" | i18n %]</a></li>



<!-- IF this is a page not normally in the banner, put it up this time anyways. -->
[% UNLESS page == "stats" %]
[% UNLESS page == "changes" %]
[% UNLESS tabbed %]
[% IF page %]
<li><a href="#"
id="current">[% GET page %]</a></li>
[% END %]
[% END %]
[% END %]
[% END %]



  <li class=navright tabname=stats style="display:none"><a href="/stats.html" tabname=stats 
  [% IF page == "stats" %] id="current" [% SET tabbed = 1 %] [% END %]>[% "stats" | i18n %]</a></li>






</ul>

<div class=navright>
<a href="/locale.html">
<img src="/images/icon_987_red.png" height=32 border=0>
</a>
</div>

</div>
