/*global GIGO jQuery */
/*jslint browser: true */

// IPv4 by DNS, and IP    (values: ok or bad)
// IPV6 by DNS, and IP (values,ok or bad), and IPV6 type (global, 6[6to4], t[teredo],a[asn]

GIGO.sym_helpdesk = {
  //   +------ IPv4 by DNS (good,bad)
  //   |+----- IPv4 by IP (good,bad)
  //   ||:+--- IPv6 by DNS (good,bad)
  //   ||:|+-- IPv6 by IP6 TYPE (global, bad, teredo, 6to4, asn)
  //   ||:||
  'gg:gg': "Dual Stack",
  'gg:gt': "IPv4 plus Teredo",
  'gg:g6': "6to4",
  'gg:ga': "Dual Stack, Possible Tunnel",
  'gg:bg': "Dual Stack - but no Quad-A's (AAAA's)",
  'gg:bb': "IPv4 Only",
  'gg:bt': "IPv4 Only (Teredo Detected)",
  'gg:b6': null,
  'gg:ba': null,
  'gb:gg': "NAT64",
  'gt:gg': "NAT64",
  'gg:tb': "IPv4, plus Broken IPv6",
  'gb:gt': null,
  'gb:g6': null,
  'gb:ga': "NAT64, Possible Tunnel",
  'gt:ga': "NAT64, Possible Tunnel",
  'gb:bg': null,
  'gb:bb': null,
  'gb:bt': null,
  'gb:b6': null,
  'gb:ba': null,
  'gb:tb': null,
  'bb:gg': "IPv6 Only",
  'bb:gt': null,
  'bb:g6': null,
  'bb:ga': null,
  'bb:bg': null,
  'bb:bb': null,
  'bb:bt': null,
  'bb:b6': null,
  'bb:ba': null,
  'bb:tb': null,

  'gx:gg': "Dual Stack",
  'gx:gt': "IPv4 plus Teredo",
  'gx:g6': "6to4",
  'gx:ga': "Dual Stack, Possible Tunnel",

  'gx:bg': null, // Makes no sense using HTTPS
  'gx:bb': "IPv4 Only",
  'gx:bt': null, // Makes no sense using HTTPS
  'gx:b6': null, // Makes no sense using HTTPS
  'gx:ba': null, // Makes no sense using HTTPS

  'gx:tb': "IPv4, plus Broken IPv6",
  'bx:gg': "IPv6 Only",
  'bx:gt': null,
  'bx:g6': null,
  'bx:ga': null,
  'bx:bg': null,
  'bx:bb': null,
  'bx:bt': null,
  'bx:b6': null,
  'bx:ba': null,
  'bx:tb': null
};

GIGO.sym_helpdesk_qcode = {
  null: null,
  "Dual Stack": "46",
  "IPv4 plus Teredo": "4t",
  "6to4": "624",
  "Dual Stack, Possible Tunnel": "46t",
  "IPv4 Only": "4",
  "IPv4 Only (Teredo Detected)": "4",
  "NAT64": "64",
  "IPv4, plus Broken IPv6": "112",
  "NAT64, Possible Tunnel": "64t",
  "IPv6 Only": 6
};
