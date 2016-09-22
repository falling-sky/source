GIGO.CheckTransparentDomain = function(s) {
    return (s == "test-ipv6.com" || s.endsWith(".test-ipv6.com"));
};


GIGO.CheckTransparent = function() {
    if (GIGO.CheckTransparentDomain(document.location.hostname)) {
        if (!GIGO.CheckTransparentDomain(MirrorConfig.load.domain)) {
            delete MirrorConfig.footer.html;
            delete MirrorConfig.footer.logo;
            MirrorConfig.footer.transparent=1;
            MirrorConfig.site = {
                "name": "test-ipv6.com",
                "contact": "Jason Fesler",
                "mailto": "jfesler@test-ipv6.com"
            };
            MirrorConfig.options = {
                "show_stats": "http://master.test-ipv6.com/stats.html",
                "survey": "/survey.php",
                "comment": "/comment.php",
                "ip": "/ip/",
                "comment_html": 1,
                "v6mtu": "mtu1280.test-ipv6-ct.comcast.net",
                "userdata": "master.test-ipv6.com",
            };

        }
    }
};


GIGO.CheckTransparent();
