<p><b>{{ Unexpected IPv6 address? }}</b></p>

<p>
{{ Modern operating systems all have IPv6 enabled.  This feature is 
dormant until someone explicitly configures IPv6, <em><b>or</b></em>
a device on the local network offers it.  Autoconfigured IPv6 hosts learn their IPv6 address
and their gateway through the use of IPv6 router announcements (RAs).
The network you are on may intentionally offer IPv6; you'll automatically use it when your computer sees it. }}
</p>

<p>
{{ <b>Where this goes wrong:</b>  Some people plug their router into the
network (wired or wireless) and inadvertantly offer IPv6 services to
everyone.  Classic examples of this are where people add an early version of
an Apple router (with 6to4 automatically enabled); another example is
someone who has Windows Internet Connection Sharing enabled.  In both cases,
there is a chance they offer their services - and become your IPv6 router of
choice, without any notification to you.
 }}
</p>

<p>{{ If these IPv6 routers
don't work, you will fail to connect to any web site that offers services on
both IPv4 and IPv6.  Even if they do work, if the router in question is
unplugged (the owner packs up, leaves the hotel/conference) your host never
gets the notice; and it can be hours before it gives up. }}
  </p>

<p><b>{{ This is similiar to someone accidentially (or intentionally) running a rogue DHCP server. }}</b></p> 

<p>
{{ <b>If you are are not the network admin</b> - and have no access to fix
the problem - consider disabling IPv6, at least for the location you are in.
Another option might be to try turning off, and turning back on, your
network interface (clearing the IP address), in case the source 
of the problem has left the network.
 }}
</p>


<p>
{{ <b>If you are the network administrator</b>:  You can use the default
route information to identify the ethernet address; and then search for the
owner of that ethernet address.  Some network vendors have features that
will suppress the advertisements of unauthorized RAs (router announcements);
consider enabling those feaatures.  More reactive measures
involve finding (by ethernet address) the owner of the device;
or possibly spoofing RA's from their device to indicate the device
is going away.
 }}</p>


