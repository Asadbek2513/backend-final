const { CustomerCard, createSearchWhere, getAssociationOptions } = require('../models');

exports.postCustomerCard = async (req, res) => {
    try {
        return res.status(201).json(
            { 
                success: true, 
                data: await CustomerCard.findByPk(
                    (await CustomerCard.create(req.body)).id,
                    getAssociationOptions(CustomerCard)
                )
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

exports.getCustomerCards = async (req, res) => {
    try {
        return res.status(200).json(
            { 
                success: true, 
                data: await CustomerCard.findAll(getAssociationOptions(CustomerCard))
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

exports.getCustomerCardById = async (req, res) => {
    try {
        const card = await CustomerCard.findByPk(
            req.params.id,
            getAssociationOptions(CustomerCard)
        );
        if (!card) return res.status(404).json(
            { 
                success: false, 
                message: "Mijoz kartasi topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                data: card 
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

exports.updateCustomerCard = async (req, res) => {
    try {
        const card = await CustomerCard.findByPk(req.params.id);
        if (!card) return res.status(404).json(
            { 
                success: false, 
                message: "Mijoz kartasi topilmadi" 
            }
        );
        await card.update(req.body);
        return res.status(200).json(
            { 
                success: true, 
                data: await CustomerCard.findByPk(
                    req.params.id,
                    getAssociationOptions(CustomerCard)
                )
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

exports.searchCustomerCards = async (req, res) => {
    try {
        const query = String(req.query.query || '' ).trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(CustomerCard, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Mijoz kartasi bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                data: await CustomerCard.findAll(getAssociationOptions(CustomerCard, { where }))
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

exports.deleteCustomerCard = async (req, res) => {
    try {
        const deleted = await CustomerCard.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Mijoz kartasi topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Mijoz kartasi o'chirildi" 
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
