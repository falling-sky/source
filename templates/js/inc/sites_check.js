/*global GIGO, jQuery, $, window, alert, Browser */
/*jslint browser: true */


/* Need to vary this a bit.

Each host should:

  try IPv4.
  try IPv4 again, if needed.
  On success,

    try IPv6.
    try IPv6 again, if needed.

The icky part is the "if needed".

*/



GIGO.url_to_hash = function (url) {
    var hash;
    url = url.replace(/\?nocache.*$/, "");
    hash = jQuery.md5(url);
    hash = hash.replace(/[^a-zA-Z0-9]/g, '');
    hash = hash.substring(0, 4);
    return hash;
};

GIGO.fail_url = function (url) {
    var hash = GIGO.url_to_hash(url);


    // Create object, if needed.
    if (!GIGO.isdef(GIGO.failed_sites)) {
        GIGO.failed_sites = [];
    }

    // Add hash, but only if not already found
    if (GIGO.failed_sites.indexOf(hash) < 0) {
        GIGO.failed_sites.push(hash);
    }
    GIGO.show_share_link();
};

GIGO.was_failed_url = function (url) {
    var hash = GIGO.url_to_hash(url);
    if (!GIGO.isdef(GIGO.failed_sites)) {
        if (GIGO.isdef(GIGO.CGI.failed_sites)) {
          GIGO.failed_sites = GIGO.CGI.failed_sites.split(",");
        } else {
          GIGO.failed_sites = [];
        }
    }
    return (GIGO.failed_sites.indexOf(hash) >= 0);
};


GIGO.is_replay = function () {
    return (GIGO.CGI.ip4 || GIGO.CGI.ip6);
};



GIGO.sites_table_init_1 = function (mode) {
    //  Create a table, replace #sitestablediv
    //  THIS IS FOR MIRRORS
    var newhtml;
    newhtml = '<div id="sitestablediv">';
    newhtml = newhtml + '<table summary="sites" id="sites" class="tablesorter">';
    newhtml = newhtml + "<thead><tr><th>link</th><th>location</th><th>provider</th><th>ipv6?</th><th>info</th></tr></thead>";
    newhtml = newhtml + "<tbody>";
    newhtml = newhtml + "</tbody></table>";
    newhtml = newhtml + "</div>";

    // Make a table, keep the reference?
    jQuery("#sitestablediv").replaceWith($('<div>').html(newhtml));
};

GIGO.sites_table_init_2 = function (mode) {
    //  Create a table, replace #sitestablediv
    //  THIS IS FOR MIRRORS+SITES, NO LANGUAGE INFO ETC
    var newhtml;
    newhtml = '<div id="sitestablediv">';
    newhtml = newhtml + '<table summary="sites" id="sites" class="tablesorter">';
    newhtml = newhtml + "<thead><tr><th>link</th><th>location</th><th>provider</th><th>ipv6?</th><th>info</th><th>mirror</th></tr></thead>";
    newhtml = newhtml + "<tbody>";
    newhtml = newhtml + "</tbody></table>";
    newhtml = newhtml + "</div>";

    // Make a table, keep the reference?
    jQuery("#sitestablediv").replaceWith($('<div>').html(newhtml));
};

GIGO.sites_table_init = function (mode) {
    if (mode === 1) {
        GIGO.sites_table_init_1(mode);
    } else if (mode === 2) {
        GIGO.sites_table_init_2(mode);
    } else {
        alert("bad GIGO.sites_table_init()");
    }
};


GIGO.sites_table_populate_1 = function (mode) {
    var i;
    for (i = 0; i < GIGO.sites_queue.length; i = i + 1) {
        GIGO.sites_display_add_record(GIGO.sites_queue[i], mode);
    }


    $("#sites").tablesorter({
        textExtraction: "complex",
        sortInitialOrder: "asc",
        headers: {
            0: {
                sorter: "text"
            },
            1: {
                sorter: "text"
            },
            2: {
                sorter: "text"
            },
            3: {
                sorter: "text"
            },
            4: {
                sorter: "text"
            },
            5: {
                sorter: false
            },
            6: {
                sorter: false
            }
        }
    });

};

GIGO.sites_table_populate_2 = function (mode) {
    var i;
    for (i = 0; i < GIGO.sites_queue.length; i = i + 1) {
        GIGO.sites_display_add_record(GIGO.sites_queue[i], mode);
    }


    $("#sites").tablesorter({
        textExtraction: "complex",
        sortInitialOrder: "asc",
        headers: {
            0: {
                sorter: "text"
            },
            1: {
                sorter: "text"
            },
            2: {
                sorter: "text"
            },
            3: {
                sorter: false
            },
            4: {
                sorter: false
            }
        }
    });

};

