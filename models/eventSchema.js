const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Event = defineModel(sequelize, DataTypes, 'Event', 'events', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        start_time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        finish_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        finish_time: {
            type: DataTypes.STRING,
            allowNull: false
        },
        info: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        event_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        human_category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        venue_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lang_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    Event.associate = (models) => {
        Event.belongsTo(models.EventType, {
            foreignKey: 'event_type_id',
            as: 'eventType'
        });
        Event.belongsTo(models.HumanCategory, {
            foreignKey: 'human_category_id',
            as: 'humanCategory'
        });
        Event.belongsTo(models.Venue, {
            foreignKey: 'venue_id',
            as: 'venue'
        });
        Event.belongsTo(models.Lang, {
            foreignKey: 'lang_id',
            as: 'language'
        });
        Event.hasMany(models.Ticket, {
            foreignKey: 'event_id',
            as: 'tickets'
        });
    };

    return Event;
};
