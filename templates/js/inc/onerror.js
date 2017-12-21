/*
** Report errors centrally, if not using IE6.
** Do this as a fake image fetch - avoids any risk
** of loading foreign code into the browser.
*/
window.onerror = function(message, url, linenumber) {
    var eurl;
    if (/\bMSIE 6/.test(navigator.userAgent) && !window.opera) {
        if (linenumber && parseInt(linenumber) < 100) {
            return;
        }
    }
    if (url && linenumber) {
        eurl = GIGO.protocol + "ds.master.test-ipv6.com/errors.php?";
        eurl = eurl + "message=" + encodeURIComponent(message);
        eurl = eurl + "&url=" + encodeURIComponent(url);
        eurl = eurl + "&linenumber=" + encodeURIComponent(linenumber);
        eurl = eurl + "&lang=" + encodeURIComponent("{{langUC}}");
        eurl = eurl + "&version=" + encodeURIComponent("[% .GitInfo.Version %]");
        new Image().src = eurl;
    }
    return false;
};
