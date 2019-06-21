'use strict';

let crypto = require('crypto');

/**
 * Генерирует хеш
 * @param salt
 * @param pwd
 * @returns {string}
 */
let hashPassword = function (salt, pwd) {
    let key = crypto.pbkdf2Sync(pwd, salt, 10, 64, 'sha512');
    return key.toString('hex');
};

/**
 * Генерирует соль
 * @returns {string}
 */
let createSalt = function () {
    return crypto.randomBytes(64).toString('hex');
};

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: {
                    args: 3,
                    msg: "First name must be atleast 3 characters in length"
                }
            }
        },
        lastName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: {
                    args: 3,
                    msg: "Last name must be atleast 3 characters in length"
                }
            }
        },
        patronymic: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msq: "Email address must be valid"
                },
                notEmpty: true,
            },
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        address: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        postcode: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 6],
                    msg: "6 characters allowed in postcode"
                },
                notEmpty: true,
            }
        },
        password: {
            type: DataTypes.STRING(512),
            validate: {
                len: {
                    args: [6, 32],
                    msg: "Minimum 6 and maximum 32 characters allowed in password",
                },
                notEmpty: true
            }
        },
        salt: {
            type: DataTypes.STRING(512),
        }
    }, {});

    User.beforeCreate((user) => {
        user.salt = createSalt();
        user.password = hashPassword(user.salt, user.password);
    });

    User.associate = (models) => {
        models.User.hasMany(models.Appeal, {
            foreignKey: 'userId',
            as: 'appeals'
        });
        models.User.hasMany(models.Token, {
            foreignKey: 'userId',
            as: 'tokens'
        });
    };

    /**
     * Возвращает true - если пароль верен, иначе - false
     * @param password
     * @returns {boolean}
     */
    User.prototype.authenticate = function (password) {
        return hashPassword(this.salt, password) === this.password;
    };

    return User;
};