GIGO.sites_table_populate = function (mode) {
    if (mode === 1) {
        GIGO.sites_table_populate_1(mode);
    } else if (mode === 2) {
        GIGO.sites_table_populate_2(mode);
    } else {
        alert("bad GIGO.sites_table_populate()");
    }
};



GIGO.sites_init = function () {
    GIGO.sites_queue = [];
};

GIGO.sites_queue_entry = function (r) {

    if (!r.v4) {
        r.v4 = "http://ipv4." + r.site + "/images-nc/hires_ok.png";
    }
    if (!r.v6) {
        r.v6 = "http://ipv6." + r.site + "/images-nc/hires_ok.png";
    }

    // Do we have a suitable protocol?
    // Shrink the list, if that is what it takes.
    if (GIGO.protocol==="https://") {
      // Be a bit more strict.
      if (!r.v4.startsWith("https://") || !r.v6.startsWith("https://")) {
        console.log("GIGO.sites_queue_entry skipping %o due to https",r);
        return; // When viewing as https, we require all images being tested also be https
      }
    }


    // Mark up r.v4 for site analytics
    if (r.v4.search(/\?/)<0) {
      r.v4 = r.v4 + "?";
    }
    if (r.v6.search(/\?/)<0) {
      r.v6 = r.v6 + "?";
    }

    // This might actually fail; the mirrors page does
    // not load GIGO.options.domain .
    try {
      r.v4 = r.v4 + "&testdomain=" + GIGO.options.domain;
      r.v6 = r.v6 + "&testdomain=" + GIGO.options.domain;
    } catch (e) {
      r.v4 = r.v4 + "&testdomain=" + document.location.hostname;
      r.v6 = r.v6 + "&testdomain=" + document.location.hostname;
    }

    r.v4 = r.v4 + "&testname=sites";
    r.v6 = r.v6 + "&testname=sites";

    GIGO.sites_queue.push(r);
};

GIGO.sites_queue_all = function (mode) {
    var r, siteName;

    console.log("in GIGO.sites_queue_all, GIGO.sites_parsed=%o",GIGO.sites_parsed);
    // mirrors only if mode=1
    // all sites if mode=2
    for (siteName in GIGO.sites_parsed) {
      r = GIGO.sites_parsed[siteName];
      if (mode === 1) {
        if (! r.mirror) continue;
      }
      GIGO.sites_queue_entry(r);
    }

};

GIGO.sites_prepare_helpdesk = function (mode) {
    GIGO.helpdesk.other_sites = {};
    GIGO.helpdesk.other_sites.finished = 0;
    GIGO.helpdesk.other_sites.count = 0;
    GIGO.helpdesk.other_sites.good = [];
    GIGO.helpdesk.other_sites.bad = [];
    if (mode > 1) {
        GIGO.helpdesk.other_sites.count = GIGO.sites_queue.length;
    }

};

GIGO.other_sites_info = function () {
    var g, b, f, c, o, text;
    g = GIGO.helpdesk.other_sites.good.length;
    b = GIGO.helpdesk.other_sites.bad.length;
    f = GIGO.helpdesk.other_sites.finished;
    c = GIGO.helpdesk.other_sites.count;
    o = g + b;
    text = "";

    if (!c) {
        return "";
    }

    if (f != c) {
        text = "(Global IPv6 connectivity being tested; " + f + "/" + c + ")";
        // text = text + "b=" + b + " g=" + g + " f=" + f + " c=" + c + " o=" + o + "";
        return text;
    }


    text = "OtherSites: " + g + "/" + o + " good";
    if (b) {
        text = text + ", " + b + "/" + o + " bad";
    }


    return text;
};

GIGO.other_sites_failures = function () {
    var div, table, i;
    if (!GIGO.helpdesk.other_sites.bad.length) {
        return jQuery("<div>"); // morally, "nothing to show"
    }
    div = jQuery("<div>");
    div.append(jQuery("<p><span style='color: red'>Site(s) with failed connectivity</p>"));
    table = jQuery("<table>");
    table.append(jQuery("<tr><td>Site</td><td>Failed URL</td></tr>"));
    for (i = 0; i < GIGO.helpdesk.other_sites.bad.length; i = i + 1) {
        table.append(GIGO.sites_display_bad_r_to_tr(GIGO.helpdesk.other_sites.bad[i]));
    }
    div.append(table);
    return div;
};

