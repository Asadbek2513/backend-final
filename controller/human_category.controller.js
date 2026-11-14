const { HumanCategory, createSearchWhere, getAssociationOptions } = require('../models');

exports.postHumanCategory = async (req, res) => {
    try {
        const category = await HumanCategory.create(req.body);
        return res.status(201).json(await HumanCategory.findByPk(
            category.id,
            getAssociationOptions(HumanCategory)
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

exports.getHumanCategories = async (req, res) => {
    try {
        return res.status(200).json(await HumanCategory.findAll());
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getHumanCategoryById = async (req, res) => {
    try {
        const category = await HumanCategory.findByPk(
            req.params.id,
            getAssociationOptions(HumanCategory)
        );
        if (!category) return res.status(404).json(
            { 
                success: false, 
                message: "Yosh toifasi topilmadi" 
            }
        );
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateHumanCategory = async (req, res) => {
    try {
        const category = await HumanCategory.findByPk(req.params.id);
        if (!category) return res.status(404).json(
            { 
                success: false, 
                message: "Yosh toifasi topilmadi" 
            }
        );
        await category.update(req.body);
        return res.status(200).json(await HumanCategory.findByPk(
            req.params.id,
            getAssociationOptions(HumanCategory)
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

exports.searchHumanCategories = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(HumanCategory, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Yosh toifasi bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await HumanCategory.findAll(
            getAssociationOptions(HumanCategory, { where })
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

exports.deleteHumanCategory = async (req, res) => {
    try {
        const deleted = await HumanCategory.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Yosh toifasi topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Yosh toifasi o'chirildi" 
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
