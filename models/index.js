'use strict';
require('dotenv').config();

const Sequelize = require('sequelize');
const config = require('../config/config');


let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {
    User: sequelize['import']('./user'),
    Appeal: sequelize['import']('./appeal'),
    Disturbance: sequelize['import']('./disturbance'),
    Image: sequelize['import']('./image'),
};

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;