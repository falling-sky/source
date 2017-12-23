<p><b>{{ Identify your IPv6 address, and your default router (if you have one). }}</b></p>

<p>{{ Finding your IPv6 address and default router can be a challenge if you are not familiar with your OS's network configuration.  Instructions for your OS are below. }}</p>

<p>
{{ When looking for your IPv6 address, skip any <code>fe80:</code> address.
Everyone has them if their OS supports IPv6; this is regadless of whether or
not your ISP supports IPv6 yet.  Those are "link local" addresses; used just
for communicating to other hosts in the same physical network as you.
 }}</p>

<div class="os_osx">

  <p>{{ OS X users: To find your IP address using the GUI: }}</p>
  <ul>
  <li>{{ Go to the "Apple" menu (top left corner) }}</li>
  <li>{{ Go to System Preferences }}</li>
  <li>{{ Go to Network }}</li>
  <li>{{ Click on your primary network (green icon) if you have more than one work. }}</li>
  <li>{{ Go to "Advanced" }}</li>
  <li>{{ Look at the TCP/IP tab, uder "Configure IPv6". }}</li>
  <li>{{ Make a note of whether or not there is a router. }}</li>
  <li>{{ Make a note of the IPv6 address (if any). }}</li>
  </ul>

  <p>{{ OS X users: To find your IP address using the command line: }}</p>
  <ul>
  <li>{{ To open your terminal: Go to your Applications folder; go to Utilities; and double click Terminal. }}</li>
  <li>{{ To see your IP addresses: <code>ifconfig -a inet6</code> or <code>ifconfig -f inet6</code>  }}</li>
  <li>{{ Ignore the <code>fe80:</code> addresses; look for any other address on your <code>en0</code> or <code>en1</code>. }}</li>
  <li>{{ To see if you have a default route: <code>netstat -nr -f inet6</code>. }}</li>
  <li>{{ Look for a line that says "default"; probably pointing to a gateway starting with <code>fe80:</code> }}</li>
  </ul>
</div>

<div class="os_ios">
  <p>{{ iPhone and iPad users: No information is shown via Apple's preferences/setup.  The "IT Tools" and the "ip6config" apps do show IPv6 address data; both cost. }}</p>
</div>


<div class="os_linux">

  <p>{{ Linux users: To find your IPv6 address, open a terminal and.. }}</p>
  <ul>
  <li><code>ip -6 address show</code></li>
  </ul>

  <p>{{ Linux users: To find your IPv6 route, use: }}</p>
  <ul>
  <li><code>ip -6 route show default</code>
  </ul>

</div>

<div class="os_other">

  <p>{{ Generic unix instructions for determining your IPv6 address and default route: }}</p>
  <ul>
  <li>{{ Run }} <code>ifconfig -a</code> {{ and look for <code>inet6</code> to see your possible IPv6 addresses. }}</li>
  <li>{{ Run }} <code>netstat -nr</code> {{ and look for <code>inet6</code> or <code>Internet6</code> or similar to find the IPv6 portion; then look for <code>default</code> or <code>::</code> or <code>::/0</code>. }}</li>
  </ul>

</div>

<div class="os_windows">

  <p>{{ Windows users: To find your IP address using cmd.exe: }}</p>
  <ul>
  <li>{{ Go to your "start" menu }}</li>
  <li>{{ If you have a "Run" menu option, select it.  Otherwise go to the "Search programs and files" box. }}</li>
  <li>{{ Type <code>cmd.exe</code> }}</li>
  <li>{{ In the cmd window, type <code>ipconfig</code> . }}</li>
  </ul>

  <p>{{ Windows 7 GUI users: }}</p>
  <ul>
  <li>{{ Go to the start menu }}</li>
  <li>{{ Go to the control panel }}</li>
  <li>{{ Go to "Network and Internet" }}</li>
  <li>{{ Go to "View network status and tasks" }}</li>
  <li>{{ Go to "Change adapter settings". }}</li>
  <li>{{ Go to your main Internet connection, double click }}</li>
  <li>{{ Go to "Details" }}</li>
  <li>{{ Look for "IPv6 Address" and "IPv6 Default Gateway" }}</li>
  </ul>

  <p><em>{{ Other Windows based OS's: Send jfesler@test-ipv6.com detailed instructions; and I'll add them to the site. }}</em></p>

</div>
