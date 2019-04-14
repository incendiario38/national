require('dotenv').config();

let path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

let config = {
    root: rootPath,
    port: process.env.PORT || '3000',
    db: {
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        options: {
            host: process.env.DB_HOST,
            dialect: 'postgres'
        }
    }
};

module.exports = config;