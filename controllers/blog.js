var marked = require( "marked" );
var markdown_meta = require( "markdown-meta" );
var Blog = require('../models/blog');

module.exports = function(app) {
    /* get request */
    app.get('/', function(req, res) {
        res.render('backend/editor');
    });

};
