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

        let og  = JSON.parse(JSON.stringify(MirrorConfig.options));


        // Bias the reporting location if the user is visiting a specific flavor of the site.
        let master = "master.test-ipv6.com"
        if (document.location.hostname.startsWith("ipv6.")) {
            master = "ipv6.master.test-ipv6.com";
        }
        if (document.location.hostname.startsWith("ipv4.")) {
            master = "ipv4.master.test-ipv6.com";
        }
        if (document.location.hostname.startsWith("ds.")) {
            master = "ds.master.test-ipv6.com";
        }
        console.log("document.location.hostname is %o",document.location.hostname);
        console.log("master is %o",master);


        // Always replace certain things when it's test-ipv6.com
        delete MirrorConfig.footer.html;
        delete MirrorConfig.footer.logo;
        MirrorConfig.footer.transparent = 1;
        MirrorConfig.site = {
            name: "test-ipv6.com",
            contact: "Jason Fesler",
            mailto: "jfesler@test-ipv6.com"
        };
        MirrorConfig.options.show_stats = GIGO.protocol + master + "/stats.html";
        MirrorConfig.options.comment_html = 1;
        MirrorConfig.options.userdata = master;
        MirrorConfig.facebook =  {    "enable": 0,    "fb_admins": "688631212"  };
        MirrorConfig.twitter =  {  "enable": 0,    "name": "testipv6com"};
        // Only replace these, if the underlying domain is something else.
        if (!GIGO.CheckTransparentDomain(MirrorConfig.load.domain)) {
            MirrorConfig.orig_options = og;
            MirrorConfig.options.survey = "/survey.php";
            MirrorConfig.options.comment = "/comment.php";
            MirrorConfig.options.userdata = master;
            MirrorConfig.options.v6mtu = "mtu1280." + MirrorConfig.load.domain;
        }
    }
    console.log("CheckTransparent: MirrorConfig is now %o",MirrorConfig);
};

GIGO.CheckTransparent();
