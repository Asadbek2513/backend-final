const { TicketType, createSearchWhere, getAssociationOptions } = require('../models');

exports.postTicketType = async (req, res) => {
    try {
        const ticketType = await TicketType.create(req.body);
        return res.status(201).json(await TicketType.findByPk(
            ticketType.id,
            getAssociationOptions(TicketType)
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

exports.getTicketTypes = async (req, res) => {
    try {
        return res.status(200).json(await TicketType.findAll(getAssociationOptions(TicketType)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getTicketTypeById = async (req, res) => {
    try {
        const ticketType = await TicketType.findByPk(
            req.params.id,
            getAssociationOptions(TicketType)
        );
        if (!ticketType) return res.status(404).json(
            { 
                success: false, 
                message: "Chipta turi topilmadi" 
            }
        );
        return res.status(200).json(ticketType);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateTicketType = async (req, res) => {
    try {
        const ticketType = await TicketType.findByPk(req.params.id);
        if (!ticketType) return res.status(404).json(
            { 
                success: false, 
                message: "Chipta turi topilmadi" 
            }
        );
        await ticketType.update(req.body);
        return res.status(200).json(await TicketType.findByPk(
            req.params.id,
            getAssociationOptions(TicketType)
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

exports.searchTicketTypes = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(TicketType, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Chipta turi bo'yicha qidirish uchun maydonlar yo'q" 
            }
            );
        return res.status(200).json(await TicketType.findAll(
            getAssociationOptions(TicketType, { where })
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

exports.deleteTicketType = async (req, res) => {
    try {
        const deleted = await TicketType.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Chipta turi topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Chipta turi o'chirildi" 
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
