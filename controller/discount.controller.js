const { Discount, createSearchWhere, getAssociationOptions } = require('../models');

exports.postDiscount = async (req, res) => {
    try {
        const discount = await Discount.create(req.body);
        return res.status(201).json(await Discount.findByPk(
            discount.id,
            getAssociationOptions(Discount)
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

exports.getDiscounts = async (req, res) => {
    try {
        return res.status(200).json(await Discount.findAll(getAssociationOptions(Discount)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getDiscountById = async (req, res) => {
    try {
        const discount = await Discount.findByPk(
            req.params.id,
            getAssociationOptions(Discount)
        );
        if (!discount) return res.status(404).json(
            { 
                success: false, 
                message: "Chegirma topilmadi" 
            }
        );
        return res.status(200).json(discount);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateDiscount = async (req, res) => {
    try {
        const discount = await Discount.findByPk(req.params.id);
        if (!discount) return res.status(404).json(
            { 
                success: false, 
                message: "Chegirma topilmadi" 
            }
        );
        await discount.update(req.body);
        return res.status(200).json(await Discount.findByPk(
            req.params.id,
            getAssociationOptions(Discount)
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

exports.searchDiscounts = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Discount, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Chegirma bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Discount.findAll(getAssociationOptions(Discount, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteDiscount = async (req, res) => {
    try {
        const deleted = await Discount.destroy(
            {
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Chegirma topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Chegirma o'chirildi" 
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
