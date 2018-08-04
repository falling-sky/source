/*global GIGO, Browser, unescape */
/*jslint browser: true */

GIGO.getms = function () {
    // Helper function to get the current date/time as milliseconds.
    var d = new Date();
    return d.getTime();
};


GIGO.slow = 5000; // milliseconds . If a test takes longer than this, it is considered "slow" (if good) or "timeout" (if error)
GIGO.max_time = 15 * 1000; // milliseconds . Max time to allow a test to try and run, before giving up on it.
GIGO.retry_until = 15 * 1000; // milliseconds.  If we want multiple passes, this says to stop new passes after this time.
GIGO.retry_min = 1; // Minimum time_ms to reload images, trying to differentiate service quality.
GIGO.retry_max = 3; // Max time_ms to allow reloading, no matter how fast.
GIGO.repeat_only_if_slow = 1; // If 1: only repeat tests if at least one test was slow.  If 0: always repeat until retry_min/retry_max.
GIGO.repeated = 0; // How many time_ms we've tried so far.

GIGO.results = {}; // what we want to expose as "this" to callback functions


GIGO.results.ipv4 = {
    ip: "",
    subtype: ""
}; // Customer IP information, per our web service call
GIGO.results.ipv6 = {
    ip: "",
    subtype: ""
}; // Customer IP information, per our web service call

GIGO.results.tests = {}; // Store test specific data here.

GIGO.tabhistory = ["main"]; // History of what tab we go to and when; used for GIGO.goback()

GIGO.tests_planned = 0; // As we add tests, this will be incremented.  Used by progress bar.
GIGO.tests_finished = 0; // As we finish tests, this will be incremented. Used by progress bar.
GIGO.start_time = GIGO.getms(); // Starting time.  Used by progress bar as well as by retry_until
GIGO.finished = 0; // When we're done with all tests, set to 1 to hide the progress bar
GIGO.slowcount = 0; // How many background jsonp we spawned so far. Used when we execute tasks in parallel to stagger load.

// If we rig the test, don't report the results to the status surver.
// This is what happens when the page is called with
// ?test=oooooooo  (all "ok", and technically impossible).
// ?test=oobooooo  (more likely result)
// Main purpose is to test the display logic for given patterns of
// "ok", "slow", "bad", "timeout".
GIGO.test_rigged = 0;

GIGO.tests = []; // The list of all tests we will run.
GIGO.queue = []; // If use_queue then this is the list of pending jobs to start.
GIGO.dequeued = []; // Tests we have dequeued
GIGO.use_queue = 0; // Set to 1 for force serial execution. Set to 0 to permit parallel execution.
if (Browser.firefox) {
    GIGO.use_queue = 1; // Always do serial execution for Firefox and friends, due to funky socks behavior.
}
if (Browser.opera) {
    GIGO.use_queue = 1; // Any blocking thread, blocks all.
    GIGO.max_time = 15 * 1000; // Hmm.
}

GIGO.helpdesk = {}; // Test results will pass data to the helpdesk page
GIGO.helpdesk.other_sites = {};
GIGO.helpdesk.other_sites.finished = 0;
GIGO.helpdesk.other_sites.count = 0;
GIGO.helpdesk.other_sites.good = [];
GIGO.helpdesk.other_sites.bad = [];


// http://mootools.net/docs/core/Core/Browser
GIGO.slowcount_delay = 20; // How long (ms) to delay between backgrounding jsonp if use_queue==0
if (Browser.ie) {
    GIGO.slowcount_delay = 200; // Slow down spawning of ajax queries
}

// Symbian appears to be particularly bad.
// DNS lookups for some people appear to slow things down by nearly 5 seconds
if (navigator.userAgent.match(/SymbianOS|SymbOS/)) {
    GIGO.slowcount_delay = 500; // Slow down on Symbian phones
    GIGO.slow = 9000;
}

// What protocol (http, https) should we make our URLs?
// Force it into https:// or http:// (even though our inputs might say http or http:)
GIGO.protocol =   MirrorConfig.options.protocol ? MirrorConfig.options.protocol   : document.location.protocol;
GIGO.protocol = (GIGO.protocol.match(/https/))  ? "https://" : "http://";
GIGO.publishname = GIGO.protocol + GIGO.mirrorconfig("site", "name");


GIGO.parseGetVars = function () {
    var getVars, returnVars, i, newVar;


    getVars = location.search.substring(1).split("&"); // From the browser URL
    returnVars = [];
    i = 0;

    for (i = 0; i < getVars.length; i = i + 1) {
        newVar = getVars[i].split("=");
        returnVars[unescape(newVar[0])] = unescape(newVar[1]);
    }
    return returnVars;
};


GIGO.CGI = GIGO.parseGetVars(); // Parse CGI arguements
GIGO.contact_wanted = GIGO.CGI.contact; // Do we want to force the contact form?

console.log("GIGO.CGI=%o",GIGO.CGI);

// If we found overrides, we will set GIGO.override
// as we as prepared each override into GIGO.overrides
GIGO.override = 0;
GIGO.overrides = {};


