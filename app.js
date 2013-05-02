"use strict";

var express = require('express'),
    app = express();

var staticFolder = __dirname + '/static';

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');

    app.use(require('stylus').middleware({
        src: staticFolder,
        compress: true
    }));

    app.use(express.static(staticFolder));

    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: "pavilionCDE@#@",
    }));
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});

var marked = require( "marked" );
var markdown_meta = require( "markdown-meta" );
var fs = require('fs');

app.get('/', function(req, res) {
    fs.readFile('blogs/test.md', 'utf-8', function(err, data) { 
        console.log(markdown_meta.parse(data));
        res.render('backend/view', {content: marked(data)});
    });
});

var editorController = require('./controllers/editor')(app);

app.listen(1337);

console.log('Server running at http://127.0.0.1:1337/');
