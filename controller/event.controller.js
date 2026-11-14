const { Event, createSearchWhere, getAssociationOptions } = require('../models');

exports.postEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);
        return res.status(201).json(await Event.findByPk(
            event.id,
            getAssociationOptions(Event)
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

exports.getEvents = async (req, res) => {
    try {
        return res.status(200).json(await Event.findAll(getAssociationOptions(Event)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findByPk(
            req.params.id,
            getAssociationOptions(Event)
        );
        if (!event) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir topilmadi" 
            }
        );
        return res.status(200).json(event);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir topilmadi" 
            }
        );
        await event.update(req.body);
        return res.status(200).json(await Event.findByPk(
            req.params.id,
            getAssociationOptions(Event)
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

exports.searchEvents = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Event, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Tadbir bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Event.findAll(getAssociationOptions(Event, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const deleted = await Event.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Tadbir o'chirildi" 
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
