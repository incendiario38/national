'use strict';
let fs = require('fs');
let path = require('path');
let Sequelize = require('sequelize');
let basename = path.basename(__filename);
let config = require('../config/config');
let sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, config.db.options);
let db = {};

// Загрузка моделей for PROD
// fs
//     .readdirSync(__dirname)
//     .filter(file => {
//         return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//     })
//     .forEach(file => {
//         let model = sequelize['import'](path.join(__dirname, file));
//         db[model.name] = model;
//     });

// Загрузка моделей for DEV
db['Appeal'] = sequelize['import']('./appeal');
db['Disturbance'] = sequelize['import']('./disturbance');
db['Image'] = sequelize['import']('./image');
db['Token'] = sequelize['import']('./token');
db['User'] = sequelize['import']('./user');

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;