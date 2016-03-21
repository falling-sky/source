/*global GIGO, jQuery, alert, $gt, Browser, navigator */

GIGO.fix_version = function (underscored) {
    var t;
    t = underscored.replace(/_/g, ".");
    return t;
};

GIGO.zeropad = function (version) {
    // Take a version number like 4.10 and return back 00004.00010
    // Pad any sequence of digits to 10 points
    // So, for every matching set of \d+
    // create new string
    // replace \b(original string)\b with new string
    var smallnumber, mymatch, mymatched, myindex, newstring, replace_re;

    smallnumber = /\b(\d{1,9})\b/;
    while (smallnumber.test(version)) {
        mymatch = smallnumber.exec(version);
        mymatched = mymatch[0];
        myindex = mymatch.index;

        newstring = mymatched;
        while (newstring.length < 10) {
            newstring = "0" + newstring;
        }
        replace_re = new RegExp("\\b" + mymatched + "\\b");
        version = version.replace(replace_re, newstring);
    }
    return version;
};

GIGO.check_version = function (appname, current, suggested) {
    var t, table, current_compare, suggested_compare;
    // Convert 10_6_7 to 10.6.7 before doing comparisons.
    if (current) {
        current = current.toString();
        current = current.replace(/_/g, ".");
        suggested = suggested.replace(/_/g, ".");

        current_compare = GIGO.zeropad(current);
        suggested_compare = GIGO.zeropad(suggested);

        if (current_compare < suggested_compare) {
            t = "{{%app: You are running version %found; we recommend %suggest or newer.}}";
            t = t.replace(/%app/, appname);
            t = t.replace(/%found/, current);
            t = t.replace(/%suggest/, suggested);
            table = GIGO.results_table_wrapper("orange", t);
            jQuery("#results_eof").before(table);
        }
    }
};

GIGO.check_mac_os_version = function () {
    // Firefox will only return "10.6" not "10.6.7".
    // Safari and Chrome appear to do the right thing.
    if (navigator.userAgent.search(/(FireX|SilkX)/) < 0) {
        if (navigator.userAgent.search(/Intel Mac OS X ([0123456789]+[._][0123456789]+[._][0123456789]+)/) >= 0) {
            if (RegExp.$1) {
                GIGO.check_version("Mac OS X", RegExp.$1, "10.6.7");
            }
        } else if (navigator.userAgent.search(/Intel Mac OS X ([0123456789]+[._][0123456789]+)/) >= 0) {
            if (RegExp.$1) {
                GIGO.check_version("Mac OS X", RegExp.$1, "10.6.7");
            }
        }
    }
};



GIGO.check_browser_firefox = function () {
    if (Browser.firefox) {
        // Firefox only reports "4.0" not "4.0.1"
        if (Browser.Platform.mac) {
            GIGO.check_version("Firefox", Browser.version, "14");
        }
    }
};

GIGO.check_browser_safari = function () {
    if (Browser.safari) {
        GIGO.check_version("Safari", Browser.version, "5.0.5");
    }
};

GIGO.check_browser_opera = function () {
    if (Browser.opera) {
        // Browser.version for opera reports "11.1" not "11.10"
        if (navigator.userAgent.search(/Version\/([0-9.]+)$/) >= 0) {
            if (RegExp.$1) {
                GIGO.check_version("Opera", RegExp.$1, "11.10");
            }
        }
    }
};


GIGO.check_versions = function () {
    GIGO.check_mac_os_version();
    GIGO.check_browser_firefox();
    GIGO.check_browser_opera();
};
