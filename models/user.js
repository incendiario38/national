'use strict';

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define('User', {
        firstName: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        patronymic: DataTypes.STRING,
        email: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
            unique: true
        },
        phoneNumber: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
            }
        },
        postcode: {
            allowNull: false,
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
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 32],
                    msg: "Minimum 6 and maximum 32 characters allowed in password",
                },
                notEmpty: true
            },
            get() {
                return () => this.getDataValue('password')
            }
        }
    }, {});
    User.associate = function (models) {
        User.hasMany(models.Appeal, {
            foreignKey: 'userID',
            as: 'appeals',
        });
    };
    return User;
};