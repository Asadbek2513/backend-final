module.exports = (sequelize, DataTypes, name, tableName, fields) => sequelize.define(
    name,
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ...fields
    },
    {
        tableName,
        timestamps: false
    }
);
