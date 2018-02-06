/*global GIGO, MirrorConfig, jQuery,  Browser,  setTimeout,  alert, document */
/*jslint nomen: true */
/*jslint regexp: true */


GIGO.generate_share_link_entry = function (name, def) {
    var s, t, id, p;
    s = "";
    try {
        id = "test_" + name;
        t = GIGO.results.tests[id];
        if ((t.status === "ok") || (t.status === "slow")) {
            s = "&" + name + "=" + encodeURIComponent(t.status) + "," + encodeURIComponent(t.time_ms);
            p = t.ipinfo.type.replace(/^ipv/, "");
            s = s + "," + encodeURIComponent(p);
        }
        if ((t.status === "bad") || (t.status === "timeout")) {
            s = "&" + name + "=" + encodeURIComponent(t.status) + "," + encodeURIComponent(t.time_ms);
        }
    } catch (e) {
        noop = 1;
    }
    return s;
};



GIGO.generate_share_link = function () {
    var url;
    url = location.href.replace(/[?#].*$/,'') + "?";
    if (GIGO.results.ipv4.ip) {
        url = url + "ip4=" + encodeURIComponent(GIGO.results.ipv4.ip);
    } else {
        url = url + "ip4=";
    }
    if (GIGO.results.ipv6.ip) {
        url = url + "&ip6=" + encodeURIComponent(GIGO.results.ipv6.ip).replace(/%3a/ig, ":");
    } else {
        url = url + "&ip6=";
    }
    url = url + GIGO.generate_share_link_entry("a", "4");
    url = url + GIGO.generate_share_link_entry("aaaa", "6");
    url = url + GIGO.generate_share_link_entry("ds", "6");
    url = url + GIGO.generate_share_link_entry("ipv4", "4");
    url = url + GIGO.generate_share_link_entry("ipv6", "6");
    url = url + GIGO.generate_share_link_entry("v6mtu", "6");
    url = url + GIGO.generate_share_link_entry("v6ns", "6");
    url = url + GIGO.generate_share_link_entry("dsmtu", "6");


    // Working/Failed sites
    if (GIGO.isdef(GIGO.failed_sites)) {
        url = url + "&failed_sites=" + GIGO.failed_sites.join(",");
    }

    return url;
};


GIGO.show_share_link = function () {
    var url, a, t, te;
    url = GIGO.generate_share_link();
    a = jQuery("<a>");

    t = jQuery("<p>");
    t.text(url);
    te = t.html();
    te = te.replace(/&amp;/g, "<wbr>&amp;");
    a.html(te);
    a.attr("href", url);
    a.attr("target", "_blank");
    d = jQuery("<p id=replayurl>").append(a);
    jQuery("#replayurl").replaceWith(d);
};

GIGO.show_debug = function () {
    var s, url;

    s = GIGO._dumpObj(GIGO.results.tests, "GIGO.results.tests.", "  ", 0);
    s = jQuery('<div/>').text(s).html();
    jQuery("#debug_dump").html("<pre>" + s + "</pre>");

    GIGO.show_share_link();
};


// Some of our substitutions are expensive to compute.
// Let's just do it once.
GIGO.substitutions = {};
GIGO.substitutions.HTTPS = '<a href="' + "https://" +  document.location.hostname + document.location.pathname + '">HTTPS</a>';


// Return a table with left side colored and with a symbol; right side, informative text.
GIGO.results_table_wrapper = function (color, text) {
    var table;
    color = color.toLowerCase();

    // Things we will do as substitutions
    text = text.replace("%HTTPS",GIGO.substitutions.HTTPS);

    table = "";
    table = "<table class=\"results_wrapper\">";
    table = table + "<tr>";

    table = table + "<td class=\"results_left\"><p style=\"margin: 0;\">";

    switch (color) {
    case "green":
        table = table + '<img style="height: 2em; width: auto;" src="/images/hires_ok.png"/>';
        break;
    case "red":
        table = table + '<img style="height: 2em; width: auto;" src="/images/hires_bad.png"/>';
        break;
    case "blue":
        table = table + '<img style="height: 2em; width: auto;" src="/images/hires_info.png"/>';
        break;
    case "orange":
        table = table + '<img style="height: 2em; width: auto;" src="/images/hires_attention.png"/>';
        break;
    default:
        table = table + "&nbsp;";
        break;
    }

    table = table + "</p></td>";

    table = table + "<td class=\"results_right\">" + text + "</td>";
    table = table + "</tr></table>";

    return table;
};


GIGO.showdebug = function () {
    jQuery("#debuglink").show();
    GIGO.tabnav("debug");
};

GIGO.start_sites = function () {
    var t, moreinfo, link, table;
    jQuery("#siteslink").show();
    GIGO.test_sites(2);
    t = "{{Since you have IPv6, we are including a tab that shows how well you can reach other IPv6 sites.  %sites}}";
    moreinfo = "{{[more info]}}";

    link = '<a href="#" class="help_popup" onclick="return GIGO.tabnav(\'sites\');">' + moreinfo + '</a>';

    t = t.replace(/%sites/, link);
    table = GIGO.results_table_wrapper("blue", t);
    jQuery("#results_eof").before(table);
};


GIGO.update_ip = function (id) {
    // G = the GIGO object
    var s, ipinfo, escaped, name;

    ipinfo = GIGO.results.tests[id].ipinfo;


    GIGO.show_debug();
    if (GIGO.results.ipv4.ip !== "") {
        s = "{{Your IPv4 address on the public Internet appears to be}}" + " " + GIGO.results.ipv4.ip;
        if (GIGO.results.ipv4.subtype) {
            s = s + " (" + GIGO.results.ipv4.subtype + ")";
        }
        if (GIGO.results.ipv4.via) {
            s = s + "<br/>" + "{{Proxied}}" + ", <code>" + jQuery('<div/>').text("Via: " + GIGO.results.ipv4.via).html() + "</code>";
        }

        if ((GIGO.results.ipv4.asn_name) && (GIGO.results.ipv6.asn_name) && (GIGO.results.ipv4.asn_name !== GIGO.results.ipv6.asn_name)) {
            escaped = jQuery('<div/>').text(GIGO.results.ipv4.asn_name).html();
            s = s + "<br/>(" + escaped + ")";
            jQuery("#your_isp").html("");
        }

        s = GIGO.results_table_wrapper("blue", s);
        jQuery("#your_ipv4").html(s);
    }
    if (GIGO.results.ipv6.ip !== "") {
        s = "{{Your IPv6 address on the public Internet appears to be}}" + " " + GIGO.results.ipv6.ip;
        if (GIGO.results.ipv6.subtype) {
            s = s + "<br/>" + "{{Your IPv6 service appears to be}}" + ": " + GIGO.results.ipv6.subtype;
        }
        if (GIGO.results.ipv6.via) {
            s = s + "<br/>" + "{{Proxied}}" + ", <code>" + jQuery('<div/>').text("Via: " + GIGO.results.ipv6.via).html() + "</code>";
        }
        if ((GIGO.results.ipv4.asn_name) && (GIGO.results.ipv6.asn_name) && (GIGO.results.ipv4.asn_name !== GIGO.results.ipv6.asn_name)) {
            escaped = jQuery('<div/>').text(GIGO.results.ipv6.asn_name).html();
            s = s + "<br/>(" + escaped + ")";
            jQuery("#your_isp").html("");
        }
        s = GIGO.results_table_wrapper("blue", s);
        jQuery("#your_ipv6").html(s);
    }

    if (
        ((GIGO.results.ipv4.asn_name) && (GIGO.results.ipv6.asn_name) && (GIGO.results.ipv4.asn_name === GIGO.results.ipv6.asn_name)) || (GIGO.results.ipv4.asn_name && (!GIGO.results.ipv6.asn_name)) || (GIGO.results.ipv6.asn_name && (!GIGO.results.ipv4.asn_name))
    ) {
        name = GIGO.results.ipv4.asn_name || GIGO.results.ipv6.asn_name;
        escaped = jQuery('<div/>').text(name).html();
        s = "{{Your Internet Service Provider (ISP) appears to be}}" + " " + escaped;
        s = GIGO.results_table_wrapper("blue", s);
        jQuery("#your_isp").html(s);
    }




};


GIGO.update_status = function (id) {
    // G = the GIGO object
    // url = the URL we just received
    // id = the update we just received (ie, "test_a", "test_aaaa")
    // ipinfo.ip  = text form of ip;  ipinfo.type = "ipv4" or "ipv6";  ipinfo.subtype MAY say "Teredo" or "6to4"
    var status, status_translated, time_ms, ipinfo, content, url, proxied;
    status = GIGO.results.tests[id].status; // This should be ok/bad/slow/timeout
    status_translated = GIGO.messages[status];
    time_ms = GIGO.results.tests[id].time_ms; // This should be number of milliseconds spent
    ipinfo = GIGO.results.tests[id].ipinfo; // This may be "undef"
    url = GIGO.results.tests[id].url;

    if (!time_ms) {
        content = "{{Started}}";

    } else if (GIGO.isdef(ipinfo)) {
        // TODO: Localize number formats
        proxied = "";
        if (ipinfo.via) {
            proxied = " " + "{{proxied}}" + " ";
        }



        content = "<span class=status_" + status + ">" + status_translated + "</span> " + "(" + (time_ms / 1000.0).toFixed(3) + "s) " + "{{using}}" + " " + proxied + ipinfo.type;
        if (ipinfo.subtype) {
            content = content + " " + ipinfo.subtype;
        }
        if (ipinfo.asn) {
            content = content + " ASN " + ipinfo.asn;
        }
    } else {
        // TODO: Localize number formats
        content = "<span class=status_" + status + ">" + status_translated + "</span> " + "(" + (time_ms / 1000.0).toFixed(3) + "s)";
    }

    jQuery("#" + id).html(content);
    jQuery("#sum_" + id).html(content);
};

GIGO.update_url = function (id) {
    var url, showurl, res;
    url = GIGO.results.tests[id].url;
    showurl = url.replace(/fill=xxxx*/, "fill=xxx...xxx"); // Obscene to show a nearly 2k url
    showurl = showurl.replace(/&testdomain=[^&]+&testname=[^&]+/,""); // Also remove the test name and test domain
    showurl = showurl.replace(/(gif|png|jpg)\?$/i,"$1"); // hmm
    res = id.replace(/test_/, "results_"); // Deterine which span to show this in
    jQuery("#" + res).html("<a id=url href='" + url + "'>" + showurl + " </a>");
};

GIGO.browser_tweaks = function (G) {
    // Finish setting up the contact form
    if (Browser.Platform.win) {
        jQuery("#help_windows").show();
    } else if (Browser.Platform.linux) {
        jQuery("#help_linux").show();
    } else {
        jQuery("#help_generic").show();
    }
};

GIGO.update_progress = function (G) {
    // G = the GIGO object
    // Now a spinner or "throbber" instead;
    // indicates how many tests have finished.
    // Prelude to being more flexible on dynamically adding tests.
    // Implements a progress bar
    // Based on:
    //     G.queue.length  - number of tests we have left to start
    //     G.dequeued.length - number of tests we started already
    //     G.tests_finished - number of tests completed (good or bad)
    //     G.retry_max     - maximum number of retries
    //     G.start_time    - time test started
    //     G.retry_until   - the point we stop running new tests
    // pct1 : percent done based on number of tests ran
    var sofar, outof;

    sofar = G.tests_finished;
    outof = G.queue.length + G.dequeued.length;

    jQuery(".pb1_text").html(" " + sofar + "/" + outof + " " + "{{tests run}}");
    if (sofar === outof) {
        jQuery("#progress_bar").hide();
        jQuery("#progress_bar").html("");
    }

};

GIGO.send_survey_global = function (tokens) {
  // Only if we are in transparent mode..
  if (MirrorConfig.orig_options) {
    if (MirrorConfig.options.survey !== MirrorConfig.orig_options.survey  ||
     MirrorConfig.options.userdata !== MirrorConfig.orig_options.userdata ) {
        MirrorConfig.options.survey = MirrorConfig.orig_options.survey;
        MirrorConfig.options.userdata =  MirrorConfig.orig_options.userdata;
        GIGO.send_survey(tokens);
     }
  }
};


GIGO.send_survey = function (tokens) {

    var url = MirrorConfig.options.survey;
    if (!url) {
        return;
    }

    if (MirrorConfig.options.userdata) {
        // We're going to completely override "url"
        if (GIGO.results.ipv4.ip) {
            url = GIGO.protocol + "ipv4." + MirrorConfig.options.userdata + MirrorConfig.options.survey;
        } else {
            url = GIGO.protocol + "ipv6." + MirrorConfig.options.userdata + MirrorConfig.options.survey;
        }
    }


    if (GIGO.is_replay()) {
       return;
    }

    if (GIGO.override) {
        jQuery("#survey").html("{{(Survey posting skipped; test was rigged)}}");
        return;
    }


    tokens = tokens.join(",");
    url += "?x&" + GIGO.cgistats("a") + GIGO.cgistats("aaaa") + GIGO.cgistats("ds4") + GIGO.cgistats("ds6") + GIGO.cgistats("ipv4") + GIGO.cgistats("ipv6") + GIGO.cgistats("v6ns") + GIGO.cgistats("dsmtu") + GIGO.cgistats("v6mtu") + "&tokens=" + encodeURI(tokens) + "&rand=" + Math.floor(Math.random() * 2000000000);

    if (MirrorConfig.options.survey_ip) {
        if (GIGO.results.ipv4.ip) {
            url += "&ip4="+GIGO.results.ipv4.ip;
        } else {
            url += "&ip4=";
        }
        if (GIGO.results.ipv6.ip) {
            url += "&ip6="+GIGO.results.ipv6.ip;
        } else {
            url += "&ip6=";
        }
    } else {
        if (GIGO.results.ipv4.ip) {
            url += "&ip4=a29";
        } else {
            url += "&ip4=";
        }

        if (GIGO.results.ipv6.ip) {
            url += "&ip6=a29";
        } else {
            url += "&ip6=";
        }
    }
    url += "&load=" + encodeURI(MirrorConfig.load.domain);


    url += "&ip6subtype=" + encodeURI(GIGO.results.ipv6.subtype);
    url += "&callback=?";


    jQuery("#survey").html("{{(Updating server side IPv6 readiness stats)}}");


    jQuery.jsonp({
        "url": url,
        "cache": true,
        "pageCache": false,
        "timeout": GIGO.max_time,

        "success": function (stuff) {
            jQuery("#survey").html("{{(Updated server side IPv6 readiness stats)}}");
        },
        "error": function (d, msg) {
            jQuery("#survey").html("{{(Survey posting failed; the above information is accurate, but not recorded.)}}" + " " + url);
        }
    });

};

GIGO.gen_help_link = function (token) {
    var page, title, code;
    // GIGO.gettext_messages.messages_popups has the urls and translated titles
    code = "";
    if (GIGO.messages_popups.hasOwnProperty(token)) {
        page = GIGO.messages_popups[token][0];
        title = GIGO.messages_popups[token][1];
        code = "<a href=\"#\" onclick=\"GIGO.help_popup('" + page + "','" + title + "'); return false;\" class=\"help_popup\">" + "{{[more info]}}" + "</a>";
    }
    return code;
};

GIGO.testing_ipv4 = function () {
    var s;
    s = String(location.hostname);
    return (s.match(/ipv4/i) || s.match(/testv4/i) || s.match(/test-v4/i));
};


GIGO.show_results = function () {
    var tokens_hash, i, table, token_expanded, help, s4, s6, sid4, sid6;



    // GIGO.dumpObj(this); // requires popups enabled
    // Check for some specific issues; and possibly either show
    // extra content panels (already in the HTML)  and/or
    // highlight our contact form.
    tokens_hash = GIGO.oc(GIGO.results.tokens);
    if (tokens_hash.hasOwnProperty("Unliklely")) {
        GIGO.contact_wanted = 1;
        jQuery("#help_plugins").show(); // Encourage more feedback.
    }
    if (tokens_hash.hasOwnProperty("confused:ASK")) {
        if (MirrorConfig.options.comment) {
              GIGO.contact_wanted = 1;
              jQuery("#help_plugins").show(); // Encourage more feedback.
        }
    }
    if (tokens_hash.hasOwnProperty("webfilter:dsboth")) {
        jQuery("#help_plugins").show(); // Less encouraging of soliciting comments on this one.
    }
    if (tokens_hash.hasOwnProperty("webfilter:blocked")) {
        jQuery("#help_plugins").show(); // Less encouraging of soliciting comments on this one.
    }

    GIGO.check_versions(); // Check OS, Browser, etc
    // Show the results to the user
    for (i = 0; i < GIGO.results.tokens_expanded.length; i = i + 1) {
        token_expanded = GIGO.results.tokens_expanded[i];
        if (token_expanded.text !== "-") {

            help = GIGO.gen_help_link(token_expanded.token);
            if (help) {
                token_expanded.text = token_expanded.text + " " + help;
            }

            // token_expanded.token
            // token_expanded.color
            // token_expanded.text

            table = GIGO.results_table_wrapper(token_expanded.color, token_expanded.text);
            jQuery("#results_eof").before(table);
        }
    }
    console.log("GIGO.results.tokens=%o",GIGO.results.tokens);



    // Show summary table.  TODO: Make this even simpler for people.
    s4 = " " + GIGO.results.score_transition + "/10";
    sid4 = "score" + GIGO.results.score_transition;
    s6 = " " + GIGO.results.score_strict + "/10";
    sid6 = "score" + GIGO.results.score_strict;

    if (GIGO.results.score_transition === -1) {
        s4 = "n/a";
        sid4 = "score0";
    }
    if (GIGO.results.score_strict === -1) {
        s6 = "n/a";
        sid6 = "score0";
    }

    table = "<div id=\"debugtable\"><table width=100%><tr><th colspan=2>" + "{{Your readiness score}}" + "</th></tr>";
    if (GIGO.testing_ipv4(GIGO.results.score_transition)) {
        table += "<tr><td><span id=" + sid4 + ">" + s4 + "</span></td><td>" + "{{for your IPv4 stability and readiness, when publishers offer both IPv4 and IPv6}}" + "</td></tr>";
    }
    table += "<tr><td><span id=" + sid6 + ">" + s6 + "</span></td><td>" + "{{for your IPv6 stability and readiness, when publishers are forced to go IPv6 only}}" + "</td></tr>";
    table += "</table></div>";
    table += "<div class='next'><p>" + "{{Click to see}}" + " <a href=\"#\" class=\"tabbutton_tests\"  onclick='return GIGO.tabnav(\"tests\")'>" + "{{Test Data}}" + "</a></p></div>";
    jQuery("#results_eof").before(table);


    // Update specific fields in above table.
    jQuery("[name=score_transition]").val(GIGO.results.score_transition);
    jQuery("[name=score_strict]").val(GIGO.results.score_strict);

    //
    // jQuery("#results_eof").before("<div class=\"small\">" + GIGO.results.tokens.join(",") + "</div>");
    //

    GIGO.show_faq_link(GIGO.results.tokens);

    if ((GIGO.results.score_transition === "?") || (GIGO.results.score_transition > 10) || (GIGO.contact_wanted)) {
        // I really want to talk to them.
        if (MirrorConfig.options.comment) {
          // But not if they are from places with known problems.
          // China
          if (!GIGO.isUnreliable()) {
            GIGO.showform();
          }
        }
    }
};

GIGO.show_faq_link = function (tokens) {
    var html, faqs, page, title, linktext, m;

    if (/ipv4_only/.test(tokens)) {
      page = "faq_ipv4_only.html";
    }
    if (/broken/.test(tokens)) {
      page = "broken.html";
    }

console.log("show_faq_link: page=%o",page);

    if (page) {
        jQuery("#comments_unwanted").hide();
        jQuery("#comments_faq").show();

        title = "{{Your FAQ}}";
        linktext = "{{Frequently Asked Questions}}";

        //        handle = GIGO.help_popup(page, title, 0); // Don't auto-switch to this
        html = '<a href="#" onclick="return GIGO.help_popup(\'' + page + '\', \'' + title + '\');">' + linktext + '</a>';


        m = jQuery("#comments_faq_link");
        m.html(html);

    }
};




GIGO.help_popup = function (file, tabname, popup) {

    var o, handle, t, hostname, lfile;
    if (popup === undefined) {
        popup = 1;
    }
    o = GIGO.newtab(file, tabname, popup);
    handle = "#tab_" + o.handle;

    if (popup) {
        GIGO.tabnav(o.handle);
    }

    if (!o.loaded) {
        o.loaded = 1;

        // Because we are doing bad things with base hrefs, we must
        // force the help popups to show the original, user-entered
        // hostname (instead of the 'current server');  This is to
        // avoid cross-domain problems.
        file = GIGO.protocol  + String(document.location.hostname) + "/" + file;
        lfile = file + '.{{locale}}';


        jQuery(handle).html("{{loading...}}"); // Loading indicator.
        jQuery(handle).load(lfile + " #content", function (responseText, textStatus) {
            if (textStatus !== 'success') {
                jQuery(handle).html("{{failed to load}}" + " " + lfile);
            }
            t = "<p>";
            t = t + "<a href='#' onclick='return GIGO.goback()' class='goback'>";
            t = t + "{{[go back]}}" + "</a> ";
            t = t + "<a target='_blank' href='" + file + "' class='permalink'>";
            t = t + "{{[permalink]}}" + "</a> ";
            t = t + "</p>";

            jQuery(handle).append(t);
        });
        if (!popup) {
            jQuery(handle).hide();
        }
    }
    return (o.handle);
};
