var fs = require('fs');
var mkdirp = require('mkdirp');
var walkdir = require('walkdir');
var path = require('path');
var Globals = require('../lib/globals.js');
var Utils = require('../lib/utils.js');

module.exports = function () {
    this.insert = function(file, data, next) {
        var filepath = path.dirname(file);
        mkdirp(filepath, function (err) {
            if (err) {
                return next(err);
            }
            fs.writeFile(file, data, function(err) {
                if (err) {
                    return next(err);
                }
                console.log('save data to ' + file);
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
