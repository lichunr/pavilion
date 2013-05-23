var db = require('../lib/db');
var Globals = require('../lib/globals');
var Utils = require('../lib/utils');
var Blog = require('./blog');
var markdown_meta = require('markdown-meta');
var _ = require('underscore');

var BlogManager = function (app, next) {
    this.tags = {};
    this.categories = {};
    this.blogs = [];

    var that = this;
    readBlogs(Globals.BLOG_FOLDER, Globals.MD_EXTENSION, function(blogs) {
        that.blogs = blogs;
        that.tags = collectTags(that.blogs);
        that.categories = collectCategories(that.blogs);

        console.log('read blogs finished');

        app.set('blogManager', that);
        if (next) {
            next();
        }
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
        //data is the metadatas for all the blogs
        var blogs = [];
        for (var i in data) {
            var blog = new Blog(data[i]);
            var path = Utils.getBlogFilepath(blog.metadata.dateTime, blog.metadata.seo);
            
            if (blog.metadata.path != path) {
                console.log("blog:" + blog.metadata.path + " is not in the right directory, should be " + path);
                continue;
            }
            
            blogs.push(blog);
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
