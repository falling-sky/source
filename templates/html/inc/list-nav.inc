<div id="navcontainer">
<ul id="navlist">

<li><a href="/"
[% if eq $page "index" %] id="current" [% end %]>{{Test IPv6}}</a></li>



<li><a href="/faq.html"
[% if eq $page "faq" %] id="current" [% end %]>{{FAQ}}</a></li>



<li><a href="/mirrors.html"
[% if eq $page "mirrors" %] id="current" [% end %]>{{Mirrors}}</a></li>




<!-- IF this is a page not normally in the banner, put it up this time anyways. -->
[% if ne $page "stats" %]
[% if ne $page "faq" %]
[% if ne $page "mirrors" %]
[% if ne $page "index" %]
[% if ne $page "" %]
<li><a href="#"
id="current">[% $page %]</a></li>
[% end %]
[% end %]
[% end %]
[% end %]
[% end %]



  <li class="navright" tabname="stats" style="display:none"><a href="/stats.html" tabname="stats"
  [% if eq $page "stats" %] id="current" [% $tabbed := 1 %] [% end %]>{{stats}}</a></li>






</ul>

<div class="navright">
<a href="/locale.html">
<img src="/images/icon_987_red.png" style="height: 2em; width: auto;" border="0" />
</a>
</div>

</div>
