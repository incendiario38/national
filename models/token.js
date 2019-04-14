'use strict';
module.exports = (sequelize, DataTypes) => {
    let Token = sequelize.define('Token', {
        token: {
            type: DataTypes.STRING(512),
            validate: {
                notEmpty: true
            }
        },
        status: {
            defaultValue: 'active',
            type: DataTypes.ENUM,
            values: ['active', 'inactive']
        }
    }, {});

    Token.associate = (models) => {
        Token.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Token;
};