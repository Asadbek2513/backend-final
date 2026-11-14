const { Region, createSearchWhere, getAssociationOptions } = require('../models');

exports.postRegion = async (req, res) => {
    try {
        const region = await Region.create(req.body);
        return res.status(201).json(await Region.findByPk(
            region.id,
            getAssociationOptions(Region)
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

exports.getRegions = async (req, res) => {
    try {
        return res.status(200).json(await Region.findAll(getAssociationOptions(Region)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getRegionById = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id, getAssociationOptions(Region));
        if (!region) return res.status(404).json(
            { 
                success: false, 
                message: "Viloyat topilmadi" 
            }
        );
        return res.status(200).json(region);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateRegion = async (req, res) => {
    try {
        const region = await Region.findByPk(req.params.id);
        if (!region) return res.status(404).json(
            { 
                success: false, 
                message: "Viloyat topilmadi" 
            }
        );
        await region.update(req.body);
        return res.status(200).json(await Region.findByPk(
            req.params.id,
            getAssociationOptions(Region)
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

exports.searchRegions = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Region, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Viloyat bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Region.findAll(getAssociationOptions(Region, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteRegion = async (req, res) => {
    try {
        const deleted = await Region.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Viloyat topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Viloyat o'chirildi" 
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
