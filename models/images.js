'use strict';
module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define('Images', {
        appealID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        linkImages: {
            type: DataTypes.STRING,
            allowNull: false
        },
        kind: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {});
    Images.associate = function (models) {
        Images.belongsTo(models.Appeal, {
            foreignKey: 'appealID',
            as: 'appeal'
        });
    };
    return Images;
};