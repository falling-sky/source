<p><b>{{If you use 6to4</b> (without a tunnel broker; ie, using anonymous 6to4):}}</p>

[% PROCESS "faq/6to4_sucks.inc" %]
<p>{{If you want to continue trying to debug anonymous 6to4:}}</p>

<ul>
  <li>{{If you are using your router to do the 6to4:}}</li>

    <ul>
      <li>{{Make sure your router has a public IPv4 address. Without this, 6to4 fails.}}</li>

      <li>{{ If your router permits you to log in, use "ping" or "ping6" and see if you can ping "ipv6.test-ipv6.com". Don't waste your time fixing computers until the router works! }}</li>
    </ul>

  <li>{{ If you are using your Linux, BSD, Mac, or Windows box to "talk 6to4" specifically: }}</li>

    <ul>
      <li>{{ Make sure your router is passing "protocol 41" to you. }}</li>

      <li>{{ Most home systems have private IPv4 addresses; this won't work with 6to4 (unless..) }}</li>

      <li>{{ Make sure your 6to4 interface knows your public IPv4 address. }}</li>

      <li>{{ Make sure that your router permits protocol 41 from any IP address - not just 192.88.99.1. This will allow web sites to operate their half of 6to4, even if they can not spoof the 192.88.99.1 anycast address. }}</li>

      <li>{{ Linux users using iptables connection tracking: take heed of the previous note! }}</li>
    </ul>

  <li>{{ Consider changing how you connect. }}</li>

  <li style="list-style: none; display: inline">
    <ul>
      <li>{{ Ask your ISP if they offer any IPv6 connectivity (including possibly 6in4 tunnels, or tunnelbroker type tunnels). }}</li>
      <li>{{ See <a href="#" onclick='return help_page("faq_6to4.html","6to4")'>6to4</a> for more information on why you would want to switch; and some options. }}</li>
    </ul>
  </li>
</ul>
  	