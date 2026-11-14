const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Venue = defineModel(sequelize, DataTypes, 'Venue', 'venues', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        site: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        schema: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        region_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        district_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Venue.associate = (models) => {
        Venue.belongsTo(models.Region, {
            foreignKey: 'region_id',
            as: 'region'
        });
        Venue.belongsTo(models.District, {
            foreignKey: 'district_id',
            as: 'district'
        });
        Venue.hasMany(models.Event, {
            foreignKey: 'venue_id',
            as: 'events'
        });
        Venue.hasMany(models.Seat, {
            foreignKey: 'venue_id',
            as: 'seats'
        });
        Venue.hasMany(models.VenuePhoto, {
            foreignKey: 'venueId',
            as: 'photos'
        });
        Venue.hasMany(models.VenueTypes, {
            foreignKey: 'venueId',
            as: 'venueTypes'
        });
    };

    return Venue;
};