GIGO.sites_display_bad_r_to_tr = function (r) {
    var tr, a, parts;
    // r.site;
    // r.loc
    // r.provider
    // r.v6
    tr = jQuery("<tr>");

    parts = r.v6.split("/");

    tr.append(jQuery("<td>").text(parts[0]));

    a = jQuery("<a>");
    a.text(r.v6);
    a.attr("href", r.v6);
    a.attr("target", "_blank");

    tr.append(jQuery("<td>").append(a));
    return tr;

};

GIGO.sites_display_td_provider_div_update = function (r) {
    var i, td_provider_div;
    td_provider_div = r.refs.td_provider_div;
    td_provider_div.text(r.provider);
    for (i in arguments) {
        if (i > 0) {
            td_provider_div.append("<br/>");
            td_provider_div.append(arguments[i]);
        }
    }
};

GIGO.sites_display_add_record = function (r, mode) {
    // Create new table row
    // Append it to existing table
    // Make sure that the row elements are easy to find by id
    var tr, td_link, td_loc, td_provider, td_status, td_info, td_mirror, mirror_button, site, td_provider_div;


    site = $("<a>", {
        text: r.site,
        href: "http://" + r.site,
        target: r.site
    });
    tr = $('<tr></tr>'); // Don't use .hide here.  Instead, lets show the table.  Only .hide() on failure?
    td_link = $("<td>").append(site);
    td_loc = $("<td>").text(r.loc);
    td_provider_div = $("<div>").text(r.provider);
    td_provider = $("<td>").append(td_provider_div);

    td_status = $("<td>").append(
        $("<img>", { src: "/images/hires_spinner.gif"})
        .css("height","2em")
        .css("width","auto")
        .css("opacity", "0.1")
        .css("filter", "alpha(opacity=10)")
      );
    td_info = $("<td>").append($("<img>", {
        src: "/images/hires_info.png"
    }).css("height","2em").css("width","auto"));



    td_info.click(function () {
        GIGO.sites_display_td_provider_div_update(r, $("<a>", {
            text: r.v4,
            href: r.v4,
            target: "_blank"
        }), $("<a>", {
            text: r.v6,
            href: r.v6,
            target: "_blank"
        }));
    });

    if ((mode === 2) && (r.mirror)) {

        // This should be done with jquery to avoid any potential abuse in mirrors.js, but
        // I can't find the right incantation.
        mirror_button = $("<a target='" + r.site + "' href='http://" + r.site + "'><img border=0 style='height: 2em; width: auto;' src='/images/hires_link.png'/></a>");
        td_mirror = $("<td>").append(mirror_button);
    } else {
        td_mirror = $("<td>").html("&nbsp;");
    }




    if (mode === 1) {
        tr.append(td_link, td_loc, td_provider, td_status, td_info);
    } else if (mode === 2) {
        tr.append(td_link, td_loc, td_provider, td_status, td_info, td_mirror);
    } else {
        return; // We should have had plenty of alerts already.
    }

    $('#sites > tbody:last').append(tr);
    $('#sites').find('tbody:last').append(tr);



    // Copy references to "r" object.
    r.refs = {};
    r.refs.tr = tr;
    r.refs.td_link = td_link;
    r.refs.td_loc = td_loc;
    r.refs.td_provider = td_provider;
    r.refs.td_provider_div = td_provider_div;
    r.refs.td_status = td_status;
    r.refs.td_info = td_info;
    r.refs.td_mirror = td_mirror;
};

GIGO.sites_display_success = function (r) {
    var new_td;
    new_td = $("<td>").append($("<img>", {
        src: "/images/hires_ok.png"
    }).css("height","2em").css("width","auto"));
    r.refs.td_status.replaceWith(new_td);
    GIGO.helpdesk.other_sites.finished = GIGO.helpdesk.other_sites.finished + 1;
    GIGO.helpdesk.other_sites.good.push(r);
    GIGO.sites_update_helpdesk();
};
GIGO.sites_display_failure = function (r) {
    var new_td;
    new_td = $("<td>").append($("<img>", {
        src: "/images/hires_bad.png"
    }).css("height","2em").css("width","auto"));
    r.refs.td_status.replaceWith(new_td);
    GIGO.helpdesk.other_sites.finished = GIGO.helpdesk.other_sites.finished + 1;
    GIGO.helpdesk.other_sites.bad.push(r);
    GIGO.sites_update_helpdesk();
};

