var db = require('../lib/db');
var marked = require('marked');
var Utils = require('../lib/utils');

var Blog = function(metadata) {
    this.metadata = metadata;
    this.path = metadata.path;
    if (!this.metadata.dateTime) {
        this.metadata.dateTime = new Date;
    }
    this.url = Utils.generateUrl(this.metadata.dateTime.getFullYear(), this.metadata.dateTime.getMonth() + 1, this.metadata.dateTime.getDate(), this.metadata.seo);

    this.get = function (next) {
        db.select(this.path, function(data) {
            next(marked(data));
        });
    };

    this.getRaw = function (next) {
        db.select(this.path, function(data) {
            next(data);
        });
    };

    this.save = function (md, next) {
        if (!this.metadata.seo) {
            next("no_seo");
            return;
        }
        if (!this.metadata.title) {
            next("no_title");
            return;
        }
        if (!this.metadata.dateTime) {
            this.metadata.dateTime = new Date;
        }
        db.insert(this.metadata.seo, md, next);
    };
};

module.exports = Blog;
