var Blog = require('../models/blog');
var Utils = require('../lib/utils');

module.exports = function(app) {
    function getManager() {
        return app.get('blogManager');
    }
    /* get request */
    app.get('/', function(req, res) {
        var manager = getManager();
        res.render('frontend/index', {blogs: manager.blogs});
    });

    app.get('/:year/:month/:day/:seo', function(req, res) {
        var url = Utils.generateUrl(req.params.year, req.params.month, req.params.day, req.params.seo);
        var blog = getManager().getBlog(url);
        if (blog) {
            blog.get(function(content) {
                res.render('frontend/view', {content: content});
            });
        } else {
            res.send('no_blog_found');
        }
    });
};
