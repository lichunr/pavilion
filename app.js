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

app.listen(1337);

console.log('Server running at http://127.0.0.1:1337/');
