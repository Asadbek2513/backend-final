const { TicketStatus, createSearchWhere, getAssociationOptions } = require('../models');

exports.postTicketStatus = async (req, res) => {
    try {
        const ticketStatus = await TicketStatus.create(req.body);
        return res.status(201).json(await TicketStatus.findByPk(
            ticketStatus.id,
            getAssociationOptions(TicketStatus)
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

exports.getTicketStatuses = async (req, res) => {
    try {
        return res.status(200).json(await TicketStatus.findAll(getAssociationOptions(TicketStatus)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getTicketStatusById = async (req, res) => {
    try {
        const ticketStatus = await TicketStatus.findByPk(
            req.params.id,
            getAssociationOptions(TicketStatus)
        );
        if (!ticketStatus) return res.status(404).json(
            { 
                success: false, 
                message: "Chipta holati topilmadi" 
            }
        );
        return res.status(200).json(ticketStatus);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateTicketStatus = async (req, res) => {
    try {
        const ticketStatus = await TicketStatus.findByPk(req.params.id);
        if (!ticketStatus) return res.status(404).json(
            { 
                success: false, 
                message: "Chipta holati topilmadi" 
            }
        );
        await ticketStatus.update(req.body);
        return res.status(200).json(await TicketStatus.findByPk(
            req.params.id,
            getAssociationOptions(TicketStatus)
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

exports.searchTicketStatuses = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(TicketStatus, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Chipta holati bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await TicketStatus.findAll(
            getAssociationOptions(TicketStatus, { where })
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

exports.deleteTicketStatus = async (req, res) => {
    try {
        const deleted = await TicketStatus.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Chipta holati topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Chipta holati o'chirildi" 
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
