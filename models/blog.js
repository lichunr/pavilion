var db = require('../lib/db');
var markdown_meta = require('markdown-meta');

var Blog = function(md) {
    this.md = md || "";
    this.metadata = markdown_meta.parse(md) || {};

    this.get = function (path, next) {
        db.select(path, function(data) {
            next(data);
        });
    };

    this.save = function (next) {
        if (!this.metadata.seo) {
            next("no_seo");
            return;
        }
        db.insert(this.metadata.seo, this.md, next);
    };
};

module.exports = Blog;
