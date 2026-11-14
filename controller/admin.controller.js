const { Admin, createSearchWhere } = require('../models');

exports.postAdmin = async (req, res) => {
    try {
        return res.status(201).json(await Admin.create(req.body));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getAdmins = async (req, res) => {
    try {
        return res.status(200).json(await Admin.findAll());
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) return res.status(404).json(
            { 
                success: false, 
                message: "Administrator topilmadi" 
            }
        );
        return res.status(200).json(admin);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByPk(req.params.id);
        if (!admin) return res.status(404).json(
            { 
                success: false, 
                message: "Administrator topilmadi" 
            }
        );
        return res.status(200).json(await admin.update(req.body));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.searchAdmins = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Admin, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Administrator bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Admin.findAll({ where }));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const deleted = await Admin.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Administrator topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Administrator o'chirildi" 
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
