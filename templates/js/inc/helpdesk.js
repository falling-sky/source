/*global GIGO, Browser, unescape */
/*jslint browser: true */

// Call this early, to enable the isp helpdesk tab

//GIGO.list_of_ipv4 = ["a", "ds4", "test_ipv4"];
//GIGO.list_of_ipv6 = ["aaaa", "ds6", "test_ipv6","test_v6mtu"];


GIGO.start_helpdesk = function () {
    var want_helpdesk = 0;
    if (GIGO.CGI.isp) {
        want_helpdesk = 1;
    }
    if (GIGO.CGI.helpdesk) {
        want_helpdesk = 1;
    }
    if (String(location.pathname).match(/\b(isp|helpdesk)\b/i)) {
        want_helpdesk = 1;
    }
    if (String(location.hostname).match(/\b(isp|helpdesk)\b/i)) {
        want_helpdesk = 1;
    }
    if (String(location.hash).match(/^(isp|helpdesk)\$/i)) {
        want_helpdesk = 1;
    }

    if (want_helpdesk) {
        GIGO.tabnav("helpdesk");
    } else {
        $("#tabbutton_helpdesk_link").addClass("navright");
    }

};



GIGO.helpdesk_ob_status = function (n) {
    var s = GIGO.results.tests[n].status;
    if (s === "ok") return "g";
    if (s === "slow") return "g";
    if (s === "bad") return "b";
    if (s === "timeout") return "t";
    if (s === "skipped") return "x";
};
GIGO.helpdesk_ob_type = function () {
    //# global,bad,teredo,6to4,asn(different)
    var t = "b";
    if ((GIGO.results.ipv6) && (GIGO.results.ipv6.ip)) {
        t = "g"; // By default it must have a global address, right?
        if (GIGO.helpdesk.teredo) {
            t = "t"; // teredo
        }
        if (GIGO.helpdesk.sixfour) {
            t = "6"; // 6to4
        }
        if (GIGO.helpdesk.tunnel) {
            t = "a"; // Check the ASN
        }
    }
    return t;
};


GIGO.helpdesk_score = function () {
    var mini_helpdesk, score;

    // GIGO.results.tests[x].status
    var status_a = GIGO.helpdesk_ob_status("test_a");
    var status_ipv4 = GIGO.helpdesk_ob_status("test_ipv4");
    var status_aaaa = GIGO.helpdesk_ob_status("test_aaaa");
    var status_ipv6_type = GIGO.helpdesk_ob_type();

    var status = status_a + status_ipv4 + ":" + status_aaaa + status_ipv6_type;
    var ob = {};

    //console.log("helpdesk status code %o",status);

    ob.found = GIGO.sym_helpdesk[status];
    ob.qcode = GIGO.sym_helpdesk_qcode[ob.found];

    if (ob.found) {
        if (GIGO.helpdesk.failed_pmtud) {
            ob.found = ob.found + ", Potential MTU issues";
            ob.qcode = ob.qcode + ",mtu";
        }
        if (GIGO.helpdesk.mini_primary.match(/s/)) {
            ob.found = ob.found + ", Slow";
            ob.qcode = ob.qcode + ",slow";
        }
        return ob;
    }
    return;
};

GIGO.helpdesk_good_bad_slow = function (a) {
    var slow = 0;
    var good = 0;
    var tout = 0;
    var i = 0;
    for (i = 0; i < a.length; i = i + 1) {
        if (GIGO.results.tests[a[i]].status === "ok") {
            good = 1;
        }
        if (GIGO.results.tests[a[i]].status === "slow") {
            slow = 1;
        }
        if (GIGO.results.tests[a[i]].status === "timeout") {
            tout = 1;
        }
    }
    if (tout) return "Timeout";
    if (slow) return "Slow";
    if (good) return "Good";
    return "Bad";
};

GIGO.helpdesk_ipv4_info = function () {
    var test_a, test_asn4, s;
    test_a = GIGO.results.tests.test_a;
    test_asn4 = GIGO.results.tests.test_asn4;

    // status
    // ipinfo.ip
    // ipinfo.asn
    // ipinfo.asn_name
    // time_ms

    if ((test_a.ipinfo) && (test_a.ipinfo.ip)) {
        s = "IPv4: ";
        s = s + GIGO.helpdesk_good_bad_slow(["test_a", "test_ds4", "test_ipv4"]);
        if (test_asn4 && test_asn4.ipinfo && test_asn4.ipinfo.asn) {
            s = s + ", AS" + test_asn4.ipinfo.asn + " - ";
            s = s + test_asn4.ipinfo.asn_name;
        }
        return s;
    } else {
        return "IPv4: no";
    }
};

