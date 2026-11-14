const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const VenueTypes = defineModel(sequelize, DataTypes, 'VenueTypes', 'venue_types', {
        venueId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        typeId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    VenueTypes.associate = (models) => {
        VenueTypes.belongsTo(models.Venue, {
            foreignKey: 'venueId',
            as: 'venue'
        });
        VenueTypes.belongsTo(models.Types, {
            foreignKey: 'typeId',
            as: 'type'
        });
    };

    return VenueTypes;
};
