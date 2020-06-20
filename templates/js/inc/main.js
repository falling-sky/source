/*global GIGO, MirrorConfig, jQuery,  window,  alert,  Browser */
/*jslint browser: true */
/*jslint regexp: true */


GIGO.update_ipaddress = function (ipinfo) {
    // ipinfo:  callback({"ip":"69.62.233.151","type":"ipv4","subtype":"","public":1,"filler":""});


    if (ipinfo.type === "ipv4") {
        if (!GIGO.results.ipv4.asn) {
            GIGO.results.ipv4 = ipinfo;
        }
    }
    if (ipinfo.type === "ipv6") {
        if (!GIGO.results.ipv6.asn) {
            GIGO.results.ipv6 = ipinfo;
        }
    }
};

GIGO.test_type_delayed = function (url, id) {

    // We will use this to stagger the start time_ms.
    // Since javascript has no "sleep" the next best
    // thing appears to be to set a timeout, and on timeout,
    // do what we really wanted.
    // We increase the timeout value each time we run this, so
    // that each thread time_ms out at a later time, to prevent
    // all tests from running INSTANTLY.
    // This is principally to work around IE problems
    // with too many jsonP queries initiating at once.
    GIGO.slowcount = GIGO.slowcount + 1;
    setTimeout(function () {
        GIGO.test_type(url, id);
    }, GIGO.slowcount * GIGO.slowcount_delay);
};

GIGO.finish_test = function (id) {
    var total_tests = GIGO.queue.length + GIGO.dequeued.length; // Once for main text, once for fallback image test
    GIGO.tests_finished = GIGO.tests_finished + 1;
    GIGO.update_progress(GIGO);
    GIGO.update_status(id);
    if (GIGO.tests_finished >= total_tests) {
        GIGO.check_results();
    }
    GIGO.next_in_queue(); // Start next test, if available
    GIGO.show_debug();
};


GIGO.test_type_skip = function (url, id) {
    // name = dns name to fetch
    // id = which <div> to update
    var tests, this_test;



    // Let us also add in some hints for mirror operators
    if (url.search(/\?/) < 0) {
        url = url + "?";
    }
    url = url + "&testdomain=" + GIGO.options.domain;
    url = url + "&testname=" + id;
    if (Browser.opera) {
        url = url + "&random=" + Math.random();
    }


    tests = GIGO.results.tests; // Convenience
    if (!(tests.hasOwnProperty(id))) {
        tests[id] = {};
    }
    this_test = tests[id];

    this_test.start_time = GIGO.getms(); // Will use to find how long we ran
    this_test.url = url; // For later display of test urls
    // Update status to "Started" if we don't have any time for this yet



    this_test.time_ms=0;
    this_test.status = "skipped";
    GIGO.finish_test(id);
    GIGO.update_url(id);
    GIGO.show_debug();

};


