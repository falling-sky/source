/*global GIGO:true, jQuery,  window,  alert,  Browser */
/*jslint browser: true */

try {
    GIGO.tryme = 1;
} catch (e) {
    GIGO = {};
}

GIGO.hide_os_osx = function () {
    jQuery(".os_osx").hide(250);
};
GIGO.hide_os_ios = function () {
    jQuery(".os_ios").hide(250);
};
GIGO.hide_os_other = function () {
    jQuery(".os_other").hide(250);
};
GIGO.hide_os_windows = function () {
    jQuery(".os_windows").hide(250);
};
GIGO.hide_os_linux = function () {
    jQuery(".os_linux").hide(250);
};

GIGO.hide_os_all = function () {
    GIGO.hide_os_other();
    GIGO.hide_os_osx();
    GIGO.hide_os_ios();
    GIGO.hide_os_windows();
    GIGO.hide_os_linux();
};

GIGO.show_os_osx = function () {
    jQuery(".os_osx").show(250);
};
GIGO.show_os_ios = function () {
    jQuery(".os_ios").show(250);
};
GIGO.show_os_windows = function () {
    jQuery(".os_windows").show(250);
};
GIGO.show_os_linux = function () {
    jQuery(".os_linux").show(250);
};
GIGO.show_os_other = function () {
    jQuery(".os_other").show(250);
};

GIGO.show_os_all = function () {
    GIGO.show_os_other();
    GIGO.show_os_osx();
    GIGO.show_os_ios();
    GIGO.show_os_windows();
    GIGO.show_os_linux();
};

GIGO.show_os_only_osx = function () {
    GIGO.hide_os_all();
    GIGO.show_os_osx();
};
GIGO.show_os_only_ios = function () {
    GIGO.hide_os_all();
    GIGO.show_os_ios();
};
GIGO.show_os_only_windows = function () {
    GIGO.hide_os_all();
    GIGO.show_os_windows();
};
GIGO.show_os_only_linux = function () {
    GIGO.hide_os_all();
    GIGO.show_os_linux();
};

GIGO.show_os_start = function () {
    if (Browser.Platform.mac) {
        GIGO.show_os_only_osx();
    } else if (Browser.Platform.windows) {
        GIGO.show_os_only_windows();
    } else if (Browser.Platform.linux) {
        GIGO.show_os_only_linux();
    } else if (Browser.Platform.ios) {
        GIGO.show_os_only_ios();
    } else {
        // Be aware we will show ALL platforms we know about.  
    }
};
