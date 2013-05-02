var Blog = require('../models/blog');
var markdown_meta = require('markdown-meta');

module.exports = function(app) {
    /* get request */
    app.get('/backend', function(req, res) {
        res.render('backend/editor');
    });

    /* post&ajax request */
    app.post('/backend/add', function(req, res) {
        var md = req.body.md;
        var metadata = markdown_meta.parse(md);
        var blog = new Blog();
        blog.metadata = metadata;
        blog.save(md, function(err) {
            if (err) {
                res.send(err);
                return;
            }
            res.send('ok');
        });
    });
};
