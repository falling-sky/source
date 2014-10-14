/*global GIGO, jQuery,  window,  alert,  Browser */
/*jslint browser: true */
/*properties mirrors, site, loc, provider, url, hide */

/* js lint complains about UTF8 characters in Cyrillic and Japanese.  I am ignoring that complaint.
I have seen no feedback that says the text shows up incorrectly. */


GIGO.mirrors = [{
    "site": "test-ipv6.com",
    "loc": "US CA",
    "provider": "Jason Fesler",
    "hide": 0
}, {
    "site": "test-ipv6.asnet.am",
    "loc": "AM",
    "provider": "Academic Scientific Research Computer Network of Armenia",
    "hide": 1
}, {
    "site": "test-ipv6.at",
    "loc": "AT",
    "provider": "Silver Server GmbH",
    "hide": 1
}, {
    "site": "test-ipv6.waia.asn.au",
    "loc": "AU",
    "provider": "Western Australian Internet Association",
    "hide": 1
}, {
    "site": "test-ipv6.cz",
    "loc": "CZ",
    "provider": "nic.cz",
    "hide": 0
}, {
    "site": "test-ipv6.monash.edu",
    "loc": "AU",
    "provider": "Monash University",
    "hide": 0
}, {
    "site": "test-ipv6.ceengine.eu",
    "loc": "RO",
    "provider": "Central and Eastern European Networking Engine",
    "hide": 0
}, {
    "site": "test-ipv6.internet.fo",
    "loc": "FO",
    "provider": "Faroese Telecom",
    "hide": 1
}, {
    "site": "test-ipv6.sth.sze.hu",
    "loc": "HU",
    "provider": "NetClub, Szechenyi Istvan University",
    "hide": 1
}, {
    "site": "test-ipv6.carnet.hr",
    "loc": "HR",
    "provider": "Croatian Academic and Research Network",
    "hide": 0
}, {
    "site": "test-ipv6.hu",
    "loc": "HU",
    "provider": "Polaris-N Systems",
    "hide": 0
}, {
    "site": "test-ipv6.jp",
    "loc": "JP",
    "provider": "CLARA ONLINE, Inc",
    "hide": 0
}, {
    "site": "test-ipv6.nl",
    "loc": "NL",
    "provider": "BIT BV",
    "hide": 0
}, {
    "site": "test-ipv6.roedu.net",
    "loc": "RO",
    "provider": "RoEduNet",
    "hide": 0
}, {
    "site": "test-ipv6.ro",
    "loc": "RO",
    "provider": "RCS & RDS",
    "skipsites": 1,
    "hide": 0
}, {
    "site": "test-ipv6.se",
    "loc": "SE",
    "provider": "Interlan Gefle AB",
    "hide": 0
}, {
    "site": "test-ipv6.ams.vr.org",
    "loc": "NL",
    "provider": "vr.org",
    "hide": 0
}, {
    "site": "test-ipv6.chi.vr.org",
    "loc": "US IL",
    "provider": "vr.org",
    "hide": 0
}, {
    "site": "test-ipv6.iad.vr.org",
    "loc": "US VA",
    "provider": "vr.org",
    "hide": 0
}, {
    "site": "test-ipv6.sjc.vr.org",
    "loc": "US CA",
    "provider": "vr.org",
    "hide": 0
}, {
    "site": "test-ipv6.ceengine.eu",
    "loc": "RO",
    "provider": "Central and Eastern European Networking Engine",
    "hide": 0
}, {
    "site": "test-ipv6.chiveworthy.com",
    "loc": "US WI",
    "provider": "Dale Hartung",
    "skipsites": 0,
    "hide": 0
}, {
    "site": "test-ipv6.gremlin.ca",
    "loc": "CA",
    "provider": "Scott Logan",
    "skipsites": 0,
    "hide": 0
}, {
    "site": "ipv6-test.co.uk",
    "loc": "UK",
    "provider": "BSC-Telecom",
    "skipsites": 1,
    "hide": 0
}, {
    "site": "test-ipv6.edu.cn",
    "loc": "CN",
    "provider": "CERNET",
    "skipsites": 0,
    "hide": 0
}, {
    "site": "test-ipv6.vyncke.org",
    "loc": "FR",
    "provider": "Éric Vyncke",
    "hide": 0
}, {
    "site": "test-ipv6.si",
    "loc": "SI",
    "provider": "Damjan Sirnik",
    "hide": 0
}, {
    "site": "test-ipv6.showmyip.ca",
    "loc": "UK",
    "provider": "Christopher Munz-Michielin",
    "hide": 0
}, {
    "site": "test-ipv6.no",
    "loc": "NO",
    "provider": "Availo AS",
    "hide": 0
}, {
    "site": "test-ipv6.co.za",
    "loc": "ZA",
    "provider": "Neology",
    "hide": 0
}, {
    "site": "test-ipv6.vtt.net",
    "loc": "RU",
    "provider": "JSC \"Volgatranstelecom\"",
    "hide": 0
}, {
    "site": "test-ipv6.vn.ua",
    "loc": "UA",
    "provider": "IP-Connect LLC",
    "hide": 0
}, {
    "site": "test-ipv6.go6.si",
    "loc": "SI",
    "provider": "Go6 Lab - Slovenian IPv6 Iniciative",
    "hide": 0
}, {
    "site": "v6research.net",
    "loc": "US",
    "provider": "Bill Cerveny",
    "hide": 0
}, {
    "site": "test-ipv6.tld.sk",
    "loc": "SK",
    "provider": "Sk-nic",
    "hide": 0
}, {
    "site": "testipv6.de",
    "loc": "DE",
    "provider": "COSIMO Vertriebs -und Beratungs GmbH",
    "hide": 0
}, {
    "site": "test-ipv6.belwue.net",
    "loc": "DE",
    "provider": "BelWü",
    "hide": 0
}, {
    "site": "test-ipv6.uni-ruse.bg",
    "loc": "BG",
    "provider": "University of Ruse",
    "hide": 0
}, {
    "site": "sixte.st",
    "loc": "SG",
    "provider": "Delan Azabani",
    "hide": 0
}, {
    "site": "test-ipv6.alpinedc.ch",
    "loc": "CH",
    "provider": "AlpineDC",
    "hide": 0
}];
