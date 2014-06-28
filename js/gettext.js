/*global GIGO, jQuery, alert, $gt:true*/

/* Used to fetch external strings, to make localization a bit easier. */

GIGO.gettext = function (a, b) {
    var c;
    try {
        c = GIGO.gettext_messages[a][b];
    } catch (e) {
        return "[NO TEXT: " + a + " " + b + "]";
    }
    if (c) {
        return c;
    }
    return "[NO TEXT: " + a + " " + b + "]";
};

/* global $gt(a,b) polution - for gettext */
$gt = GIGO.gettext;

$gt = function () {
    console.log("whoops still using $gt");
};
