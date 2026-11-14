const { Lang, createSearchWhere, getAssociationOptions } = require('../models');

exports.postLang = async (req, res) => {
    try {
        const lang = await Lang.create(req.body);
        return res.status(201).json(await Lang.findByPk(
            lang.id,
            getAssociationOptions(Lang)
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

exports.getLangs = async (req, res) => {
    try {
        return res.status(200).json(await Lang.findAll(getAssociationOptions(Lang)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getLangById = async (req, res) => {
    try {
        const lang = await Lang.findByPk(req.params.id, getAssociationOptions(Lang));
        if (!lang) return res.status(404).json(
            { 
                success: false, 
                message: "Til topilmadi" 
            }
        );
        return res.status(200).json(lang);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateLang = async (req, res) => {
    try {
        const lang = await Lang.findByPk(req.params.id);
        if (!lang) return res.status(404).json(
            { 
                success: false, 
                message: "Til topilmadi" 
            }
        );
        await lang.update(req.body);
        return res.status(200).json(await Lang.findByPk(
            req.params.id,
            getAssociationOptions(Lang)
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

exports.searchLangs = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Lang, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Til bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Lang.findAll(getAssociationOptions(Lang, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteLang = async (req, res) => {
    try {
        const deleted = await Lang.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Til topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Til o'chirildi" 
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
