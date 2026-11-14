const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => defineModel(sequelize, DataTypes, 'Admin', 'admins', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    hashed_password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    is_creator: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    hashed_refresh_token: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    }
});
