'use strict';
module.exports = (sequelize, DataTypes) => {
    const Images = sequelize.define('Images', {
        appealID: DataTypes.INTEGER,
        linkImages: DataTypes.STRING,
        kind: DataTypes.INTEGER
    }, {});
    Images.associate = function (models) {
        Images.belongsTo(models.Appeal, {
            foreignKey: 'appealID',
            as: 'appeal'
        });
    };
    return Images;
};