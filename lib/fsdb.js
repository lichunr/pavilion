var fs = require('fs');
var mkdirp = require('mkdirp');
var walkdir = require('walkdir');
var path = require('path');
var Globals = require('../lib/globals.js');
var Utils = require('../lib/utils.js');

module.exports = function () {
    this.insert = function(id, data, next) {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var filepath = path.dirname(Globals.BLOG_FOLDER + "/" + year + "/" + month + "/" + day);
        var filename = id + Globals.MD_EXTENSION;

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

    this.select = function(path, next) {
        fs.readFile(path, 'utf-8', function(err, data) {
            next(data);
        });
    };

    this.readAll = function(folder, extention, next, parser) {
        var extention = extention || "";
        var blogPath = path.dirname() + "/" + folder;
        var results = [];
        var files = walkdir.sync(blogPath);
        for (var i in files) {
            var file = files[i];
            try {
                if (Utils.endWith(file, extention) === true) {
                    var data = fs.readFileSync(file, 'utf-8');
                    if (parser) {
                        var metadata = parser(data);
                        metadata.path = file.substring(file.indexOf(Globals.BLOG_FOLDER));
                        results.push(metadata);
                    } else {
                        results.push(data);
                    }
                }
            } catch (e) {}
        }
        next(results);
    };
};
