var db = require('../lib/db');
var Globals = require('../lib/globals');
var markdown_meta = require('markdown-meta');

var BlogManager = function () {
    this.tags = {};
    this.metadatas = {};

    readBlogs(Globals.BLOG_FOLDER, Globals.MD_EXTENSION, function(metadatas) {
        this.metadatas = metadatas || [];
    });
};

function readBlogs(folder, extension, next) {
    db.readAll(folder, extension, function (err, data) {
        if (err) {
            console.log(err);
        }
        next(data);
    }, markdown_meta.parse);    
}

function collectTags() {
}

function collectCategories() {
}

module.exports = BlogManager;
