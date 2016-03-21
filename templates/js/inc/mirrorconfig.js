/*global GIGO, MirrorConfig, $gt, jQuery,  window,  alert,  Browser */

/* TODO consider having something on the debug screen for missing variables */

GIGO.mirrorconfig = function (key1, key2, fallback) {
    var ret;
    try {
        ret = MirrorConfig[key1][key2]; 
        if (typeof ret === "undefined") {
          ret = fallback;
        }
    } catch (e) {
        ret = fallback;
    }
    return ret;
};

/* Look for <span lookup=site.name>x</span> and replace "x" wih the config.js values */

GIGO.fix_logo_as_html = function () {
    if (MirrorConfig.footer.html) {
        jQuery("#logo").load(MirrorConfig.footer.html);
    }
};

GIGO.fix_logo_generic = function () {
    // logo, operator, link
    if (MirrorConfig.footer.logo || MirrorConfig.footer.operator) {
        if (MirrorConfig.footer.logo) {
            jQuery("#logo_img").append(jQuery("<img>", {
                src: MirrorConfig.footer.logo
            }));
        }
        if (MirrorConfig.footer.operator) {
            jQuery("#logo_operator").append("{{This mirror is provided by}}" + " ");
            if (MirrorConfig.footer.link) {
                jQuery("#logo_operator").append(jQuery("<a>", {
                    text: MirrorConfig.footer.operator,
                    href: MirrorConfig.footer.link,
                    target: "_blank"
                }));
            } else {
                jQuery("#logo_operator").append(jQuery("<span>").text(MirrorConfig.footer.operator));
            }
        }
    }
};

GIGO.fix_footer = function () {
    GIGO.fix_logo_as_html();
    GIGO.fix_logo_generic();
};


GIGO.fixup_html_per_site_config = function () {
    var key1, key2, find, sel;
    // First, do search/replace stuff.
    for (key1 in MirrorConfig) {
        if (MirrorConfig.hasOwnProperty(key1)) {
            for (key2 in MirrorConfig[key1]) {
                if (MirrorConfig[key1].hasOwnProperty(key2)) {
                    find = key1 + "." + key2;
                    sel = "span[lookup='" + find + "']";
                    jQuery(sel).text(MirrorConfig[key1][key2]);

                    sel = "div[lookup='" + find + "']";
                    jQuery(sel).html(MirrorConfig[key1][key2]);

                    sel = "a[linkup='" + find + "']";
                    jQuery(sel).attr("href", MirrorConfig[key1][key2]);

                    sel = "img[src='" + find + "']";
                    jQuery(sel).attr("src", MirrorConfig[key1][key2]);

                    sel = "a[mailto='" + find + "']";
                    jQuery(sel).attr("href", "mailto:" + MirrorConfig[key1][key2]);


                }
            }
        }
    }

};
