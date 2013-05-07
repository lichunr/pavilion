var db = require('../lib/db');
var Globals = require('../lib/globals');
var Blog = require('./blog');
var markdown_meta = require('markdown-meta');
var _ = require('underscore');

var BlogManager = function (app) {
    this.tags = {};
    this.categories = {};
    this.blogs = [];

    var that = this;
    readBlogs(Globals.BLOG_FOLDER, Globals.MD_EXTENSION, function(blogs) {
        that.blogs = blogs || [];
        that.tags = collectTags(that.blogs);
        that.categories = collectCategories(that.blogs);

        app.set('blogManager', that);
    });

    this.getBlog = function(url) {
        var blog = _.find(this.blogs, function(b) {
            return b.url === url;
        });
        return blog;
    };
};

function readBlogs(folder, extension, next) {
    db.readAll(folder, extension, function (data) {
        var blogs = [];
        for (var i in data) {
            blogs.push(new Blog(data[i]));
        }
        next(blogs);
    }, markdown_meta.parse);
}

function collectTags(blogs) {
    var tags = {};
    return tags;
}

function collectCategories(blogs) {
    var categories = {};
    return categories;
}

module.exports = BlogManager;
