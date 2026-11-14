const { DeliveryMethod, createSearchWhere, getAssociationOptions } = require('../models');

exports.postDeliveryMethod = async (req, res) => {
    try {
        const method = await DeliveryMethod.create(req.body);
        return res.status(201).json(await DeliveryMethod.findByPk(
            method.id,
            getAssociationOptions(DeliveryMethod)
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

exports.getDeliveryMethods = async (req, res) => {
    try {
        return res.status(200).json(await DeliveryMethod.findAll(getAssociationOptions(DeliveryMethod)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getDeliveryMethodById = async (req, res) => {
    try {
        const method = await DeliveryMethod.findByPk(
            req.params.id,
            getAssociationOptions(DeliveryMethod)
        );
        if (!method) return res.status(404).json(
            { 
                success: false, 
                message: "Yetkazib berish usuli topilmadi" 
            }
        );
        return res.status(200).json(method);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateDeliveryMethod = async (req, res) => {
    try {
        const method = await DeliveryMethod.findByPk(req.params.id);
        if (!method) return res.status(404).json(
            { 
                success: false, 
                message: "Yetkazib berish usuli topilmadi" 
            }
        );
        await method.update(req.body);
        return res.status(200).json(await DeliveryMethod.findByPk(
            req.params.id,
            getAssociationOptions(DeliveryMethod)
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

exports.searchDeliveryMethods = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(DeliveryMethod, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Yetkazib berish usuli bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await DeliveryMethod.findAll(
            getAssociationOptions(DeliveryMethod, { where })
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

exports.deleteDeliveryMethod = async (req, res) => {
    try {
        const deleted = await DeliveryMethod.destroy(
            {
                where: { id: req.params.id }
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Yetkazib berish usuli topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Yetkazib berish usuli o'chirildi" 
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
