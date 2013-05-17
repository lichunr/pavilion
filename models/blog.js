var db = require('../lib/db');
var marked = require('marked');
var Utils = require('../lib/utils');
var Globals = require('../lib/globals.js');

var Blog = function(metadata) {
    this.metadata = metadata;
    this.url = Utils.generateUrl(this.metadata.dateTime.getFullYear(), this.metadata.dateTime.getMonth() + 1, this.metadata.dateTime.getDate(), this.metadata.seo);

    this.get = function (next) {
        db.select(this.metadata.path, function(data) {
            next(marked(data));
        });
    };

    this.getRaw = function (next) {
        db.select(this.metadata.path, function(data) {
            next(data);
        });
    };

    this.save = function (md, next) {
        this.metadata.path = Utils.getBlogFilepath(this.metadata.dateTime, this.metadata.seo);

        db.insert(this.metadata.path, md, next);
    };
};

module.exports = Blog;
