/*global GIGO, MirrorConfig, jQuery,  window,  alert,  Browser */
/*jslint browser: true */
/*jslint regexp: true */


GIGO.prepare_fake = function () {
    var i, funcname, shortname;
    for (i = 0; i < GIGO.queue.length; i = i + 1) {
        funcname = GIGO.queue[i][2];
        shortname = funcname.replace(/^test_/, "");
        if (GIGO.CGI[shortname]) {
            GIGO.override = 1;
            GIGO.overrides[funcname] = GIGO.CGI[shortname];
            GIGO.use_queue = 1;
        }
    }
    if ((GIGO.isdef(GIGO.CGI.ip4)) || (GIGO.isdef(GIGO.CGI.ip6))) {
        GIGO.override = 1;
    }
};


GIGO.override_id = function (id, url) {
    var tests, this_test, parts, status, protocol, whichasn;
    tests = GIGO.results.tests; // Convenience
    if (!(tests.hasOwnProperty(id))) {
        tests[id] = {};
    }

    tests[id] = {};
    this_test = tests[id];
    this_test.url = url;
    this_test.start_time = GIGO.getms();
    this_test.ipinfo = {};

    GIGO.update_url(id);

    // TODO  copy from ipinfo
    parts = GIGO.overrides[id].split(/,/);

    // parts[0] = status
    // parts[1] = time
    // parts[2] = protocol

    // TODO I know this is totally gonna cause problems when the url is missing data
    status = parts[0];
    protocol = parts[2];
    if (!protocol) {
        if ((id === "test_aaaa") || (id === "test_ipv6") || (id === "test_v6mtu") || (id === "test_v6ns") || (id === "test_dsmtu") || (id === "test_ds")) {
            protocol = "ipv6";
        } else {
            protocol = "ipv4";
        }
    }
    // Is it abbreviated?
    if (protocol==="6" || protocol==="4") {
      protocol="ipv"+protocol;
    }

    whichasn = "test_asn" + protocol.replace(/^ipv/, "");

    if (status === "ok") {
        for (var key in tests[whichasn].ipinfo) {
            if (!key.match(/^asn/)) {
                this_test.ipinfo[key] = tests[whichasn].ipinfo[key];
            }
        }
        this_test.status = status;
        this_test.time_ms = parseInt(parts[1]) || 1;
    }
    if (status === "slow") {
        for (var key in tests[whichasn].ipinfo) {
            if (!key.match(/^asn/)) {
                this_test.ipinfo[key] = tests[whichasn].ipinfo[key];
            }
        }
        this_test.status = status;
        this_test.time_ms = parseInt(parts[1]) || (GIGO.slow + 1);
    }
    if (status === "bad") {
        this_test.ipinfo = {};
        this_test.status = status;
        this_test.time_ms = parseInt(parts[1]) || 1;
    }
    if (status === "timeout") {
        this_test.ipinfo = {};
        this_test.status = status;
        this_test.time_ms = parseInt(parts[1]) || (GIGO.max_time + 1);
    }
    if (status === "skipped") {
        this_test.ipinfo = {};
        this_test.status = status;
        this_test.time_ms = parseInt(parts[1]) || (0);
    }

    if (id === "test_ds") {
        // We need to populate test_ds4 and test_ds6  in much the same way that GIGO.test_type_json() does
        if (this_test.ipinfo.type === "ipv6") {
            tests.test_ds6 = {
                url: this_test.url,
                time_ms: this_test.time_ms,
                status: this_test.status
            };
            tests.test_ds4 = {
                url: this_test.url,
                time_ms: this_test.time_ms,
                status: "bad"
            };
        } else {
            tests.test_ds4 = {
                url: this_test.url,
                time_ms: this_test.time_ms,
                status: this_test.status
            };
            tests.test_ds6 = {
                url: this_test.url,
                time_ms: this_test.time_ms,
                status: "bad"
            };
        }
    }
    this_test.ipinfo.type=protocol;

};

GIGO.override_id_ip = function (id) {
    var tests, this_test, parts, status, protocol, whichasn;
    tests = GIGO.results.tests; // Convenience
    this_test = tests[id];
    if (!this_test) {
        return;
    }
    if (!this_test.ipinfo.type) {
        return;
    }
    whichasn = "test_asn" + this_test.ipinfo.type.replace(/^ipv/, "");

    this_test.ipinfo = {};


    for (var key in tests[whichasn].ipinfo) {
        if (!key.match(/^asn/)) {
            this_test.ipinfo[key] = tests[whichasn].ipinfo[key];
        }
    }
};
