/*global GIGO, MirrorConfig, jQuery, alert, $gt */
/*jslint nomen: true */


GIGO.messages = {
    "bad": "[% 'bad' | i18n | escape_quote %]",
    "ok": "[% 'ok' | i18n | escape_quote %]",
    "slow": "[% 'slow' | i18n | escape_quote %]",
    "timeout": "[% 'timeout' | i18n | escape_quote %]",
    
    "No Direct IP": "[% 'Connections to urls with IP addresses appear to be blocked; perhaps by a web filter such as \'NoScript\' or \'RequestPolicy\' installed into your browser, or filtering in your proxy server.  This limits some of the functionality of this test site.' | i18n | escape_quote  %]",
    "No Direct IPv4": "[% 'IPv4 Connections using DNS work; but literal IP addresses in urls do not.  These are rarely used on the web today.' | i18n | escape_quote %]",
    "No Direct IPv6": "[% 'IPv6 Connections using DNS work; but literal IP addresses in urls do not. These are rarely used on the web today.' | i18n | escape_quote %]",
    "6to4": "[% 'You appear to be using a public 6to4 gateway; your router may be providing this to you automatically.  Such public gateways have no service level agreements; you may see performance problems using such.  Better would be to get a native IPv6 address from your ISP.' | i18n | escape_quote %]",
    "teredo": "[% 'Your IPv6 connection appears to be using Teredo, a type of IPv4/IPv6 translation using a public gateway.  The quality for this <i>may</i> suffer, as you are using a public gateway to reach IPv6 based sites.' | i18n | escape_quote %]",
    "teredo-minimum": "[% 'Your IPv6 connection appears to be using Teredo, a type of IPv4/IPv6 gateway; currently it connects only to direct IP\'s.  Your browser will not be able to go to IPv6 sites by name.  This means the current configuration is not useful for browsing IPv6 web sites.' | i18n | escape_quote %]",
    "teredo-v4pref": "[% 'Your IPv6 connection appears to be using Teredo, a type of IPv4/IPv6 gateway.  Your particular teredo configuration is only used as a protocol of last resort. When visiting a site with both IPv4 and IPv6, IPv4 will be preferred.' | i18n | escape_quote %]",
    "IPv6 MTU": "[% 'Danger! IPv6 sorta works - however, large packets appear to fail, giving the appearance of a broken website.  If a publisher publishes to IPv6, you will believe their web site to be broken. Ask your ISP about MTU issues; possibly with your tunnel.' | i18n | escape_quote %] [% 'Check your firewall to make sure that ICMPv6 messages are allowed (in particular, Type 2 or Packet Too Big).' | i18n | escape_quote %]",
    "confused:ASK": "[% 'Test results inconclusive; they were not consistent with expectations.  Please rerun the test, and if the results are the same, please fill out the contact form.' | i18n | escape_quote %]",
    "dualstack:ipv4_preferred": "-",
    "dualstack:ipv6_preferred": "-",
    "dualstack:slow": "[% 'For unknown reasons, your browser appears to operate slower when given the option of connecting to both IPv4 and IPv6.  Please rerun the test, and if the results are the same, please fill out the contact form.' | i18n | escape_quote %]",
    "ipv4_only": "[% 'You appear to be able to browse the IPv4 Internet only.  You will not be able to reach IPv6-only sites.' | i18n | escape_quote %]",
    "ipv4_only:ds_good": "[% 'When a publisher offers both IPv4 and IPv6, your browser appears to be happy to take the IPv4 site without delay.' | i18n | escape_quote %]",
    "ipv4_only:ds_slow": "[% 'When a publisher offers both IPv4 and IPv6, your browser appears to slow down signficantly compared to an IPv4-only site. You may even believe the destination web site to be broken. This may be due to your IPv6 configuration.' | i18n | escape_quote %]",
    "ipv4_only:ds_timeout": "[% 'When a publisher offers both IPv4 and IPv6, your browser will time out trying to connect. You may believe the site is down. This may be due to your IPv6 configuration.  Consider disabling IPv6, or seeking help.' | i18n | escape_quote %]",
    "ipv4_slow": "[% 'Connections to IPv4 are slow, but functional.  Perhaps you or your ISP put you behind an IP sharing device (NAT) that is currently slow.' | i18n | escape_quote %]",
    "ipv6_only": "[% 'You appear to be able to browse the IPv6 Internet only.  You have no access to IPv4.  That\'s pretty bold!' | i18n | escape_quote %]",
    "ipv6_slow": "[% 'Connections to IPv6 are slow, but functional.   Perhaps you are using a public IPv6 tunnel that is either slow, or not located near you.' | i18n | escape_quote %]",
    "ipv6_timeout": "[% 'Connections to IPv6-only sites are timing out.  Any web site that is IPv6 only, will appear to be down to you.' | i18n | escape_quote %]",
    "broken_ipv6": "[% 'Connections to IPv6-capable web sites hang.  It appears that you may have IPv6 configured; and your computer believes that your IPv6 is working, with a route.  It is however completely failing.  Any web site that adds IPv6, will become unreachable to you.  If you are unable to fix your IPv6 routing or connectivity, seek help.  If all else fails, strongly consider disabling IP6 on host.' | i18n | escape_quote %]",
    "webfilter:blocked": "[% 'We are unable to test your system; it appears that a firewall or browser filter is preventing the test from running.  Critical tests are failing.  Try disabling any browser plugins, extensions, or add-ons (such as ad blockers); and reloading this page.  If that still fails, you can leave a comment requesting help.' | i18n | escape_quote %]",
    "webfilter:dsboth": "[% 'We are unable to test your system; it appears that a firewall or browser filter is preventing the test from running.  The dual-stack tests are failing.  Try disabling any browser plugins, extensions, or add-ons (such as ad blockers); and reloading this page.  If that still fails, you can leave a comment requesting help.' | i18n | escape_quote %]",
    "webfilter:addons": "[% 'Your browser is blocking the test urls.  We will try alternate methods, but they may fail to show your IP address; and may affect the quality of the advice given.' | i18n | escape_quote %]",
    "webfilter:firefox": "[% 'The most likely cause is NoScript or AdBlock+.  NoScript can be told to permit all scripts on this page (you may need to do this more than once).  At minimum, permit the urls listed below.' | i18n | escape_quote %]",
    "NAT64": "[% '
    NAT64 detected.  IPv6 works.  IPv4 works for most purposes.
    Applications that are hard-coded for IPv4-only will fail.
    We are aware of at least one major voice-over-ip program
    that falls into this category.  Your application\'s support
    staff may need a nudge to add proper IPv6 support.
    ' | i18n | escape_quote %]",
    "v6ns:ok": "[% 'Your DNS server (possibly run by your ISP) appears to have IPv6 Internet access.' | i18n | escape_quote %]",
    "v6ns:bad": "[% 'Your DNS server (possibly run by your ISP) appears to have no access to the IPv6 Internet, or is not configured to use it.  This may in the future restrict your ability to reach IPv6-only sites.' | i18n | escape_quote %]",
    "ip_timeout:firefox": "[% 'You are likely using a FireFox plugin that is causing IP based tests to fail.  Examples: RequestPolicy.  Please disable those while using this site.' | i18n | escape_quote %]",
    "confused:obbo": "[% 'A lookup for an IPv6-only name failed; yet the lookup and connect for dual-stack connected via IPv6.  Something appears to be confused with the DNS lookups.' | i18n | escape_quote %]",
    "apple:dnsbug_aaaa": "[% 'A lookup for an IPv6-only name failed; yet the lookup and connect for dual-stack connected via IPv6.   The IPv6-only lookup should have worked.  Apple has a bug that sporadically causes some IPv6 lookups to fail.  We saw evidence of it on this test. You can reload the page and try the test again.  For more details, see <a href=\"http://openradar.appspot.com/7333104\">http://openradar.appspot.com/7333104</a>.' | i18n | escape_quote %]",
    "apple:dnsbug_ds": "[% 'A lookup for an dual-stack IPv4 and IPv6 name failed (at minimum it should have connected via IPv4).  Apple has a bug that sporadically causes some IPv6 lookups to fail.  We saw evidence of it on this test. You can reload the page and try the test again.  For more details, see <a href=\"http://openradar.appspot.com/7333104\">http://openradar.appspot.com/7333104</a>.' | i18n | escape_quote %]",
    "ipv4:no_address": "[% 'No IPv4 address detected' | i18n | escape_quote %]",
    "ipv6:no_address": "[% 'No IPv6 address detected' | i18n | escape_quote %]",
    "no_address": "[% 'Your IP address(es) could not be detected due to inteference from browser add-ons.' | i18n | escape_quote %]",
    "opera": "[% 'The Opera web browser seems to be break on this site frequently. <b>If you have trouble, try another browser</b>.' | i18n | escape_quote %]",
    "opera:turbo": "[% '<b>Disable turbo mode on Opera, and try again.</b>  Turbo mode is not compatible with the needs of this site.' | i18n | escape_quote %]",
    "dualstack:safe": "[% '<b>Good news!</b> Your current configuration will continue to work as web sites enable IPv6.' | i18n | escape_quote %]",
    "dualstack:unsafe": "[% '<b>Our tests show that you will have a broken or misconfigured IPv6 setup, and this will cause problems as web sites enable IPv6.</b>' | i18n | escape_quote %]",
    "dualstack:mtu": "[% '<b>Our tests show that you may have MTU problems with IPv6; this can cause web sites to load slow (or not at all) when web sites enable IPv6.</b>' | i18n | escape_quote %]",
    "buggydns1": "[% 'We looked up an IPv6 address, but your DNS server (possibly your home router) mangled the response, and is treating it as (broken) IPv4.' | i18n | escape_quote %]",
    "tunnel_dumb": "[% 'It appears that you use a tunnel mechanism for either IPv4 or IPv6.' | i18n | escape_quote %]",
    "tunnel_6rd_dumb": "[% 'It appears that you use a managed tunnel mechanism, 6RD, to transport IPv6 over IPv4.' | i18n | escape_quote %]",
    "proxy_via": "[% 'We have detected that you are using a proxy.  This means we are testing your proxy server, not your computer. Proxy details (as reported by your proxy \'Via\' header): %details' | i18n | escape_quote %]",
    "proxy_via_dumb": "[% 'We have detected that you are using a proxy.  This means we are testing your proxy server, not your computer.' | i18n | escape_quote %]",
    "ipv6:nodns": "[% 'IPv6 connections work, but connections using DNS names do not use IPv6.  For some reason, your browser or your OS is not doing IPv6 DNS \'AAAA\' lookups.' | i18n | escape_quote %]",
    "broken": "[% 'We have suggestions to help you fix your system.' | i18n | escape_quote %]",
    "sites": "[% 'Since you have IPv6, we are including a tab that shows how well you can reach other IPv6 sites.  %sites' | i18n | escape_quote %]",
    "avoids_ipv6": "[% 'Your browser has real working IPv6 address - but is avoiding using it.  We\'re concerned about this.' | i18n | escape_quote %]"
};

