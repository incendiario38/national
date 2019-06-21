let express = require('express');

let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

let routes = require('../routes/index');
let appeals = require('../routes/appeals');
let disturbances = require('../routes/disturbances');
let users = require('../routes/users');
let images = require('../routes/images');

module.exports = function (app, config) {
    let env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env === 'development';

    // view engine setup
    app.set('views', path.join(config.root, 'views'));
    app.set('view engine', 'pug');

    app.use(favicon(config.root + '/public/favicon.ico'));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());
    app.use(express.static(path.join(config.root, 'public')));

    app.use('/', routes);
    app.use('/api/appeals', appeals);
    app.use('/api/disturbances', disturbances);
    app.use('/api/users', users);
    app.use('/api/images', images);

    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handler
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error.pug', {
            message: err.message,
            error: (app.get('env') === 'development') ? err : {},
            title: 'error'
        });
    });
};