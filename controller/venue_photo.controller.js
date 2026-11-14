const { VenuePhoto, createSearchWhere, getAssociationOptions } = require('../models');

exports.postVenuePhoto = async (req, res) => {
    try {
        const photo = await VenuePhoto.create(req.body);
        return res.status(201).json(await VenuePhoto.findByPk(
            photo.id,
            getAssociationOptions(VenuePhoto)
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

exports.getVenuePhotos = async (req, res) => {
    try {
        return res.status(200).json(await VenuePhoto.findAll(getAssociationOptions(VenuePhoto)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getVenuePhotoById = async (req, res) => {
    try {
        const photo = await VenuePhoto.findByPk(
            req.params.id,
            getAssociationOptions(VenuePhoto)
        );
        if (!photo) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir joyi surati topilmadi" 
            }
        );
        return res.status(200).json(photo);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateVenuePhoto = async (req, res) => {
    try {
        const photo = await VenuePhoto.findByPk(req.params.id);
        if (!photo) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir joyi surati topilmadi" 
            }
        );
        await photo.update(req.body);
        return res.status(200).json(await VenuePhoto.findByPk(
            req.params.id,
            getAssociationOptions(VenuePhoto)
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

exports.searchVenuePhotos = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(VenuePhoto, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Tadbir joyi surati bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await VenuePhoto.findAll(getAssociationOptions(VenuePhoto, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteVenuePhoto = async (req, res) => {
    try {
        const deleted = await VenuePhoto.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir joyi surati topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Tadbir joyi surati o'chirildi" 
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
