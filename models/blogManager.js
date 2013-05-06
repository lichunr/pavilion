var db = require('../lib/db');
var Globals = require('../lib/globals');
var markdown_meta = require('markdown-meta');

var BlogManager = function () {
    this.tags = {};
    this.categories = {};
    this.metadatas = {};

    readBlogs(Globals.BLOG_FOLDER, Globals.MD_EXTENSION, function(metadatas) {
        this.metadatas = metadatas || [];
        console.log(this.metadatas);
        this.tags = collectTags(this.metadatas);
        this.categories = collectCategories(this.metadatas);
    });
};

function readBlogs(folder, extension, next) {
    db.readAll(folder, extension, function (data) {
        next(data);
    }, markdown_meta.parse);    
}

function collectTags(metadatas) {
    var tags = {};
    return tags;
}

function collectCategories(metadatas) {
    var categories = {};
    return categories;
}

module.exports = BlogManager;
