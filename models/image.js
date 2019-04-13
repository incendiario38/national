'use strict';
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Images', {
        appealID: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        linkImages: {
            allowNull: false,
            type: DataTypes.STRING
        },
        kind: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
    }, {});
    Image.associate = function (models) {
        Image.belongsTo(models.Appeal, {
            foreignKey: 'appealID',
            as: 'appeal'
        });
    };
    return Image;
};