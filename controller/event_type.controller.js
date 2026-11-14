const { EventType, createSearchWhere, getAssociationOptions } = require('../models');

exports.postEventType = async (req, res) => {
    try {
        const eventType = await EventType.create(req.body);
        return res.status(201).json(await EventType.findByPk(
            eventType.id,
            getAssociationOptions(EventType)
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

exports.getEventTypes = async (req, res) => {
    try {
        return res.status(200).json(await EventType.findAll(getAssociationOptions(EventType)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getEventTypeById = async (req, res) => {
    try {
        const eventType = await EventType.findByPk(
            req.params.id,
            getAssociationOptions(EventType)
        );
        if (!eventType) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir turi topilmadi" 
            }
        );
        return res.status(200).json(eventType);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateEventType = async (req, res) => {
    try {
        const eventType = await EventType.findByPk(req.params.id);
        if (!eventType) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir turi topilmadi" 
            }
        );
        await eventType.update(req.body);
        return res.status(200).json(await EventType.findByPk(
            req.params.id,
            getAssociationOptions(EventType)
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

exports.searchEventTypes = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(EventType, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Tadbir turi bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await EventType.findAll(getAssociationOptions(EventType, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteEventType = async (req, res) => {
    try {
        const deleted = await EventType.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Tadbir turi topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Tadbir turi o'chirildi" 
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