GIGO.test_type_json = function (url, id) {
    // name = dns name to fetch
    // id = which <div> to update
    var tests, this_test;



    // Let us also add in some hints for mirror operators
    if (url.search(/\?/) < 0) {
      url = url + "?";
    }
    url = url + "&testdomain=" + GIGO.options.domain;
    url = url + "&testname=" + id;
    if (Browser.opera) {
            url = url + "&random=" + Math.random();
    }


    tests = GIGO.results.tests; // Convenience
    if (!(tests.hasOwnProperty(id))) {
        tests[id] = {};
    }
    this_test = tests[id];

    this_test.start_time = GIGO.getms(); // Will use to find how long we ran
    this_test.url = url; // For later display of test urls
    // Update status to "Started" if we don't have any time for this yet




    if (GIGO.overrides && GIGO.overrides[id]) {
        // oh, we're faking this one.  TODO
        // we can take a lot of short cuts.
        GIGO.override_id(id, url);
        GIGO.finish_test(id);
        GIGO.update_url(id);
        GIGO.show_debug();
        return;
    }


    GIGO.update_url(id);

    // Initiate new query.  Based on pass/fail, update status.
    jQuery.jsonp({
        "url": url,
        "cache": true,
        "pageCache": false,
        "timeout": GIGO.max_time,

        "success": function (ipinfo) {
            // Keep track of IP information we receive
            var delta;

            delete ipinfo.full; // Don't need this polluting anything.
            delete ipinfo.padding; // Don't need this polluting anything.
            this_test.ipinfo = ipinfo; // Record the IP address reported from this test
            if (GIGO.override) {
                GIGO.override_id_ip(id);
            }
            GIGO.update_ipaddress(this_test.ipinfo); // Make note of our IPv4 or IPv6 address based on the test
            GIGO.update_ip(id); // callback for presentation
            delta = GIGO.getms() - this_test.start_time;
            if (GIGO.isdef(this_test.time_ms)) {
                if (delta < this_test.time_ms) {
                    this_test.time_ms = delta;
                }
            } else {
                this_test.time_ms = delta;
            }
            this_test.status = (this_test.time_ms < GIGO.slow) ? "ok" : "slow";


            // Look for dual stack
            if (id === "test_ds") {
                // ds4 and ds6 have the same time; but if one is good, the other must be bad,
                // since we can't possibly connect to both with a single DNS name
                if (ipinfo.type === "ipv6") {
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

            GIGO.finish_test(id);


        },
        "error": function (d, msg) {
            var delta;

            console.log("test_type_json url=%o id=%o d=%o msg=%o",url,id,d,msg);

            delta = GIGO.getms() - this_test.start_time;
            if (GIGO.isdef(this_test.time_ms)) {
                if (delta < this_test.time_ms) {
                    this_test.time_ms = delta;
                }
            } else {
                this_test.time_ms = delta;
            }
            this_test.status = (this_test.time_ms < GIGO.slow) ? "bad" : "timeout";

            if (GIGO.protocol==="https://") {
              if ((id==="test_ipv4") || (id==="test_ipv6")) {
                // We expected this to fail.
                this_test.status = "skipped";
              }
            }

            // Look for dual stack
            if (id === "test_ds") {
                tests.test_ds6 = {
                    url: this_test.url,
                    time_ms: this_test.time_ms,
                    status: this_test.status
                };
                tests.test_ds4 = {
                    url: this_test.url,
                    time_ms: this_test.time_ms,
                    status: this_test.status
                };

                // Dual stack connection failed. Is it due to buggy DNS?
                // Queue the buggydns1 check!
                GIGO.queue.push(["test_buggydns1", GIGO.options.url.test_buggydns1_img, "test_buggydns1"]);
            }


            // Fallback to image test, if the primary tests fail.  Just in case some filter blocked the script fetches.
            GIGO.finish_test(id);
            GIGO.queue.push(["test_type_img", GIGO.options.url[id + "_img"], id + "_img"]);
        }
    });

    // Perform callback for presentation
    GIGO.update_url(id);
    GIGO.show_debug();

};


GIGO.test_type_json_only = function (url, id) {
    // name = dns name to fetch
    // id = which <div> to update
    var tests, this_test;


    if (url.search(/\?/) < 0) {
      url = url + "?";
    }
    url = url + "&testdomain=" + GIGO.options.domain;
    url = url + "&testname=" + id;
    if (Browser.opera) {
            url = url + "&random=" + Math.random();
    }




    tests = GIGO.results.tests; // Convenience
    if (!(tests.hasOwnProperty(id))) {
        tests[id] = {};
    }
    this_test = tests[id];

    this_test.start_time = GIGO.getms(); // Will use to find how long we ran
    this_test.url = url; // For later display of test urls
    // Update status to "Started" if we don't have any time for this yet
    GIGO.update_url(id);



    if ((id === "test_asn4") && (GIGO.isdef(GIGO.CGI.ip4))) {
        if ((GIGO.CGI.ip4) && (GIGO.CGI.ip4.match(/^[0-9abcdef.:]+$/))) {
            url = url  + "&testip=" + GIGO.CGI.ip4;
            // url = "/ip/?callback=?&asn=1&testip=" + GIGO.CGI.ip4;
            // url = url + "&testdomain=" + GIGO.options.domain;
            // url = url + "&testname=" + id;
            this_test.url = url; // For later display of test urls
            GIGO.update_url(id);
        } else {
            this_test.ipinfo = {};
            this_test.status = "bad";
            this_test.time_ms = 1;
            GIGO.finish_test(id);
            GIGO.update_url(id);
            GIGO.show_debug();
            return;
        }
    }
    if ((id === "test_asn6") && (GIGO.isdef(GIGO.CGI.ip6))) {
        if ((GIGO.CGI.ip6) && (GIGO.CGI.ip6.match(/^[0-9abcdef.:]+$/))) {
            url = url  + "&testip=" + GIGO.CGI.ip6;
            //
            // url = "/ip/?callback=?&asn=1&testip=" + GIGO.CGI.ip6;
            // url = url + "&testdomain=" + GIGO.options.domain;
            // url = url + "&testname=" + id;
            this_test.url = url; // For later display of test urls
            GIGO.update_url(id);
        } else {
            this_test.ipinfo = {};
            this_test.status = "bad";
            this_test.time_ms = 1;
            GIGO.finish_test(id);
            GIGO.update_url(id);
            GIGO.show_debug();
            return;
        }
    }





    // Initiate new query.  Based on pass/fail, update status.
    jQuery.jsonp({
        "url": url,
        "cache": true,
        "pageCache": false,
        "timeout": GIGO.max_time,

        "success": function (ipinfo) {
            // Keep track of IP information we receive
            var delta;

            delete ipinfo.full; // Don't need this polluting anything.
            delete ipinfo.padding; // Don't need this polluting anything.
            this_test.ipinfo = ipinfo; // Record the IP address reported from this test
            GIGO.update_ipaddress(this_test.ipinfo); // Make note of our IPv4 or IPv6 address based on the test
            GIGO.update_ip(id); // callback for presentation
            delta = GIGO.getms() - this_test.start_time;
            if (GIGO.isdef(this_test.time_ms)) {
                if (delta < this_test.time_ms) {
                    this_test.time_ms = delta;
                }
            } else {
                this_test.time_ms = delta;
            }
            this_test.status = (this_test.time_ms < GIGO.slow) ? "ok" : "slow";



            GIGO.finish_test(id);


        },
        "error": function (d, msg) {
            var delta;

            delta = GIGO.getms() - this_test.start_time;
            if (GIGO.isdef(this_test.time_ms)) {
                if (delta < this_test.time_ms) {
                    this_test.time_ms = delta;
                }
            } else {
                this_test.time_ms = delta;
            }
            this_test.status = (this_test.time_ms < GIGO.slow) ? "bad" : "timeout";


            GIGO.finish_test(id);
        }
    });

    // Perform callback for presentation
    GIGO.update_url(id);
    GIGO.show_debug();
};


GIGO.test_buggydns1 = function (url, id) {
    // name = dns name to fetch
    // id = which <div> to update
    var tests, this_test, img, img_pending, max_time;
    jQuery(".optional_buggydns1").show();

    max_time = (GIGO.max_time > 5000) ? 5000 : GIGO.max_time; // Shorten this test.
    if (url.search(/\?/) < 0) {
          url = url + "?";
    }
    url = url + "&testdomain=" + GIGO.options.domain;
    url = url + "&testname=" + id;
    if (Browser.opera) {
            url = url + "&random=" + Math.random();
    }


    tests = GIGO.results.tests; // Convenience
    if (!(tests.hasOwnProperty(id))) {
        tests[id] = {};
    }
    this_test = tests[id];

    this_test.start_time = GIGO.getms(); // Will use to find how long we ran
    this_test.url = url; // For later display of test urls
    // Update status to "Started" if we don't have any time for this yet
    GIGO.update_url(id);

    // Create image.
    // Attach handlers to the image.
    // Create a timer to artificially timeout imgs
    img_pending = 1;

    img = jQuery('<img style="display:none" />');

    // INVERSE LOGIC HERE !!!
    jQuery(img).bind({
        load: function () {
            var delta;
            if (img_pending) {
                img_pending = 0;
                delta = GIGO.getms() - this_test.start_time;
                if (GIGO.isdef(this_test.time_ms)) {
                    if (delta < this_test.time_ms) {
                        this_test.time_ms = delta;
                    }
                } else {
                    this_test.time_ms = delta;
                }
                this_test.image = 1;
                this_test.status = "affected"; // INVERSE LOGIC!
                GIGO.finish_test(id);
            }
        },
        error: function () {
            var delta;
            if (img_pending) {
                img_pending = 0;
                delta = GIGO.getms() - this_test.start_time;
                if (GIGO.isdef(this_test.time_ms)) {
                    if (delta < this_test.time_ms) {
                        this_test.time_ms = delta;
                    }
                } else {
                    this_test.time_ms = delta;
                }
                this_test.image = 1;
                this_test.status = "safe"; // INVERSE LOGIC!
                GIGO.finish_test(id);
            }
        }
    });

    // FAKE IMAGE TIMEOUT HANDLER
    setTimeout(function () {
        var delta;
        if (img_pending) {
            img_pending = 0;
            // replace failing image url with one that should work, so that browser can call this done.
            // we tried setting to "" but safari at minimum treats that as replacing src
            // with the value of document.location (!).
            jQuery(img).css("height","2em").css("width","auto");
            jQuery(img).attr("src", "/images/hires_bad.png");

            delta = GIGO.getms() - this_test.start_time;
            if (GIGO.isdef(this_test.time_ms)) {
                if (delta < this_test.time_ms) {
                    this_test.time_ms = delta;
                }
            } else {
                this_test.time_ms = delta;
            }
            this_test.image = 1;
            this_test.status = "safe"; // INVERSE LOGIC!
            GIGO.finish_test(id);
        }
    }, max_time);


    //jQuery('body').append(img);
    jQuery(img).attr("src", url);

    // Perform callback for presentation
    GIGO.update_url(id);
    GIGO.show_debug();
};

GIGO.test_type_img = function (url, id) {
    // name = dns name to fetch
    // id = which <div> to update
    var tests, this_test, img, img_pending;

    if (url.search(/\?/) < 0) {
          url = url + "?";
    }
    url = url + "&testdomain=" + GIGO.options.domain;
    url = url + "&testname=" + id;
    if (Browser.opera) {
            url = url + "&random=" + Math.random();
    }

    tests = GIGO.results.tests; // Convenience
    if (!(tests.hasOwnProperty(id))) {
        tests[id] = {};
    }
    this_test = tests[id];

    this_test.start_time = GIGO.getms(); // Will use to find how long we ran
    this_test.url = url; // For later display of test urls
    // Update status to "Started" if we don't have any time for this yet
    GIGO.update_url(id);

    // Create image.
    // Attach handlers to the image.
    // Create a timer to artificially timeout imgs
    img_pending = 1;

    img = jQuery('<img style="display:none" />');

    jQuery(img).bind({
        load: function () {
            var delta;

            if (img_pending) {
                img_pending = 0;
                delta = GIGO.getms() - this_test.start_time;
                if (GIGO.isdef(this_test.time_ms)) {
                    if (delta < this_test.time_ms) {
                        this_test.time_ms = delta;
                    }
                } else {
                    this_test.time_ms = delta;
                }
                this_test.image = 1;
                this_test.status = (this_test.time_ms < GIGO.slow) ? "ok" : "slow";
                if (this_test.test_ms > GIGO.max_time) {
                    this_test.status = "timeout";
                }
                GIGO.finish_test(id);
            }
        },
        error: function () {
            var delta;
            if (img_pending) {
                img_pending = 0;
                delta = GIGO.getms() - this_test.start_time;
                if (GIGO.isdef(this_test.time_ms)) {
                    if (delta < this_test.time_ms) {
                        this_test.time_ms = delta;
                    }
                } else {
                    this_test.time_ms = delta;
                }
                this_test.image = 1;
                this_test.status = (this_test.time_ms < GIGO.slow) ? "bad" : "timeout";
                GIGO.finish_test(id);
            }
        }
    });

    // FAKE IMAGE TIMEOUT HANDLER
    setTimeout(function () {
        var delta;
        if (img_pending) {
            img_pending = 0;
            // replace failing image url with one that should work, so that browser can call this done.
            // we tried setting to "" but safari at minimum treats that as replacing src
            // with the value of document.location (!).
            jQuery(img).css("height","2em").css("width","auto");
            jQuery(img).attr("src", "/images/hires_bad.png");

            delta = GIGO.getms() - this_test.start_time;
            if (GIGO.isdef(this_test.time_ms)) {
                if (delta < this_test.time_ms) {
                    this_test.time_ms = delta;
                }
            } else {
                this_test.time_ms = delta;
            }
            this_test.image = 1;
            this_test.status = (this_test.time_ms < GIGO.slow) ? "bad" : "timeout";
            GIGO.finish_test(id);
        }
    }, GIGO.max_time);


    //jQuery('body').append(img);
    jQuery(img).attr("src", url);

    // Perform callback for presentation
    GIGO.update_url(id);
    GIGO.show_debug();
};



GIGO.retest = function () {
    window.location.reload();
};



GIGO.next_in_queue = function () {
    var fname, a;
    if (GIGO.queue.length > 0) {
        a = GIGO.queue.shift(); // Dequeue the next test.
        GIGO.dequeued.push(a.slice(0)); // Save a COPY.
        try {
            fname = a.shift(); // Remove first field, the function name (in the GIGO namespace).  This changes array "a".
        } catch (e) {
            alert("ERROR: GIGO.next_in_queue: not an array; value=" + a);
        }

        // fname = function name
        // a = args array to pass.
        GIGO[fname].apply(GIGO, a);

        // If we are permitted parallel execution,
        // set a timer to start the next job.
        if (!GIGO.use_queue) {
            setTimeout(GIGO.next_in_queue, GIGO.slowcount_delay);
        }
    }
    GIGO.update_progress(GIGO);
};

GIGO.start_tests = function () {
    GIGO.browser_tweaks(GIGO); // In case we want to do tweak the document
    GIGO.next_in_queue(); // Get the ball rolling!
};
GIGO.restart_tests = function () {
    var i, l;
    l = GIGO.dequeued.length;
    for (i = 0; i < l; i = i + 1) {
        GIGO.queue.push(GIGO.dequeued[i]);
    }
    GIGO.update_progress(GIGO);
    GIGO.start_tests();
};



GIGO.setup_tests = function () {

    var asn_lookup_broken = 0;
    if (asn_lookup_broken) {
      jQuery('#sum_test_asn4').parent().parent().hide();
      jQuery('#sum_test_asn6').parent().parent().hide();
      jQuery('#test_asn4').parent().parent().hide();
      jQuery('#test_asn6').parent().parent().hide();
    } else {
      GIGO.queue.push(["test_type_json_only", GIGO.options.url.test_asn4, "test_asn4"]);
      GIGO.queue.push(["test_type_json_only", GIGO.options.url.test_asn6, "test_asn6"]);
    }






    GIGO.queue.push(["test_type_json", GIGO.options.url.test_a, "test_a"]);
    GIGO.queue.push(["test_type_json", GIGO.options.url.test_aaaa, "test_aaaa"]);
    GIGO.queue.push(["test_type_json", GIGO.options.url.test_ds, "test_ds"]);

    GIGO.queue.push(["test_type_json", GIGO.options.url.test_v6mtu, "test_v6mtu"]);
    GIGO.queue.push(["test_type_json", GIGO.options.url.test_v6ns, "test_v6ns"]);
    GIGO.queue.push(["test_type_json", GIGO.options.url.test_dsmtu, "test_dsmtu"]);
    GIGO.queue.push(["test_type_img", GIGO.options.url.test_ood_img, "test_ood"]);


    console.log("check for ssl");
    if (GIGO.CheckHTTPS()) {
        console.log("disabling test_https test_ipv4 test_ipv6 due to ssl");
        GIGO.queue.push(["test_type_skip", GIGO.options.url.test_ipv4, "test_ipv4"]);
        GIGO.queue.push(["test_type_skip", GIGO.options.url.test_ipv6, "test_ipv6"]);
        GIGO.queue.push(["test_type_skip", GIGO.options.url.test_https, "test_https"]);

        jQuery("#nossl1").remove()
        jQuery("#nossl2").remove()
        jQuery("#nossl3").remove()
        jQuery("#nossl4").remove()
    } else {
        console.log("enabling test_https test_ipv4 test_ipv6");
        GIGO.queue.push(["test_type_json", GIGO.options.url.test_ipv4, "test_ipv4"]);
        GIGO.queue.push(["test_type_json", GIGO.options.url.test_ipv6, "test_ipv6"]);
        GIGO.queue.push(["test_type_json", GIGO.options.url.test_https, "test_https"]);

    }



    GIGO.show_debug();
    GIGO.prepare_fake();

};

GIGO.fill = function (size, str) {
    var s = "";
    while (s.length < size) {
        s = s + str;
    }
    s = s.substring(0, size);
    return s;
};




GIGO.set_default_options = function (options) {

    options.url = (options.hasOwnProperty("url")) ? options.url : {};

    options.domain = GIGO.mirrorconfig("site", "name", null);
    options.subdomain = GIGO.mirrorconfig("load", "domain", options.domain);
    options.ipv4 = GIGO.mirrorconfig("load", "ipv4", null);
    options.ipv6 = GIGO.mirrorconfig("load", "ipv6", null);
    options.uri = GIGO.mirrorconfig("options", "ip", "/ip/") + "?callback=?";
    options.img_uri = "/images-nc/bg.gif";
    options.img_uri_big = "/images-nc/hires_ok.png?&fill=" + GIGO.fill(1600, "x");
    options.img_bad_uri = "/images-nc/hires_bad.png";

    // Determine if we can use an alternate v6mtu defined by the site config (options -> v6mtu)
//    options.v6mtu = GIGO.mirrorconfig("options","v6mtu","ipv6." + options.subdomain);



    // options.uri = "/report-ip.php?callback=?";  // Alternative to mod_ip
    options.url.test_a = GIGO.protocol+"ipv4." + options.subdomain + options.uri;
    options.url.test_aaaa = GIGO.protocol+"ipv6." + options.subdomain + options.uri;
    options.url.test_ds = GIGO.protocol+"ds." + options.subdomain + options.uri;


    options.url.test_ipv4 = GIGO.protocol+"" + options.ipv4 + options.uri;
    options.url.test_ipv6 = GIGO.protocol+"[" + options.ipv6 + "]:80" + options.uri;
    options.url.test_v6ns = GIGO.protocol+"ds.v6ns." + options.subdomain + options.uri;
    options.url.test_v6mtu = GIGO.protocol+"mtu1280." + options.subdomain + options.uri + "&size=1600&fill=" + GIGO.fill(1600, "x");
    options.url.test_dsmtu = GIGO.protocol+"ds." + options.subdomain + options.uri + "&size=1600&fill=" + GIGO.fill(1600, "x");
    options.url.test_buggydns1 = GIGO.protocol+"buggydns1." + options.subdomain + options.uri;
    options.url.test_ood=""; // Dummy


    // ASN lookups are corrently broken.
    options.url.test_asn4 = GIGO.protocol+"ipv4.lookup.test-ipv6.com" + options.uri + "&asn=1";
    options.url.test_asn6 = GIGO.protocol+"ipv6.lookup.test-ipv6.com" + options.uri + "&asn=1";


    options.url.test_a_img = GIGO.protocol+"ipv4." + options.subdomain + options.img_uri;
    options.url.test_aaaa_img = GIGO.protocol+"ipv6." + options.subdomain + options.img_uri;
    options.url.test_ds_img = GIGO.protocol+"ds." + options.subdomain + options.img_uri;
    options.url.test_ipv4_img = GIGO.protocol+"" + options.ipv4 + options.img_uri;
    options.url.test_ipv6_img = GIGO.protocol+"[" + options.ipv6 + "]:80" + options.img_uri;
    options.url.test_v6ns_img = GIGO.protocol+"ds.v6ns." + options.subdomain + options.img_uri;
    options.url.test_v6mtu_img = GIGO.protocol+"mtu1280." + options.subdomain + options.img_uri_big;
    options.url.test_dsmtu_img = GIGO.protocol+"ds." + options.subdomain + options.img_uri_big;
    options.url.test_buggydns1_img = GIGO.protocol+"buggydns1." + options.subdomain + options.img_uri;
    options.url.test_ood_img = GIGO.ood_url()


    // Probe for https - stick to our current hostname
    options.url.test_https = "https://" + document.location.hostname + options.uri;
    options.url.test_https_img = "https://" + document.location.hostname + options.img_uri;



};

GIGO.fix_comment_form_and_tab = function () {
    if (MirrorConfig.options.comment) {
        jQuery("#tabbutton_mail_link").show();

        var url = MirrorConfig.options.comment;
        if (MirrorConfig.options.userdata) {
            if (GIGO.results.ipv4.ip) {
                url = GIGO.protocol+"ipv4." + MirrorConfig.options.userdata + "/comment.php";
            } else if (GIGO.results.ipv6.ip) {
                url = GIGO.protocol+"ipv6." + MirrorConfig.options.userdata + "/comment.php";
            } else {
                url = GIGO.protocol+"ds." + MirrorConfig.options.userdata + "/comment.php";
            }
        }

        $('#commentform').get(0).setAttribute('action', url);

    } else {
        jQuery("#tabbutton_mail_link").hide();
        jQuery("a.tabbutton_mail").hide();
    }

};


GIGO.test_ipv6_gui = function (options) {
    // Check options
    if (!GIGO.isdef(options)) {
        options = {};
    }
    GIGO.options = options;
    GIGO.set_default_options(options);



    // Start real workload
    jQuery(document).ready(function () {
        // Primitive hack to avoid the web bots from comment spamming
        jQuery("[name=nobots]").val("serious");
        if (GIGO.is_replay()) {
          jQuery("#replay").show();
        }

        // Possibly, kill that tab instead.
        // GIGO.fix_comment_form_and_tab();
        GIGO.fix_footer_early();
        GIGO.start_helpdesk();
        GIGO.setup_tests();
        GIGO.start_tests();
        GIGO.pulse_on();
    });
};

GIGO.redirect = function (page) {
    var newurl, oldpath, newpath;
    newurl = document.location.protocol;
    newurl = newurl + "://";
    newurl = newurl + document.location.hostname;
    if (document.location.port !== 80) {
        newurl = newurl + ":" + document.location.port;
    }

    oldpath = String(document.location.pathname);
    newpath = oldpath.replace(/[^\/]+$/, "");
    newpath = newpath + page;
    newpath = newpath.replace(/\/+/g, "/");

    document.location = newpath;


};

