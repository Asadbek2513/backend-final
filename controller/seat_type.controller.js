const { SeatType, createSearchWhere, getAssociationOptions } = require('../models');

exports.postSeatType = async (req, res) => {
    try {
        const seatType = await SeatType.create(req.body);
        return res.status(201).json(await SeatType.findByPk(
            seatType.id,
            getAssociationOptions(SeatType)
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

exports.getSeatTypes = async (req, res) => {
    try {
        return res.status(200).json(await SeatType.findAll(getAssociationOptions(SeatType)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getSeatTypeById = async (req, res) => {
    try {
        const seatType = await SeatType.findByPk(req.params.id, getAssociationOptions(SeatType));
        if (!seatType) return res.status(404).json(
            { 
                success: false, 
                message: "O'rindiq turi topilmadi" 
            }
        );
        return res.status(200).json(seatType);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateSeatType = async (req, res) => {
    try {
        const seatType = await SeatType.findByPk(req.params.id);
        if (!seatType) return res.status(404).json(
            { 
                success: false, 
                message: "O'rindiq turi topilmadi" 
            }
        );
        await seatType.update(req.body);
        return res.status(200).json(await SeatType.findByPk(
            req.params.id,
            getAssociationOptions(SeatType)
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

exports.searchSeatTypes = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(SeatType, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "O'rindiq turi bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await SeatType.findAll(getAssociationOptions(SeatType, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteSeatType = async (req, res) => {
    try {
        const deleted = await SeatType.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "O'rindiq turi topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "O'rindiq turi o'chirildi" 
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
