/*global GIGO, MirrorConfig, jQuery, alert, $gt */
/*jslint nomen: true */

GIGO.form_setup_value = function (r) {
    var s;
    s = r.status + "," + r.time_ms / 1000.0;

    if (r.ipinfo) {
        if (r.ipinfo.via) {
            s = s + " " + r.ipinfo.via;
        }
    }
    return s;
};


GIGO.form_setup = function (tokens) {
    tokens = tokens.join(",");
    jQuery("[name=a]").val(GIGO.form_setup_value(GIGO.results.tests.test_a));
    jQuery("[name=aaaa]").val(GIGO.form_setup_value(GIGO.results.tests.test_aaaa));
    jQuery("[name=ds4]").val(GIGO.form_setup_value(GIGO.results.tests.test_ds4));
    jQuery("[name=ds6]").val(GIGO.form_setup_value(GIGO.results.tests.test_ds6));
    jQuery("[name=ipv4]").val(GIGO.form_setup_value(GIGO.results.tests.test_ipv4));
    jQuery("[name=ipv6]").val(GIGO.form_setup_value(GIGO.results.tests.test_ipv6));
    jQuery("[name=v6mtu]").val(GIGO.form_setup_value(GIGO.results.tests.test_v6mtu));
    jQuery("[name=v6ns]").val(GIGO.form_setup_value(GIGO.results.tests.test_v6ns));
    jQuery("[name=dsmtu]").val(GIGO.form_setup_value(GIGO.results.tests.test_dsmtu));
    jQuery("[name=ip4]").val(GIGO.results.ipv4.ip);
    jQuery("[name=ip6]").val(GIGO.results.ipv6.ip);
    jQuery("[name=ip6subtype]").val(GIGO.results.ipv6.subtype);
    jQuery("[name=tokens]").val(tokens);

    jQuery("[name=subdomain]").val(GIGO.mirrorconfig("site", "name"));

    jQuery(".progress_bar").remove();

    jQuery("[name=form_tab_main]").val(jQuery("#tab_main_inside")[0].outerHTML);
    jQuery("[name=form_config]").val(JSON.encode(MirrorConfig));
    jQuery("[name=form_results]").val(JSON.encode(GIGO.results));


};


GIGO.showform = function () {
    var msgs, share_text, share_link;

    // Highlight the tab
    jQuery("a.tabbutton_mail").attr("id", "contactme");
    GIGO.contact_wanted = 1;
    jQuery("#comments_wanted").show();
    jQuery("#comments_unwanted").hide();

    jQuery("#contact_form").show();
    jQuery("[name=purpose]").val("bug");

    share_text = "{{share your results}}";
    share_link = "<a href='#' onclick='return GIGO.tabnav(\"mail\");'>%1</a>";
    share_link = share_link.replace(/%1/, share_text);

    msgs = "{{I am most interested in discussing your setup with you, because it was been determined that <B>your IPv6 connectivity is broken</b>, or at least not fully understood.  This is not normal; would you be willing to %share?}}";
    msgs = msgs.replace(/%share/, share_link);

    msgs = "<div><p><span id='highlighter'>" + msgs + "</span></p></div>";

    jQuery("#results_eof").before(msgs);

    // Add fields to the contact form
};


GIGO.showconfused = function (s) {
    var msgs, share_text, share_link, retest_text, retest_link;

    // Highlight the tab
    jQuery("a.tabbutton_mail").attr("id", "contactme");
    GIGO.contact_wanted = 1;
    jQuery("#comments_wanted").show();
    jQuery("#comments_unwanted").hide();
    share_text = "{{share your results}}";
    share_link = "<a href='#' onclick='return GIGO.tabnav(\"mail\");'>%1</a>";
    share_link = share_link.replace(/%1/, share_text);

    retest_text = "{{retest}}";
    retest_link = "<a href='#' onclick='return GIGO.retest();'>%1</a>";
    retest_link = retest_link.replace(/%1/, retest_text);


    msgs = "{{I am most interested in discussing your setup with you, because it was been determined that <B>your IPv6 connectivity is broken</b>, or at least not fully understood.  This is not normal; would you be willing to %share?}}";
    msgs = msgs.replace(/%share/, share_link);
    msgs = msgs.replace(/%retest/, retest_link);
    msgs = "<div><p><span id='highlighter'>" + msgs + "</span></p></div>";

    msgs = msgs + "<div><p>" + "{{Result code}}" + " " + s + "</p></div>";


    jQuery("#results_eof").before(msgs);

    // Add fields to the contact form
    return false;
};

GIGO.debuggercomments = function (thisform) {

    var s = "[Debug info follows]\n" + GIGO._dumpObj(GIGO.results, ".", " ", 0);

    GIGO.showform();
    GIGO.tabnav("mail");
    // "notes" for top box.  "comments" for bottom box.
    jQuery("[name=notes]").val(s);
    return false;
};


GIGO.validate_form = function (thisform) {

    if ((thisform.contact.value === null) || (thisform.contact.value === "")) {
        if (!GIGO.validate_form.asked) {
            GIGO.validate_form.asked = 1;
            alert("{{Note: I can't contact you, if the contact info is blank.  If you really want to submit this anonymously, hit Send Results again.}}");
            thisform.contact.focus();
            return false;
        }
    }
    return true;
};
GIGO.validate_form.asked = 0;
