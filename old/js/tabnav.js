/*global GIGO, jQuery, alert */
/*jslint browser: true */
/*jslint regexp: true */

GIGO.goback = function () {
    var prev;

    // Remove the latest window from history.
    if (GIGO.tabhistory.length > 0) {
        GIGO.tabhistory.pop();
    }

    // Try and go to the window before that.
    if (GIGO.tabhistory.length > 0) {
        prev = GIGO.tabhistory.pop();
        GIGO.tabnav(prev);
    }
    return false;
};

GIGO.extra_tabs = {};
GIGO.newtab = function (which, title) {
    // INPUT:  name of document or handle
    // INPUT:  title to give tab
    // OUTPUT: object.   object.handle = the name we should use.
    //          can be altered later by other functions.
    //  If the handle already exists, no new tab is created.
    //  New tab is NOT made the foreground tab - use GIGO.tabnav
    var w, html, m;


    if (GIGO.extra_tabs.hasOwnProperty(which)) {
        return GIGO.extra_tabs[which];
    }


    w = which.replace(/[^a-z0-9]/g, "_");
    GIGO.extra_tabs[which] = {
        "original": which,
        "handle": w,
        "title": title
    };

    html = '<li><a href="#" class="tabbutton_' + w + '" onclick="return GIGO.tabnav(\'' + w + '\');">' + title + '</a></li>';
    m = jQuery("ul#tabnavlist");
    m.append(html);

    //html = '<div id="tab_' + w + ' style="display:none"></div>';
    html = '<div id="tab_' + w + '" ></div>';

    m = jQuery("div#tabbox_inside");
    m.append(html);


    return (GIGO.extra_tabs[which]);

};

GIGO.tabnav = function (which) {
    // "which" is which tab to show.
    var prev, i, m;
    prev = "";

    // Find out what the previous window was
    if (GIGO.tabhistory.length > 0) {
        prev = GIGO.tabhistory.pop();
        GIGO.tabhistory.push(prev);
    }
    // Update the history, only if the previous window was different
    if (prev !== which) {
        GIGO.tabhistory.push(which);
    }

    // Hide everything.
    jQuery("#tab_main").hide();
    jQuery("#tab_tests").hide();
    jQuery("#tab_tech").hide();
    jQuery("#tab_stats").hide();
    jQuery("#tab_helpdesk").hide();
    jQuery("#tab_mail").hide();
    jQuery("#tab_debug").hide();
    jQuery("#tab_faq").hide();
    jQuery("#tab_popup").hide();
    jQuery("#tab_sites").hide();


    // Remove any highlight attributes on tabs.
    jQuery("a.tabbutton_main").removeAttr("id");
    jQuery("a.tabbutton_tests").removeAttr("id");
    jQuery("a.tabbutton_tech").removeAttr("id");
    jQuery("a.tabbutton_stats").removeAttr("id");
    jQuery("a.tabbutton_helpdesk").removeAttr("id");
    jQuery("a.tabbutton_mail").removeAttr("id");
    jQuery("a.tabbutton_debug").removeAttr("id");
    jQuery("a.tabbutton_faq").removeAttr("id");
    jQuery("a.tabbutton_popup").removeAttr("id");
    jQuery("a.tabbutton_sites").removeAttr("id");


    // Same thing for all the extra tabs.  TODO: Merge the above into just GIGO.extra_tabs or GIGO.tabs    
    for (i in GIGO.extra_tabs) {
        if (GIGO.extra_tabs.hasOwnProperty(i)) {

            m = jQuery("#tab_" + GIGO.extra_tabs[i].handle);
            m.hide();

            m = jQuery("a.tabbutton_" + GIGO.extra_tabs[i].handle);
            m.removeAttr("id");
        }
    }


    // Re-highlight and show the desirable tab.
    jQuery("#tab_" + which).show();
    jQuery("a.tabbutton_" + which).attr("id", "tabcurrent");

    // Possibly, really make the contact tab button stand out.
    if (GIGO.contact_wanted) {
        jQuery("a.tabbutton_mail").attr("id", "contactme");
    }

    return false;

};

GIGO.tabnav_tests = function (which) {
    // Change detail of "tests" page
    GIGO.tabnav("tests");
    jQuery("#tab_tests_simple").hide();
    jQuery("#tab_tests_tech").hide();
    jQuery("#tab_tests_" + which).show();
    return false;
};
