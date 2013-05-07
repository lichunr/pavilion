var _ = require('underscore');
var Blog = require('../models/blog');

module.exports = function(app) {
    function getManager() {
        return app.get('blogManager');
    }
    /* get request */
    app.get('/backend', function(req, res) {
        var blogs = getManager();
        res.render('backend/index');
    });
    app.get('/backend/add', function(req, res) {
        res.render('backend/editor');
    });
    app.get('/backend/view', function(req, res) {
        res.render('backend/view');
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
