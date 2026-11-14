const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => defineModel(sequelize, DataTypes, 'Country', 'countries', {
    country_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
