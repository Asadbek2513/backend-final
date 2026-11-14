const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Gender = defineModel(sequelize, DataTypes, 'Gender', 'genders', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Gender.associate = (models) => {
        Gender.hasMany(models.Customer, {
            foreignKey: 'gender_id',
            as: 'customers'
        });
        Gender.hasMany(models.HumanCategory, {
            foreignKey: 'gender_id',
            as: 'humanCategories'
        });
    };

    return Gender;
};
