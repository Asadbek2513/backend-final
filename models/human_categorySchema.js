const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const HumanCategory = defineModel(sequelize, DataTypes, 'HumanCategory', 'human_categories', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        start_age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        finish_age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    HumanCategory.associate = (models) => {
        HumanCategory.belongsTo(models.Gender, {
            foreignKey: 'gender_id',
            as: 'gender'
        });
        HumanCategory.hasMany(models.Event, {
            foreignKey: 'human_category_id',
            as: 'events'
        });
    };

    return HumanCategory;
};
