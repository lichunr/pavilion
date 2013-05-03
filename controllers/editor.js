var Blog = require('../models/blog');

module.exports = function(app) {
    /* get request */
    app.get('/backend', function(req, res) {
        res.render('backend/editor');
    });

    /* post&ajax request */
    app.post('/backend/add', function(req, res) {
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
