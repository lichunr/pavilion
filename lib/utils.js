(function() {
    "use strict";
    var path = require('path');
    var Globals = require('../lib/globals.js');

    function endWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    function generateUrl(y, m, d, seo) {
        return y + "/" + m + "/" + d + "/" + seo;
    }
    function getBlogFilepath(date, filename) {
        if (!date || !filename) {
            return null;
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var filepath = path.dirname(Globals.BLOG_FOLDER + "/" + year + "/" + month + "/" + day);
        var filename = filename + Globals.MD_EXTENSION;
        return filepath + "/" + filename;
    }

    module.exports.endWith = endWith;
    module.exports.generateUrl = generateUrl;
    module.exports.getBlogFilepath = getBlogFilepath;
})();
