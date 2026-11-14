const { Seat, createSearchWhere, getAssociationOptions } = require('../models');

exports.postSeat = async (req, res) => {
    try {
        const seat = await Seat.create(req.body);
        return res.status(201).json(await Seat.findByPk(
            seat.id,
            getAssociationOptions(Seat)
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

exports.getSeats = async (req, res) => {
    try {
        return res.status(200).json(await Seat.findAll(getAssociationOptions(Seat)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getSeatById = async (req, res) => {
    try {
        const seat = await Seat.findByPk(
            req.params.id,
            getAssociationOptions(Seat)
        );
        if (!seat) return res.status(404).json(
            { 
                success: false, 
                message: "O'rindiq topilmadi" 
            }
        );
        return res.status(200).json(seat);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateSeat = async (req, res) => {
    try {
        const seat = await Seat.findByPk(req.params.id);
        if (!seat) return res.status(404).json(
            { 
                success: false, 
                message: "O'rindiq topilmadi" 
            }
        );
        await seat.update(req.body);
        return res.status(200).json(await Seat.findByPk(
            req.params.id,
            getAssociationOptions(Seat)
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

exports.searchSeats = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Seat, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "O'rindiq bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Seat.findAll(getAssociationOptions(Seat, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteSeat = async (req, res) => {
    try {
        const deleted = await Seat.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "O'rindiq topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "O'rindiq o'chirildi" 
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
