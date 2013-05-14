var _ = require('underscore');
var Blog = require('../models/blog');
var Utils = require('../lib/utils');

module.exports = function(app) {
    function getManager() {
        return app.get('blogManager');
    }
    /* get request */
    app.get('/backend', function(req, res) {
        var manager = getManager();
        res.render('backend/index', {blogs: manager.blogs});
    });
    app.get('/backend/add', function(req, res) {
        res.render('backend/editor');
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
    app.post('/backend/addpost', function(req, res) {
        var md = req.body.md;
        var blog = new Blog(md);
        blog.save(function(err) {
            if (err) {
                res.send(err);
                return;
            }
            res.send('ok');
        });
    });
};
