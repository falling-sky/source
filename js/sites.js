/*global GIGO, jQuery,  window,  alert,  Browser */
/*jslint browser: true */
/*properties sites, site, loc, provider, url, v4, v6, hide */


GIGO.sites = [{
    "site": "www.yahoo.com",
    "loc": "global",
    "provider": "Yahoo!",
    "v4": "v4test.yahoo.com/eng/test/eye-test.png",
    "v6": "v6test.yahoo.com/eng/test/eye-test.png",
    "hide": 0
}, {
    "site": "google.com",
    "loc": "global",
    "provider": "Google",
    "url": "google.com",
    "v4": "test-ipv6-dot-com-v6exp3-v4.metric.gstatic.com/v6exp3/6.gif",
    "v6": "test-ipv6-dot-com-v6exp3-v6.metric.gstatic.com/v6exp3/6.gif",
    "hide": 0
}, {
    "site": "www.steffann.nl",
    "loc": "NL",
    "provider": "SJM Steffann Consultancy",
    "v4": "v4-only.steffann.nl/v4-only.png",
    "v6": "v6-only.steffann.nl/v6-only.png",
    "hide": 0
}, {
    "site": "stdio.be",
    "loc": "DE",
    "provider": "Andrew Yourtchenko (personal)",
    "v4": "ipv4.stdio.be/images/knob_valid_green.png",
    "v6": "ipv6.stdio.be/images/knob_valid_green.png",
    "hide": 0
}, {
    "site": "www.vyncke.org/ipv6status/",
    "loc": "FR",
    "provider": "Eric Vyncke (personal)",
    "v4": "test4.vyncke.org/knob_valid_green.png",
    "v6": "test6.vyncke.org/knob_valid_green.png",
    "hide": 1
}, {
    "site": "www.delong.com",
    "loc": "US",
    "provider": "Owen DeLong (personal)",
    "v4": "ohno.delong.com/cgi-bin/trainwreck.cgi",
    "v6": "thegoodlife.delong.com/cgi-bin/beaches.cgi",
    "hide": 0
}, {
    "site": "www.ripe.net",
    "loc": "NL",
    "provider": "RIPE NCC / AS3333",
    "v4": "test-ipv6-com.r4.td.wdm.sg.ripe.net/1x1.gif",
    "v6": "test-ipv6-com.r6.td.wdm.sg.ripe.net/1x1.gif",
    "hide": 0
}, {
    "site": "aa.net.uk",
    "loc": "UK",
    "provider": "AAISP (UK IPv6 ISP)",
    "v4": "ip4.aa.net.uk/images/aaisp_logo.png",
    "v6": "ip6.aa.net.uk/images/aaisp_logo.png",
    "hide": 1
}, {
    "site": "he.net",
    "loc": "US (CA)",
    "provider": "HE.net",
    "v4": "ipv4.tunnelbroker.net/images/helogo.gif",
    "v6": "ipv6.tunnelbroker.net/images/helogo.gif",
    "hide": 0
}, {
    "site": "www.heise.de",
    "loc": "DE",
    "provider": "Heise",
    "v4": "www.four.heise.de/icons/ho/heise.gif",
    "v6": "www.six.heise.de/icons/ho/heise.gif",
    "hide": 0
}, {
    "site": "www.mozilla.org",
    "loc": "US (AZ)",
    "provider": "Mozilla Foundation",
    "v4": "ipv4.mozilla.org/firefox.png",
    "v6": "ipv6.mozilla.org/World_IPv6_launch_logo_128.png",
    "hide": 0
}, {
    "site": "8n1.org",
    "loc": "NL",
    "provider": "8n1.org - a simple pastebin",
    "v4": "ip4.8n1.org/test.gif",
    "v6": "ip6.8n1.org/test.gif",
    "hide": 0
}, {
    "site": "test-ipv6.netiter.dk",
    "loc": "DE",
    "provider": "Netiter ApS",
    "v4": "test-ipv6.com.i42.test-ipv6.easyv6.net/ipv6-test.png",
    "v6": "test-ipv6.com.i32.test-ipv6.easyv6.net/ipv6-test.png",
    "hide": 0
}, {
    "site": "www.rcs-rds.ro",
    "loc": "RO",
    "provider": "RCS & RDS",
    "v4": "ipv4.rcs-rds.ro/1x1.gif",
    "v6": "ipv6.rcs-rds.ro/1x1.gif",
    "hide": 0
}, {
    "site": "www.comcast.net",
    "loc": "US",
    "provider": "Comcast",
    "v4": "ipv4only.comcast6.net/images/knob_valid_green.png",
    "v6": "ipv6only.comcast6.net/images/knob_valid_green.png",
    "hide": 0
}, {
    "site": "nsx.de",
    "loc": "DE",
    "provider": "Stephan Fiebrandt (personal)",
    "v4": "ipv4.nsx.de/images/knob_valid_green.png",
    "v6": "ipv6.nsx.de/images/knob_valid_green.png",
    "hide": 0
}, {
    "site": "www.bsc-telecom.com",
    "loc": "UK",
    "provider": "BSC-Telecom",
    "v4": "ipv4.bsc-telecom.com/phone.gif",
    "v6": "ipv6.bsc-telecom.com/phone.gif",
    "hide": 0
}, {
    "site": "www.excathedra.co",
    "loc": "UK",
    "provider": "Ex Cathedra Photography",
    "v4": "ipv4.excathedra.co/knob_valid_green.png",
    "v6": "ipv6.excathedra.co/knob_valid_green.png",
    "hide": 0
}, {
    "site": "go6.vn",
    "loc": "VN",
    "provider": "NetNam Corporation",
    "v4": "ipv4lab.netnam.vn/netnam_ipv4.jpg",
    "v6": "ipv6lab.netnam.vn/netnam_ipv6.jpg",
    "hide": 0
}, {
    "site": "nic.br",
    "loc": "BR",
    "provider": "NIC.br",
    "v4": "v4.ipv6.br/pixel.gif",
    "v6": "v6.ipv6.br/pixel.gif",
    "hide": 0
}, {
    "site": "commcorp.net",
    "loc": "BR",
    "provider": "Commcorp Telecom",
    "v4": "v4.commcorp.net.br/pixel.gif",
    "v6": "v6.commcorp.net.br/pixel.gif",
    "hide": 1
}, {
    "site": "www.ctbc.com.br",
    "loc": "BR",
    "provider": "Algar Telecom / CTBC",
    "v4": "ipv4only.ctbc.net.br/ctbc/pixel.gif",
    "v6": "ipv6only.ctbc.net.br/ctbc/pixel.gif",
    "hide": 1
}, {
    "site": "www.cyberis.co.uk",
    "loc": "UK",
    "provider": "Cyberis Limited",
    "v4": "ipv4labs.cyberis.co.uk/logo.png",
    "v6": "ipv6labs.cyberis.co.uk/logo.png",
    "hide": 0
}, {
    "site": "snozzages.com",
    "loc": "US (VA)",
    "provider": "Warren Kumari",
    "v4": "ipv4.v6test.snozzages.com/1x1.gif",
    "v6": "ipv6.v6test.snozzages.com/1x1.gif",
    "hide": 0
}, {
    "site": "eurobilltracker.com",
    "loc": "FI",
    "provider": "EuroBillTracker",
    "v4": "ipv4.test-ipv6.eurobilltracker.com/img/1x1.gif",
    "v6": "ipv6.test-ipv6.eurobilltracker.com/img/1x1.gif",
    "hide": 0
}, {
    "site": "duplimaster.com",
    "loc": "ES",
    "provider": "duplimaster.com",
    "v4": "ipv4.duplimaster.com/public/images/logo-sombra.png",
    "v6": "ipv6.duplimaster.com/public/images/logo-sombra.png",
    "hide": 0
}, {
    "site": "campaya.co.uk",
    "loc": "UK",
    "provider": "Campaya",
    "v4": "ipv4.campaya.co.uk/apple-touch-icon.png",
    "v6": "ipv6.campaya.co.uk/apple-touch-icon.png",
    "hide": 0
}];
