<p><b>ULA or Unique-Local-Unicast</b>:
{{ If you have an IP address starting with <code>FC</code> or <code>FD</code>, you
have what is effectively a private IPv6 address. It might be usable for talking
to other devices within your home, or within your company. It also allows you to
have a steady IPv6 address inside, even if your public IPv6 address changes regularly.
 }}</p>

<p>{{ The main problem with ULA is that certain home routers are now offering ULA,
*and* giving you a default route. This route is offered regardless of whether or
not your router actually has IPv6 connectivity. From your browser's point of view,
it doesn't know that your default route goes nowhere; there is no feedback mechanism.
Since IPv6 is (roughly speaking) preferred over IPv4, your browser will try using
this broken route. It may take minutes before giving up. }}</p>

<p>{{ Our advice: Enable ULA only if your router has full time IPv6 connectivity.
Disable it, otherwise.  If you do disable it on your router, you will likely
need to reboot your router first, then reboot your host, before the symptoms go away. }}</p>

