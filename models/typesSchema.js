const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Types = defineModel(sequelize, DataTypes, 'Types', 'types', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Types.associate = (models) => {
        Types.hasMany(models.VenueTypes, {
            foreignKey: 'typeId',
            as: 'venueTypes'
        });
    };

    return Types;
};
