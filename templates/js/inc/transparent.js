if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== "number" || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.lastIndexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

GIGO.CheckHTTPS = function(s) {
    console.log("document protocol %o",document.location.protocol);
    return document.location.protocol.startsWith("https");
};

GIGO.CheckTransparentDomain = function(s) {
    return s == "test-ipv6.com" || s.endsWith(".test-ipv6.com");
};

GIGO.CheckTransparent = function() {
    if (GIGO.CheckTransparentDomain(document.location.hostname)) {
        if (!GIGO.CheckTransparentDomain(MirrorConfig.load.domain)) {
            delete MirrorConfig.footer.html;
            delete MirrorConfig.footer.logo;
            MirrorConfig.footer.transparent = 1;
            MirrorConfig.site = {
                name: "test-ipv6.com",
                contact: "Jason Fesler",
                mailto: "jfesler@test-ipv6.com"
            };
            MirrorConfig.orig_options = JSON.parse(JSON.stringify(MirrorConfig.options));
            MirrorConfig.options.show_stats = GIGO.protocol + "master.test-ipv6.com/stats.html";
            MirrorConfig.options.survey = "/survey.php";
            MirrorConfig.options.comment = "/comment.php";
            MirrorConfig.options.comment_html = 1;
            MirrorConfig.options.v6mtu = "mtu1280." + MirrorConfig.load.domain;
            MirrorConfig.options.userdata = "master.test-ipv6.com";
            MirrorConfig.facebook =  {    "enable": 0,    "fb_admins": "688631212"  };
            MirrorConfig.twitter =  {  "enable": 0,    "name": "testipv6com"};

        }
    }
    console.log("CheckTransparent: MirrorConfig is now %o",MirrorConfig);
};

GIGO.CheckTransparent();
