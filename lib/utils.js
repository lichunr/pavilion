(function() {
    "use strict";

    function endWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    function generateUrl(y, m, d, seo) {
        return y + "/" + m + "/" + d + "/" + seo;
    }

    module.exports.endWith = endWith;
    module.exports.generateUrl = generateUrl;
})();
