// Input: an array.  Returns: a "hash" (as best as javascript allows).
/*global GIGO, jQuery, alert, Browser, $gt */
/*jslint browser: true */


GIGO.oc = function (a) {
    var o, i;
    o = {};
    for (i = 0; i < a.length; i = i + 1) {
        o[a[i]] = '';
    }
    return o;
};

GIGO.isdef = function (x) {
    return (typeof x !== "undefined");
};


GIGO.cgistats = function (name) {
    var s, status, time_ms, id;
    id = "test_" + name;
    status = GIGO.results.tests[id].status;
    time_ms = GIGO.results.tests[id].time_ms;
    s = "&" + name + "=" + status + "," + time_ms;
    return s;
};



GIGO.expand_abbreviation = function (c) {
    if (c === "o") {
        return "ok";
    }
    if (c === "b") {
        return "bad";
    }
    if (c === "t") {
        return "timeout";
    }
    if (c === "s") {
        return "slow";
    }
    return "[" + "[% 'unknown expansion' | i18n | escape_quotes %]" + " " + c + "]";
};


GIGO.check_precheck = function () {
    // Dummy function at this time.
    // We could decide, based on something we saw, schedule further testing.
    return;
};

GIGO.check_results = function () {

    var delta, mini_primary, mini_secondary, tokens, score_transition, score_strict, msgs, i, token, messages_plaintext, token_expanded, tokens_expanded;

    tokens_expanded = [];
    GIGO.check_precheck();
    if (GIGO.queue.length > 0) {
        return; // New tasks were added.
    }


    GIGO.show_debug();
    GIGO.repeated = GIGO.repeated + 1;
    delta = GIGO.getms() - GIGO.start_time;


    // We *could* repeat the tests. This will be sure to get connection times
    // versus DNS times.   However, I expect more bandwidth/hits from
    // the IPv6 Day announcement; lets try and do this only when it is worth
    // bothering.
    // In this case, lets do it only if one or more of our tests ran "slow".
    if ((GIGO.repeated <= GIGO.retry_min) || ((GIGO.repeated <= GIGO.retry_max) && (GIGO.delta < GIGO.retry_until))) {
        if ((GIGO.repeat_only_if_slow === 0) || (GIGO.ministates(["a", "aaaa", "ds4", "ds6", "ipv4", "ipv6", "v6mtu", "v6ns"]).match(/s/))) {
            GIGO.restart_tests(); // Minimum number of retries needed
            return;
        }
    }

    GIGO.finished = 1;
    GIGO.update_progress(GIGO);
    GIGO.fix_comment_form_and_tab(); // Fix up the comments tab 


    tokens = GIGO.identify_symptoms();
    mini_primary = GIGO.ministates(["a", "aaaa", "ds4", "ds6"]);
    mini_secondary = GIGO.ministates(["ipv4", "ipv6", "v6mtu", "v6ns"]);



    score_transition = 100;
    score_strict = 100;
    msgs = ""; // HTML form of messages to give user
    messages_plaintext = []; // Array of plaintext in case some one prefers this format
    for (i = 0; i < tokens.length; i = i + 1) {
        token = tokens[i];


        if (GIGO.isdef(GIGO.scores[token])) {
            token_expanded = {};
            token_expanded.token = token;
            token_expanded.score_ipv4 = GIGO.scores[token][0];
            token_expanded.score_ipv6 = GIGO.scores[token][1];
            token_expanded.color = GIGO.scores[token][2];
            token_expanded.text = GIGO.messages[token];
            tokens_expanded.push(token_expanded);




            if (token_expanded.score_ipv4 <= score_transition) {
                score_transition = token_expanded.score_ipv4;
            }

            if (token_expanded.score_ipv6 <= score_strict) {
                score_strict = token_expanded.score_ipv6;
            }

            msgs = msgs + "<div><p>" + token_expanded.text + "</p></div>";
            messages_plaintext.push(token_expanded.text);




        } else {
            token_expanded = {};
            token_expanded.token = token;
            token_expanded.color = "YELLOW";
            token_expanded.score_ipv4 = 10;
            token_expanded.score_ipv6 = 10;
            token_expanded.text = "(" + "[% 'unknown result code' | i18n | escape_quotes %]" + ": " + token + ")";
            tokens_expanded.push(token_expanded);
            msgs = msgs + "<div><p>" + token_expanded.text + "</p></div>";
            messages_plaintext.push(token_expanded.text);
        }
    }


    if (GIGO.oc(tokens).hasOwnProperty("confused:ASK")) {
        tokens.push("confused:" + mini_primary + ":" + mini_secondary);
    }

    if (score_transition === 100) {
        score_transition = "?";
    }
    if (score_strict === 100) {
        score_strict = "?";
    }

    if (score_strict > 7) {
        GIGO.start_sites(); // Check other sites for connections too.  Starts a new on-page tab.
    }

    // Copy the results into a place that other people might find them
    // particularly if they just use the javascript and not the entire
    // test-ipv6.com site code
    // GIGO.results = {};

    GIGO.results.tokens = tokens;
    GIGO.results.score_transition = score_transition;
    GIGO.results.score_strict = score_strict;
    GIGO.results.divs = msgs;
    GIGO.results.messages_plaintext = messages_plaintext;
    GIGO.results.debug_code = mini_primary + ":" + mini_secondary;
    GIGO.results.tokens_expanded = tokens_expanded;

    GIGO.show_debug();
    GIGO.finish_helpdesk();


    // Callbacks
    GIGO.fix_footer();
    GIGO.facebook_like();
    GIGO.twitter_tweet();
    GIGO.send_survey(tokens);
    GIGO.show_results();
    GIGO.form_setup(tokens);
    GIGO.show_debug();

};

GIGO.facebook_like = function () {
    if (GIGO.mirrorconfig("facebook", "enable", 0)) {
        jQuery('#facebook_like').replaceWith('<div id="fb-root"></div><fb:like href="http://' + GIGO.mirrorconfig("site", "name", null) + '" send="false" width="450" show_faces="false" font=""></fb:like>');

        // http://techoctave.com/c7/posts/40-xhtml-strict-tweet-button-and-facebook-like-button
        // Tian Valdemar Davis
        var s = document.createElement('SCRIPT'),
            s1 = document.getElementsByTagName('SCRIPT')[0];
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'http://connect.facebook.net/en_US/all.js#xfbml=1';
        s1.parentNode.insertBefore(s, s1);
    }
};

GIGO.twitter_tweet = function () {
    if (GIGO.mirrorconfig("twitter", "enable", 0)) {

        jQuery('#twitter_tweet').replaceWith('<a href="http://twitter.com/share" class="twitter-share-button" data-count="horizontal" data-via="' + GIGO.mirrorconfig("twitter", "name") + '">Tweet</a>');

        // http://techoctave.com/c7/posts/40-xhtml-strict-tweet-button-and-facebook-like-button
        // Tian Valdemar Davis
        var s = document.createElement('SCRIPT'),
            s1 = document.getElementsByTagName('SCRIPT')[0];
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'http://platform.twitter.com/widgets.js';
        s1.parentNode.insertBefore(s, s1);
    }
};