GIGO.sites_display_giveup = function (r) {
    var new_td;
    new_td = $("<td>").append($("<img>", {
        src: "/images/hires_offline.png"
    }).css("height","2em").css("width","auto"));
    r.refs.td_status.replaceWith(new_td);
    GIGO.sites_display_td_provider_div_update(r, "IPv4 site down, skipping IPv6 test");
    GIGO.helpdesk.other_sites.finished = GIGO.helpdesk.other_sites.finished + 1;
    GIGO.sites_update_helpdesk();
};

GIGO.sites_update_helpdesk = function () {
    if (GIGO.helpdesk.other_sites.count) {
        GIGO.finish_helpdesk();
    }
};


GIGO.sites_start_ipv6_take2 = function (r) {
    var url, img, img_pending;

    if (!r.v6) {
        return;
    }

    url = r.v6 + "?nocache=" + Math.random();


    if (GIGO.is_replay()) {
        img_pending = 0;
        if (GIGO.was_failed_url(url)) {
            GIGO.fail_url(url);
            GIGO.sites_display_failure(r);
        } else {
            GIGO.sites_display_success(r);
        }
        GIGO.sites_next_in_queue();
        return;
    }

    setTimeout(function () {

        // We have all the details we need to know.
        // We have a freshly incremented "id".
        // What we need now is to start an image
        // with handlers on it.
        // Finalize the URL.
        // Include a random number to defeat the browser cache.

        // Create the image object.
        // We will keep this "off screen".
        img = jQuery('<img style="display:none" />');
        img_pending = 1;


        jQuery(img).bind({
            load: function () {
                if (img_pending) {
                    img_pending = 0;
                    GIGO.sites_display_success(r);
                    GIGO.sites_next_in_queue();
                }
            },
            error: function () {
                if (img_pending) {
                    img_pending = 0;
                    GIGO.fail_url(url);
                    GIGO.sites_display_failure(r);
                    GIGO.sites_next_in_queue();
                }
            }
        });
        // Fake timeout here since IE doesn't pass errors
        setTimeout(function () {
            // TODO show FAIL
            if (img_pending) {
                img_pending = 0;
                GIGO.fail_url(url);
                GIGO.sites_display_failure(r);
                GIGO.sites_next_in_queue();
            }
        }, GIGO.max_time);
        jQuery(img).attr("src", url); // Start the image loading!
    }, 1000);


};

GIGO.sites_start_ipv6 = function (r) {
    var url, img, img_pending;
    // console.log("sites_start_ipv6 %o",r);

    if (!r.v6) {
        return;
    }

    if (GIGO.is_replay()) {
        GIGO.sites_start_ipv6_take2(r);
        return;
    }


    // We have all the details we need to know.
    // We have a freshly incremented "id".
    // What we need now is to start an image
    // with handlers on it.
    // Finalize the URL.
    // Include a random number to defeat the browser cache.
    url = r.v6 + "?nocache=" + Math.random();

    // Create the image object.
    // We will keep this "off screen".
    img = jQuery('<img style="display:none" />');
    img_pending = 1;


    jQuery(img).bind({
        load: function () {
            if (img_pending) {
                img_pending = 0;
                GIGO.sites_display_success(r);
                GIGO.sites_next_in_queue();
            }
        },
        error: function () {
            if (img_pending) {
                img_pending = 0;
                GIGO.sites_start_ipv6_take2(r);
            }
        }
    });
    // Fake timeout here since IE doesn't pass errors
    setTimeout(function () {
        // TODO show FAIL
        if (img_pending) {
            img_pending = 0;
            GIGO.sites_start_ipv6_take2(r);
        }
    }, GIGO.max_time);
    jQuery(img).attr("src", url); // Start the image loading!
};


