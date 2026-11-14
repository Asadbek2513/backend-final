const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Customer = defineModel(sequelize, DataTypes, 'Customer', 'customers', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hashed_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        gender_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        lang_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        hashed_refresh_token: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        }
    });

    Customer.associate = (models) => {
        Customer.belongsTo(models.Gender, {
            foreignKey: 'gender_id',
            as: 'gender'
        });
        Customer.belongsTo(models.Lang, {
            foreignKey: 'lang_id',
            as: 'language'
        });
        Customer.hasMany(models.CustomerAddress, {
            foreignKey: 'customer_id',
            as: 'addresses'
        });
        Customer.hasMany(models.CustomerCard, {
            foreignKey: 'customer_id',
            as: 'cards'
        });
        Customer.hasMany(models.Cart, {
            foreignKey: 'customer_id',
            as: 'carts'
        });
    };

    return Customer;
};
