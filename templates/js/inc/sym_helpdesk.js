/*global GIGO jQuery */
/*jslint browser: true */

// IPv4 by DNSS   (values: ok or bad)
// IPV6 by DNS, and IPV6 type (global, 6[6to4], t[teredo],a[asn]

GIGO.sym_helpdesk = {
  //   +------ IPv4 by DNS (good,bad)
  //   |:+--- IPv6 by DNS (good,bad)
  //   |:|+-- IPv6 by IP6 TYPE (global, bad, teredo, 6to4, asn)
  //   |:||
  'g:gg': "Dual Stack",
  'g:gt': "IPv4 plus Teredo",
  'g:g6': "6to4",
  'g:ga': "Dual Stack, Possible Tunnel",
  'g:bg': "Dual Stack - but no Quad-A's (AAAA's)",
  'g:bb': "IPv4 Only",
  'g:bt': "IPv4 Only (Teredo Detected)",
  'g:b6': null,
  'g:ba': null,
  'g:tb': "IPv4, plus Broken IPv6",
  'b:gg': "IPv6 Only",
  'b:gt': null,
  'b:g6': null,
  'b:ga': null,
  'b:bg': null,
  'b:bb': null,
  'b:bt': null,
  'b:b6': null,
  'b:ba': null,
  'b:tb': null,

};

GIGO.sym_helpdesk_qcode = {
  null: null,
  "Dual Stack": "46",
  // "IPv4 plus Teredo": "4t",
  "6to4": "624",
  // "Dual Stack, Possible Tunnel": "46t",
  "IPv4 Only": "4",
  "IPv4 Only (Teredo Detected)": "4",
  "NAT64": "64",
  "IPv4, plus Broken IPv6": "112",
  // "NAT64, Possible Tunnel": "64t",
  "IPv6 Only": 6
};
