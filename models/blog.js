var Globals = require('../lib/globals.js');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var Blog = function() {
    this.metadata = {
        tags: [],
        category: [], //category has level, 0 is highest
        createTime: null,
        updateTime: null,
        seo : null
    };

    this.get = function (path) {
    };

    this.save = function (data, next) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var filepath = path.dirname(Globals.BLOG_FOLDER + "/" + year + "/" + month + "/" + day);
        var filename = this.metadata.seo + Globals.MD_EXTENSION;

        mkdirp(filepath, function (err) {
            if (err) {
                return next(err);
            }
            fs.writeFile(filepath + "/" + filename, data, function(err) {
                if (err) {
                    return next(err);
                }
                next();
            });
        });

    };
};

module.exports = Blog;
