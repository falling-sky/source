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
    jQuery("[name=form_replay]").val(GIGO.generate_share_link());

};


GIGO.showform = function () {
    var msgs, share_text, share_link;

    if (GIGO.isUnreliable()){
      return;
    }

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


GIGO.debuggercomments = function (thisform) {

    var s = "[Debug info follows]\n" + GIGO._dumpObj(GIGO.results, ".", " ", 0);

    GIGO.showform();
    GIGO.tabnav("mail");
    // "notes" for top box.  "comments" for bottom box.
    jQuery("[name=notes]").val(s);
    return false;
};


GIGO.validate_form = function (thisform) {

    check = function (x) {
        try {
            return  x.value.match(/\S/)
        } catch (e) {
            return false
        }
    }

    // Nothing filled out?
    if (!( check(thisform.notes) || check(thisform.comments) || check(thisform.contact)) ) {
        thisform.notes.focus();
        return false;
    }

    if (!( $('#consent').prop('checked'))) {
      alert("{{Please consent to sharing your data.}}");
      thisform.consent.focus();
      return false;
    }

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

GIGO.onchange_purpose = function (thisform) {

    var e = document.getElementById("purpose");
    var strUser = e.options[e.selectedIndex].value;

    jQuery("div[id^=response]").hide();
    jQuery("#contact_form").hide();
    switch (strUser) {
        case "isp":
            jQuery("#response_isp").show();
            break;

        case "hacked":
        jQuery("#response_hacked").show();
            break;

        case "gfw":
        jQuery("#response_gfw").show();
            break;

        case "isp":
        jQuery("#response_isp").show();
            break;

        default:
        jQuery("#contact_form").show();
            break;
    };


    console.log("this is %o", strUser);
};