GIGO.messages_popups = {
// These are not just strings, but arrays,
// #1: url
// #2: link text to show (translate this!)
// Between the first and second string, there must be a comma and a space.
    "dualstack:mtu": ["faq_pmtud.html", "[% 'faq: MTU' | i18n | escape_quote %]"],
    "IPv6 MTU": ["faq_pmtud.html", "[% 'faq: MTU' | i18n | escape_quote %]"],
//    "ipv4:no_address": ["faq_ipv4_only.html", "[% 'faq: No IPv4' | i18n | escape_quote %]"],
    "ipv6:no_address": ["faq_no_ipv6.html", "[% 'faq: No IPv6' | i18n | escape_quote %]"],
    "6to4": ["faq_6to4.html", "[% 'faq: 6to4' | i18n | escape_quote %]"],
    "teredo-minimum": ["faq_teredo_minimum.html", "[% 'faq: Teredo Minimum' | i18n | escape_quote %]"],
    "v6ns:bad": ["faq_v6ns_bad.html", "[% 'faq: v6ns Bad' | i18n | escape_quote %]"],
    "webfilter:blocked":  ["faq_browser_plugins.html", "[% 'faq: Browser Plugins' | i18n | escape_quote %]"],
    "webfilter:dsboth":   ["faq_browser_plugins.html", "[% 'faq: Browser Plugins' | i18n | escape_quote %]"],
    "webfilter:firefox":  ["faq_firefox_plugins.html", "[% 'faq: Firefox Add-Ons' | i18n | escape_quote %]"],
    "webfilter:addons":   ["faq_browser_plugins.html", "[% 'faq: Browser Plugins' | i18n | escape_quote %]"],
    "ip_timeout:firefox": ["faq_firefox_plugins.html", "[% 'faq: Firefox Add-Ons' | i18n | escape_quote %]"],
    "opera": ["faq_opera.html", "[% 'faq: Opera' | i18n | escape_quote %]"],
    "buggydns1": ["faq_buggydns1.html", "[% 'faq: Buggy DNS' | i18n | escape_quote %]"],
    "broken": ["broken.html", "[% 'faq: Broken!' | i18n | escape_quote %]"],
    "ipv6:nodns": ["faq_broken_aaaa.html", "[% 'faq: Broken DNS Lookups' | i18n | escape_quote %]"],
    "avoids_ipv6": ["faq_avoids_ipv6.html", "[% 'faq: Avoiding IPv6?' | i18n | escape_quote %]"],
    "tunnel_6rd_dumb": ["faq_tunnel_6rd.html", "[% 'faq: 6RD tunnel' | i18n | escape_quote %]"]
};
