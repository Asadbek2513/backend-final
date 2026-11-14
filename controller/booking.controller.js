const { Booking, createSearchWhere, getAssociationOptions } = require('../models');

exports.postBooking = async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        return res.status(201).json(await Booking.findByPk(
            booking.id,
            getAssociationOptions(Booking)
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

exports.getBookings = async (req, res) => {
    try {
        return res.status(200).json(await Booking.findAll(getAssociationOptions(Booking)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findByPk(
            req.params.id,
            getAssociationOptions(Booking)
        );
        if (!booking) return res.status(404).json(
            { 
                success: false, 
                message: "Buyurtma topilmadi" 
            }
        );
        return res.status(200).json(booking);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);
        if (!booking) return res.status(404).json(
            { 
                success: false, 
                message: "Buyurtma topilmadi" 
            }
        );
        await booking.update(req.body);
        return res.status(200).json(await Booking.findByPk(
            req.params.id,
            getAssociationOptions(Booking)
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

exports.searchBooking = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Booking, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Buyurtma bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Booking.findAll(getAssociationOptions(Booking, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const deleted = await Booking.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Buyurtma topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Buyurtma o'chirildi" 
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
