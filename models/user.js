'use strict';
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        firstName: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        lastName: {

            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        patronymic: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
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
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 32],
                    msg: "Minimum 6 and maximum 32 characters allowed in password",
                },
                notEmpty: true
            }
        }
    }, {});

    User.associate = (models) => {
        models.User.hasMany(models.Appeal);
        models.User.hasMany(models.Token);
    };

    return User;
};