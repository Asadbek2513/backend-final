const { Ticket, createSearchWhere, getAssociationOptions } = require('../models');

exports.postTicket = async (req, res) => {
    try {
        const ticket = await Ticket.create(req.body);
        return res.status(201).json(await Ticket.findByPk(
            ticket.id,
            getAssociationOptions(Ticket)
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

exports.getTickets = async (req, res) => {
    try {
        return res.status(200).json(await Ticket.findAll(getAssociationOptions(Ticket)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(
            req.params.id,
            getAssociationOptions(Ticket)
        );
        if (!ticket) return res.status(404).json(
            { 
                success: false, 
                message: "Chipta topilmadi" 
            }
        );
        return res.status(200).json(ticket);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByPk(req.params.id);
        if (!ticket) return res.status(404).json(
            { 
                success: false, 
                message: "Chipta topilmadi" 
            }
        );
        await ticket.update(req.body);
        return res.status(200).json(await Ticket.findByPk(
            req.params.id,
            getAssociationOptions(Ticket)
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

exports.searchTickets = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Ticket, query, [
            '$event.name$',
            '$status.name$',
            '$ticketType.ticket_type$'
        ]);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Chipta bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Ticket.findAll(
            getAssociationOptions(Ticket, { where })
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

exports.deleteTicket = async (req, res) => {
    try {
        const deleted = await Ticket.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Chipta topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Chipta o'chirildi" 
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
