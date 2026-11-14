const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const VenuePhoto = defineModel(sequelize, DataTypes, 'VenuePhoto', 'venue_photos', {
        venueId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    VenuePhoto.associate = (models) => {
        VenuePhoto.belongsTo(models.Venue, {
            foreignKey: 'venueId',
            as: 'venue'
        });
    };

    return VenuePhoto;
};
