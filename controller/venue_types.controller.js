const { VenueTypes, createSearchWhere, getAssociationOptions } = require('../models');

exports.postVenueType = async (req, res) => {
    try {
        const venueType = await VenueTypes.create(req.body);
        return res.status(201).json(await VenueTypes.findByPk(
            venueType.id,
            getAssociationOptions(VenueTypes)
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

exports.getVenueTypes = async (req, res) => {
    try {
        return res.status(200).json(await VenueTypes.findAll(getAssociationOptions(VenueTypes)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getVenueTypeById = async (req, res) => {
    try {
        const venueType = await VenueTypes.findByPk(
            req.params.id,
            getAssociationOptions(VenueTypes)
        );
        if (!venueType) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir joyi turi topilmadi" 
            }
        );
        return res.status(200).json(venueType);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateVenueType = async (req, res) => {
    try {
        const venueType = await VenueTypes.findByPk(req.params.id);
        if (!venueType) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir joyi turi topilmadi" 
            }
        );
        await venueType.update(req.body);
        return res.status(200).json(await VenueTypes.findByPk(
            req.params.id,
            getAssociationOptions(VenueTypes)
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

exports.searchVenueTypes = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(VenueTypes, query, ['$venue.name$', '$type.name$']);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Tadbir joyi turi bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await VenueTypes.findAll(
            getAssociationOptions(VenueTypes, { where })
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

exports.deleteVenueType = async (req, res) => {
    try {
        const deleted = await VenueTypes.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir joyi turi topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Tadbir joyi turi o'chirildi" 
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
