const { Country, createSearchWhere } = require('../models');

exports.postCountry = async (req, res) => {
    try {
        return res.status(201).json(
            { 
                success: true, 
                data: await Country.create(req.body) 
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

exports.getCountries = async (req, res) => {
    try {
        return res.status(200).json(
            { 
                success: true, 
                data: await Country.findAll() 
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

exports.getCountryById = async (req, res) => {
    try {
        const country = await Country.findByPk(req.params.id);
        if (!country) return res.status(404).json(
            { 
                success: false, 
                message: "Mamlakat topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                data: country 
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

exports.updateCountry = async (req, res) => {
    try {
        const country = await Country.findByPk(req.params.id);
        if (!country) return res.status(404).json(
            { 
                success: false, 
                message: "Mamlakat topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                data: await country.update(req.body) 
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

exports.searchCountries = async (req, res) => {
    try {
        const query = String(req.query.query || '' ).trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Country, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Mamlakat bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                data: await Country.findAll({ where }) 
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

exports.deleteCountry = async (req, res) => {
    try {
        const deleted = await Country.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Mamlakat topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Mamlakat o'chirildi" 
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
