let express = require('express');
let config = require('./config/config');

let app = express();

require('./config/express')(app, config);

module.exports = app;