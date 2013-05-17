var _ = require('underscore');
var Blog = require('../models/blog');
var Utils = require('../lib/utils');
var defaultMetadata = require('../lib/metadata');
var markdown_meta = require('markdown-meta');

module.exports = function(app) {
    function getManager() {
        return app.get('blogManager');
    }
    function refreshBlogs(next) {
        var BlogManager = require('../models/blogManager');
        new BlogManager(app, next);
    }

    /* get request */
    app.get('/backend', function(req, res) {
        var manager = getManager();
        res.render('backend/index', {blogs: manager.blogs});
    });
    app.get('/backend/add', function(req, res) {
        var content = markdown_meta.toMarkdown(defaultMetadata);
        res.render('backend/editor', {content: content});
    });
    app.get('/backend/:year/:month/:day/:seo', function(req, res) {
        var url = Utils.generateUrl(req.params.year, req.params.month, req.params.day, req.params.seo);
        var blog = getManager().getBlog(url);
        if (blog) {
            blog.getRaw(function(content) {
                res.render('backend/editor', {content: content, mode: 'edit'});
            });
        } else {
            res.send('no_blog_found');
        }
    });

    /* post&ajax request */
    app.get('/backend/refresh', function(req, res) {
        refreshBlogs(function() {
            res.send('ok');
        });
    });

    app.post('/backend/savepost', function(req, res) {
        var md = req.body.md;
        var metadata = markdown_meta.parse(md);
        var blog = new Blog(metadata);
        blog.save(md, function(err) {
            if (err) {
                res.send(err);
                return;
            }
            refreshBlogs(function() {
                res.send('ok');
            });
        });
    });
};
