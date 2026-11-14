const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const EventType = defineModel(sequelize, DataTypes, 'EventType', 'event_types', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parent_event_type_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    EventType.associate = (models) => {
        EventType.belongsTo(models.EventType, {
            foreignKey: 'parent_event_type_id',
            as: 'parent'
        });
        EventType.hasMany(models.EventType, {
            foreignKey: 'parent_event_type_id',
            as: 'children'
        });
        EventType.hasMany(models.Event, {
            foreignKey: 'event_type_id',
            as: 'events'
        });
    };

    return EventType;
};
