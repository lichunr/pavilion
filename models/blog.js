var db = require('../lib/db');
var marked = require('marked');
var Utils = require('../lib/utils');

var Blog = function(metadata) {
    this.seo = metadata.seo;
    this.path = metadata.path;
    this.title = metadata.title || metadata.seo;
    this.tags = metadata.tags || {};
    this.categories = metadata.categories || {};
    this.dateTime = metadata.dateTime || new Date;
    this.url = Utils.generateUrl(this.dateTime.getFullYear(), this.dateTime.getMonth() + 1, this.dateTime.getDate(), this.seo);

    this.get = function (next) {
        db.select(this.path, function(data) {
            next(marked(data));
        });
    };

    this.save = function (md, next) {
        if (!this.seo) {
            next("no_seo");
            return;
        }
        db.insert(this.seo, md, next);
    };
};

module.exports = Blog;
