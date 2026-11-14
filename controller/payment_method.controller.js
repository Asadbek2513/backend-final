const { PaymentMethod, createSearchWhere, getAssociationOptions } = require('../models');

exports.postPaymentMethod = async (req, res) => {
    try {
        const method = await PaymentMethod.create(req.body);
        return res.status(201).json(await PaymentMethod.findByPk(
            method.id,
            getAssociationOptions(PaymentMethod)
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

exports.getPaymentMethods = async (req, res) => {
    try {
        return res.status(200).json(await PaymentMethod.findAll(getAssociationOptions(PaymentMethod)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getPaymentMethodById = async (req, res) => {
    try {
        const method = await PaymentMethod.findByPk(
            req.params.id,
            getAssociationOptions(PaymentMethod)
        );
        if (!method) return res.status(404).json(
            { 
                success: false, 
                message: "To'lov usuli topilmadi" 
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

exports.updatePaymentMethod = async (req, res) => {
    try {
        const method = await PaymentMethod.findByPk(req.params.id);
        if (!method) return res.status(404).json(
            { 
                success: false, 
                message: "To'lov usuli topilmadi" 
            }
        );
        await method.update(req.body);
        return res.status(200).json(await PaymentMethod.findByPk(
            req.params.id,
            getAssociationOptions(PaymentMethod)
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

exports.searchPaymentMethods = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(PaymentMethod, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "To'lov usuli bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await PaymentMethod.findAll(
            getAssociationOptions(PaymentMethod, { where })
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

exports.deletePaymentMethod = async (req, res) => {
    try {
        const deleted = await PaymentMethod.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "To'lov usuli topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "To'lov usuli o'chirildi" 
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
