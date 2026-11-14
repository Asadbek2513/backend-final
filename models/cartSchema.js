const defineModel = require('./defineModel');

module.exports = (sequelize, DataTypes) => {
    const Cart = defineModel(sequelize, DataTypes, 'Cart', 'carts', {
        customer_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        finishedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        status_id: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        }
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.Customer, {
            foreignKey: 'customer_id',
            as: 'customer'
        });
        Cart.hasMany(models.CartItem, {
            foreignKey: 'cart_id',
            as: 'cartItems'
        });
    };

    return Cart;
};
