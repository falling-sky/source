
GIGO.ood_url = function () {
    var url;
    try {
        hash = jQuery.md5(MirrorConfig.load.domain);
        hash = hash.replace(/[^a-zA-Z0-9]/g, '');
        hash = hash.substring(0, 8);
        url = "//test-ipv6.com/images/ood_" + hash + ".png";
    } catch (err) {
    };
    return url;
};
