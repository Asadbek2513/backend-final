const { Cart, createSearchWhere, getAssociationOptions } = require('../models');

exports.postCart = async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        return res.status(201).json(await Cart.findByPk(
            cart.id,
            getAssociationOptions(Cart)
        ));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getCarts = async (req, res) => {
    try {
        return res.status(200).json(await Cart.findAll(getAssociationOptions(Cart)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getCartById = async (req, res) => {
    try {
        const cart = await Cart.findByPk(
            req.params.id,
            getAssociationOptions(Cart)
        );
        if (!cart) return res.status(404).json(
            { 
                success: false, 
                message: "Savat topilmadi" 
            }
        );
        return res.status(200).json(cart);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByPk(req.params.id);
        if (!cart) return res.status(404).json(
            { 
                success: false, 
                message: "Savat topilmadi" 
            }
        );
        await cart.update(req.body);
        return res.status(200).json(await Cart.findByPk(
            req.params.id,
            getAssociationOptions(Cart)
        ));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.searchCarts = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Cart, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Savat bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Cart.findAll(getAssociationOptions(Cart, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteCart = async (req, res) => {
    try {
        const deleted = await Cart.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Savat topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Savat o'chirildi" 
            }
        );
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};
