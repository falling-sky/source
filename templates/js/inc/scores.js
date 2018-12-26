/*global GIGO */
/*jslint maxlen: 100 */
/* Stop bothering me about long lines */
/*jslint sub: true */
/* Stop bothering me about   "foo"] */

// Scores:
//   #1: Readiness for content providers to go IPv6
//   #2: Readiness for content providers to give up IPv4

// GREEN = success, green block with check mark
// RED = big caution symbol, red block
// BLUE = info symbol, blue block
// ORANGE = ? symbol

// TEXT is now in source/text/text.en-us  and similiar; to be compiled in at build time.
GIGO.scores = {
    "No Direct IP": [10, 10, "ORANGE"],
    "No Direct IPv4": [9, 10, "BLUE"],
    "No Direct IPv6": [10, 10, "BLUE"],
    "tls_warning": [10, 10, "BLUE"],
    "tls_beta": [10, 10, "BLUE"],
    "tls_available": [10, 10, "BLUE"],
    "6to4": [7, 7, "BLUE"],
    "teredo": [7, 7, "BLUE"],
    "teredo-v4pref": [10, 7, "BLUE"],
    "teredo-minimum": [10, 0, "BLUE"],
    "IPv6 MTU": [1, 1, "RED"],
    "confused:ASK": [0, 0, "ORANGE"],
    "confused:NOASK": [0, 0, "ORANGE"],
    "dualstack:ipv4_preferred": [10, 10, "GREEN"],
    "dualstack:ipv6_preferred": [10, 10, "GREEN"],
    "dualstack:slow": [7, 7, "BLUE"],
    "ipv4_only": [10, 0, "BLUE"],
    "ipv4_only:ds_good": [10, 0, "BLUE"],
    "ipv4_only:ds_slow": [5, 0, "RED"],
    "ipv4_only:ds_timeout": [5, 0, "RED"],
    "ipv4_slow": [5, 10, "RED"],
    "ipv6_only": [0, 10, "BLUE"],
    "ipv6_slow": [10, 5, "RED"],
    "ipv6_timeout": [10, 0, "RED"],
    "ipv6:nodns": [10, 0, "RED"],
    "broken_ipv6": [0, 0, "RED"],
    "webfilter:blocked": [-1, -1, "ORANGE"],
    "webfilter:dsboth": [10, 10, "ORANGE"],
    "webfilter:addons": [10, 10, "ORANGE"],
    "webfilter:firefox": [10, 10, "ORANGE"],
    "NAT64": [7, 10, "ORANGE"],
    "v6ns:ok": [10, 10, "GREEN"],
    "v6ns:bad": [10, 9, "BLUE"],
    "ip_timeout:firefox": [10, 10, "RED"],
    "confused:obbo": [10, 9, "BLUE"],
    "apple:dnsbug_aaaa": [10, 7, "BLUE"],
    "apple:dnsbug_ds": [10, 7, "BLUE"],
    "ipv4:no_address": [10, 10, "BLUE"],
    "ipv6:no_address": [10, 10, "RED"],
    "no_address": [10, 10, "RED"],
    "opera": [10, 10, "ORANGE"],
    "opera:turbo": [0, 0, "RED"],
    "dualstack:safe": [10, 10, "GREEN"],
    "needs_ipv6": [10, 10, "BLUE"],
    "dualstack:unsafe": [10, 10, "RED"],
    "dualstack:mtu": [10, 10, "RED"],
    "buggydns1": [9, 0, "RED"],
    "tunnel_dumb": [10, 10, "ORANGE"],
    "he_tunnel_dumb": [10, 10, "BLUE"],
    "tunnel_6rd_dumb": [10, 10, "BLUE"],
    "proxy_via": [10, 10, "ORANGE"],
    "proxy_via_dumb": [10, 10, "ORANGE"],
    "broken": [0, 0, "BLUE"],
    "avoids_ipv6": [10, 10, "ORANGE"],
    "ood": [10, 10, "RED"]
};
