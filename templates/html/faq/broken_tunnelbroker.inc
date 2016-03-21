<p>
  {{ <b>If you set up a tunnelbroker tunnel</b>: The most common causes for tunnelbroker users to fail are: }}
</p>

<ul>
  <li>{{ Your IPv4 address may have changed; you need to tell the tunnelbroker server this happened. }}</li>

  <li>{{ If you are using your router to do the 6in4 (sometimes called 6to4 with explicit provider): }}

    <ul>
      <li>{{ Make sure tunnelbroker knows your current IPv4 address. Our site tells you your public IPv4 address. }}</li>

      <li>{{ Make sure your router can ping the other side of the tunnel. Don't waste your time fixing computers until the router works! }}</li>
    </ul>
  </li>

  <li>{{ If you are using your Linux, BSD, Mac, or Windows box to "talk 6to4" specifically: }}

    <ul>
      <li>{{ Make sure your router is passing "protocol 41" to you. }}</li>

      <li>{{ Make sure any software firewall you are operating is passing "protocol 41" to you. }}</li>

      <li>{{ If everything worked before your reboot but fails now, check your firewall settings. }}</li>

      <li>{{ Make sure the box "doing 6to4" can ping the other side of the tunnelbroker gateway before working on any other hosts. }}</li>
    </ul>
  </li>
</ul>
