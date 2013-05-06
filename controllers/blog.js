var Blog = require('../models/blog');

module.exports = function(app, blogManager) {
    /* get request */
    app.get('/', function(req, res) {
        res.render('backend/editor');
    });

    /* post&ajax request */
    app.post('/backend/view', function(req, res) {
        res.send('ok');
    });
};
