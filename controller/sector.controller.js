const { Sector, createSearchWhere, getAssociationOptions } = require('../models');

exports.postSector = async (req, res) => {
    try {
        const sector = await Sector.create(req.body);
        return res.status(201).json(await Sector.findByPk(
            sector.id,
            getAssociationOptions(Sector)
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

exports.getSectors = async (req, res) => {
    try {
        return res.status(200).json(await Sector.findAll(getAssociationOptions(Sector)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getSectorById = async (req, res) => {
    try {
        const sector = await Sector.findByPk(req.params.id, getAssociationOptions(Sector));
        if (!sector) return res.status(404).json(
            { 
                success: false, 
                message: "Sektor topilmadi" 
            }
        );
        return res.status(200).json(sector);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateSector = async (req, res) => {
    try {
        const sector = await Sector.findByPk(req.params.id);
        if (!sector) return res.status(404).json(
            { 
                success: false, 
                message: "Sektor topilmadi" 
            }
        );
        await sector.update(req.body);
        return res.status(200).json(await Sector.findByPk(
            req.params.id,
            getAssociationOptions(Sector)
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

exports.searchSectors = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Sector, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Sektor bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Sector.findAll(getAssociationOptions(Sector, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteSector = async (req, res) => {
    try {
        const deleted = await Sector.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Sektor topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Sektor o'chirildi" 
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
