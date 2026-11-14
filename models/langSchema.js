const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Lang = defineModel(sequelize, DataTypes, 'Lang', 'langs', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Lang.associate = (models) => {
        Lang.hasMany(models.Customer, {
            foreignKey: 'lang_id',
            as: 'customers'
        });
        Lang.hasMany(models.Event, {
            foreignKey: 'lang_id',
            as: 'events'
        });
    };

    return Lang;
};