GIGO.sites_start_ipv4_take2 = function (r) {
    var url, img, img_pending;
    console.log("sites_start_ipv4 %o",r);

    if (!r.v4) {
        return;
    }


    url = r.v4 + "?nocache=" + Math.random();


    if (GIGO.is_replay()) {
        img_pending = 0;
        if (GIGO.was_failed_url(url)) {
            GIGO.fail_url(url);
            GIGO.sites_display_giveup(r);
        } else {
            GIGO.sites_start_ipv6(r);
        }
        GIGO.sites_next_in_queue();
        return;
    }




    // Intentionally delay by a second
    // This gives a chance for the DNS to eventually
    // resolve, in case that was the source of the error.
    setTimeout(function () {

        r.refs.td_status.find('img').css("opacity", "1.0").css("filter", "alpha(opacity=100)");

        img = jQuery('<img style="display:none" />');
        img_pending = 1;

        jQuery(img).bind({
            load: function () {
                img_pending = 0;
                GIGO.sites_start_ipv6(r);
            },
            error: function () {
                if (img_pending) {
                    img_pending = 0;
                    GIGO.fail_url(url);
                    GIGO.sites_display_giveup(r);
                    GIGO.sites_next_in_queue();
                }
            }
        });
        setTimeout(function () {
            // TODO show FAIL
            if (img_pending) {
                img_pending = 0;
                GIGO.fail_url(url);
                GIGO.sites_display_giveup(r);
                GIGO.sites_next_in_queue();
            }
        }, GIGO.max_time);
        // Fake timeout here since IE doesn't pass errors
        jQuery(img).attr("src", url); // Start the image loading!
    }, 1000);
};



GIGO.sites_start_ipv4 = function (r) {
    var url, img, img_pending;


    if (!r.v4) {
        return;
    }

    // Visiting the IPv6 specific site
    if (window.location.hostname.toLocaleLowerCase().startsWith("ipv6."))  {
        GIGO.sites_start_ipv6(r);
        return;
    }

    // OR the beta site
    if (window.location.hostname.toLocaleLowerCase().startsWith("beta."))  {
        GIGO.sites_start_ipv6(r);
        return;
    }

    // IPv6 only? Brave fellow.
    if ((!GIGO.results.ipv4.ip) && (GIGO.results.ipv6.ip)) {
        GIGO.sites_start_ipv6(r);
        return;
    }

    if (GIGO.is_replay()) {
        GIGO.sites_start_ipv4_take2(r);
        return;
    }


    r.refs.td_status.find('img').css("opacity", "1.0").css("filter", "alpha(opacity=100)");

    url = r.v4 + "?nocache=" + Math.random();
    img = jQuery('<img style="display:none" />');
    img_pending = 1;


    jQuery(img).bind({
        load: function () {
            if (img_pending) {
                img_pending = 0;
                GIGO.sites_start_ipv6(r);
            }
        },
        error: function () {
            if (img_pending) {
                img_pending = 0;

                GIGO.sites_start_ipv4_take2(r);
            }
        }
    });
    setTimeout(function () {
        // TODO show FAIL
        if (img_pending) {
            img_pending = 0;
            GIGO.sites_start_ipv4_take2(r);
        }
    }, GIGO.max_time);
    // Fake timeout here since IE doesn't pass errors
    jQuery(img).attr("src", url); // Start the image loading!
};


GIGO.sites_next_in_queue = function () {
    var r;
    if (GIGO.sites_queue.length > 0) {
        r = GIGO.sites_queue.shift();
        GIGO.sites_start_ipv4(r);
    }
};

GIGO.sites_start_tests = function () {
    // 9 parallel runs, spaced a bit a part.
    if (0 && GIGO.is_replay()) {
        while (GIGO.sites_queue.length > 0) {
            GIGO.sites_next_in_queue();
        }
    } else {
        setTimeout(GIGO.sites_next_in_queue, 1);
        setTimeout(GIGO.sites_next_in_queue, 75);
        setTimeout(GIGO.sites_next_in_queue, 150);
        setTimeout(GIGO.sites_next_in_queue, 225);
        setTimeout(GIGO.sites_next_in_queue, 300);
        setTimeout(GIGO.sites_next_in_queue, 375);
        setTimeout(GIGO.sites_next_in_queue, 450);
        setTimeout(GIGO.sites_next_in_queue, 525);
        setTimeout(GIGO.sites_next_in_queue, 600);
    }
};

GIGO.test_sites = function (mode) {
    GIGO.sites_init(mode);
    GIGO.sites_queue_all(mode);
    GIGO.fisherYates(GIGO.sites_queue);
    GIGO.sites_prepare_helpdesk(mode);
    GIGO.sites_table_init(mode);
    GIGO.sites_table_populate(mode);
    GIGO.sites_start_tests(mode);
};


GIGO.fisherYates = function (myArray) {
    var i, j, tempi, tempj;
    i = myArray.length;
    if (i === 0) {
        return;
    }
    while (i > 0) {
        i = i - 1;
        j = Math.floor(Math.random() * (i + 1));
        tempi = myArray[i];
        tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
};
