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
            if (MirrorConfig.footer.transparent) {
              jQuery("#logo_operator").append("{{This instance of test-ipv6.com is provided by}} " + " ");
            } else {
              jQuery("#logo_operator").append("{{This mirror is provided by}}" + " ");
            }
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


// This is called very late, after the test completes
// but before "Other Sites" are checked.  We will by default
// wait until "late", to avoid interfering with the
// actual tests, since those are purely timing based.
GIGO.fix_footer_late = function () {
    if (MirrorConfig.footer) {
      if (!(MirrorConfig.footer.early)) {
        GIGO.fix_logo_as_html();
        GIGO.fix_logo_generic();
      }
    }
};

// This is called very early into the site startup.
// This gives the option of displaying any footer information
// at the risk of interfering with results.
GIGO.fix_footer_early = function() {


GIGO.facebook_like();
GIGO.twitter_tweet();



    if (MirrorConfig.footer) {
      if (MirrorConfig.footer.early) {
        GIGO.fix_logo_as_html();
        GIGO.fix_logo_generic();
      }
    }
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


GIGO.fixup_html_per_locale = function () {

  if (/bot|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex/i.test(navigator.userAgent)) {
    console.log("skipping link fixup (crawler)");
    return;
  }


  $('a').each(function() {
    var value = $(this).attr('href');
    // if value starts with "/" and ends in .html .. fix it.
    if (value === "/") {
      value="/index.html";
    }

    if (value.startsWith("/") && value.endsWith(".html")) {
        value=value+'.{{locale}}';
        $(this).attr('href',value);
        //console.log("fixup_html_per_locale fixed href %o",value);
    }   

  });
};
