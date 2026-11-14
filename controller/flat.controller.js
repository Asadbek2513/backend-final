const { Flat, createSearchWhere, getAssociationOptions } = require('../models');

exports.postFlat = async (req, res) => {
    try {
        const flat = await Flat.create(req.body);
        return res.status(201).json(await Flat.findByPk(
            flat.id,
            getAssociationOptions(Flat)
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

exports.getFlats = async (req, res) => {
    try {
        return res.status(200).json(await Flat.findAll(getAssociationOptions(Flat)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getFlatById = async (req, res) => {
    try {
        const flat = await Flat.findByPk(req.params.id, getAssociationOptions(Flat));
        if (!flat) return res.status(404).json(
            { 
                success: false, 
                message: "Xonadon topilmadi" 
            }
        );
        return res.status(200).json(flat);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateFlat = async (req, res) => {
    try {
        const flat = await Flat.findByPk(req.params.id);
        if (!flat) return res.status(404).json(
            { 
                success: false, 
                message: "Xonadon topilmadi" 
            }
        );
        await flat.update(req.body);
        return res.status(200).json(await Flat.findByPk(
            req.params.id,
            getAssociationOptions(Flat)
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

exports.searchFlats = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Flat, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Xonadon bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Flat.findAll(getAssociationOptions(Flat, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteFlat = async (req, res) => {
    try {
        const deleted = await Flat.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Xonadon topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Xonadon o'chirildi" 
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