GIGO.helpdesk_ipv6_info = function () {
    var test_aaaa, test_asn6, s;
    test_aaaa = GIGO.results.tests.test_aaaa;
    test_asn6 = GIGO.results.tests.test_asn6;


    // status
    // ipinfo.ip
    // ipinfo.asn
    // ipinfo.asn_name
    // time_ms


    // We need to warn if any of the IPv6 tries timed out

    if ((test_aaaa.ipinfo) && (test_aaaa.ipinfo.ip)) {
        s = "IPv6: ";
        s = s + GIGO.helpdesk_good_bad_slow(["test_aaaa", "test_ds6", "test_ipv6", "test_v6mtu"]);
        if (test_asn6 && test_asn6.ipinfo && test_asn6.ipinfo.asn) {
            s = s + ", AS" + test_asn6.ipinfo.asn + " - ";
            s = s + test_asn6.ipinfo.asn_name;
        }
        return s;
    } else {

        if ((GIGO.results.tests.test_aaaa) && (GIGO.results.tests.test_aaaa.status) && (GIGO.results.tests.test_aaaa.status === "timeout")) {
            return "IPv6: broken";
        }
        if ((GIGO.results.tests.test_ds) && (GIGO.results.tests.test_ds.status) && (GIGO.results.tests.test_ds.status === "timeout")) {
            return "IPv6: broken";
        }
        if ((GIGO.results.tests.test_ipv6) && (GIGO.results.tests.test_ipv6.status) && (GIGO.results.tests.test_ipv6.status === "timeout")) {
            return "IPv6: broken";
        }
        return "IPv6: no";
    }
};


// call this late to populate the helpdesk tab
GIGO.finish_helpdesk = function () {
    var code, div;
    if (!GIGO.results.debug_code) {
        return; // Too soon.
    }

    // Show the replay url
    jQuery("#replayurldiv").show();

    code = GIGO.helpdesk_score();

    div = jQuery("<div>", {
        id: "helpdesk_content"
    });

    //  div.append("<div class=beta>BETA  -This tab is a work in progress.</div>");

    div.append(jQuery("<p>").append("{{Your Internet help desk may ask you for the information below.}}"));

    if ((code) && (code.qcode)) {
        div.append(jQuery("<p>").append(jQuery("<span class=helpdeskcode>").text("Help desk code: " + code.qcode)));
    }
    if ((code) && (code.found)) {
        div.append(jQuery("<p>").append(jQuery("<b>").text(code.found)));
    }

    // GIGO.results.ipv4 and ipv6, have our ASN info.

    //    div.append(jQuery("<div>").text(s));
    div.append(jQuery("<div>").text(GIGO.helpdesk_ipv4_info()));
    div.append(jQuery("<div>").text(GIGO.helpdesk_ipv6_info()));
    if (GIGO.helpdesk.other_sites && GIGO.helpdesk.other_sites.count) {
        div.append(jQuery("<div>").text(GIGO.other_sites_info()));
    }

    div.append("<div><p></p></div>"); // Space.
    if ((GIGO.results.ipv4) && (GIGO.results.ipv4.ip)) {
        div.append(jQuery("<div>").text("IPv4 address: " + GIGO.results.ipv4.ip));
    }
    if ((GIGO.results.ipv6) && (GIGO.results.ipv6.ip)) {
        div.append(jQuery("<div>").text("IPv6 address: " + GIGO.results.ipv6.ip));
    }
    div.append("<div><p></p></div>"); // Space.

    if (GIGO.helpdesk.other_sites) {
        div.append(GIGO.other_sites_failures());
    }


    //  IPv4: Good, AS1234, CableCo
    // IPv6: Good, Teredo, Not Preferred
    // OtherSites: 40/40 Good

    // IPv4 address: 192.0.2.1
    // IPv6 address: 2001:0c000:201::1


    $("#helpdesk_content").replaceWith(div);




    //     $("#helpdesk_content")

    // GIGO.results.tokens
    // GIGO.results.score_transition
    // GIGO.results.score_strict
    // GIGO.results.debug_code
    // GIGO.results.tokens_expanded
    // GIGO.results.mini_primary
    // GIGO.results.mini_secondary

    // This is meant to be ran several times; each time will replace
    // #helpdesk_content

    // First time replaced, will be before the "other sites" tab starts.
    // If we have IPV6, then it should say "checking other sites.."
    // And perhaps update only when done?

};
