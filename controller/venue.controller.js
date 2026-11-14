const { Venue, createSearchWhere, getAssociationOptions } = require('../models');

exports.postVenue = async (req, res) => {
    try {
        const venue = await Venue.create(req.body);
        return res.status(201).json(await Venue.findByPk(
            venue.id,
            getAssociationOptions(Venue)
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

exports.getVenues = async (req, res) => {
    try {
        return res.status(200).json(await Venue.findAll(getAssociationOptions(Venue)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findByPk(
            req.params.id,
            getAssociationOptions(Venue)
        );
        if (!venue) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir joyi topilmadi" 
            }
        );
        return res.status(200).json(venue);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateVenue = async (req, res) => {
    try {
        const venue = await Venue.findByPk(req.params.id);
        if (!venue) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir joyi topilmadi" 
            }
        );
        await venue.update(req.body);
        return res.status(200).json(await Venue.findByPk(
            req.params.id,
            getAssociationOptions(Venue)
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

exports.searchVenues = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Venue, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Tadbir joyi bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Venue.findAll(getAssociationOptions(Venue, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteVenue = async (req, res) => {
    try {
        const deleted = await Venue.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir joyi topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Tadbir joyi o'chirildi" 
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
