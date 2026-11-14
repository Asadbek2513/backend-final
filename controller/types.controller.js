const { Types, createSearchWhere, getAssociationOptions } = require('../models');

exports.postType = async (req, res) => {
    try {
        const type = await Types.create(req.body);
        return res.status(201).json(await Types.findByPk(
            type.id,
            getAssociationOptions(Types)
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

exports.getTypes = async (req, res) => {
    try {
        return res.status(200).json(await Types.findAll(getAssociationOptions(Types)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getTypeById = async (req, res) => {
    try {
        const type = await Types.findByPk(req.params.id, getAssociationOptions(Types));
        if (!type) return res.status(404).json(
            { 
                success: false, 
                message: "Tur topilmadi" 
            }
        );
        return res.status(200).json(type);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateType = async (req, res) => {
    try {
        const type = await Types.findByPk(req.params.id);
        if (!type) return res.status(404).json(
            { 
                success: false, 
                message: "Tur topilmadi" 
            }
        );
        await type.update(req.body);
        return res.status(200).json(await Types.findByPk(
            req.params.id,
            getAssociationOptions(Types)
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

exports.searchTypes = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Types, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Tur bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Types.findAll(getAssociationOptions(Types, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteType = async (req, res) => {
    try {
        const deleted = await Types.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Tur topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Tur o'chirildi" 
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
