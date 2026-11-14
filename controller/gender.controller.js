const { Gender, createSearchWhere, getAssociationOptions } = require('../models');

exports.postGender = async (req, res) => {
    try {
        const gender = await Gender.create(req.body);
        return res.status(201).json(await Gender.findByPk(
            gender.id,
            getAssociationOptions(Gender)
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

exports.getGenders = async (req, res) => {
    try {
        return res.status(200).json(await Gender.findAll(getAssociationOptions(Gender)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getGenderById = async (req, res) => {
    try {
        const gender = await Gender.findByPk(req.params.id, getAssociationOptions(Gender));
        if (!gender) return res.status(404).json(
            { 
                success: false, 
                message: "Jins topilmadi" 
            }
        );
        return res.status(200).json(gender);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateGender = async (req, res) => {
    try {
        const gender = await Gender.findByPk(req.params.id);
        if (!gender) return res.status(404).json(
            { 
                success: false, 
                message: "Jins topilmadi" 
            }
        );
        await gender.update(req.body);
        return res.status(200).json(await Gender.findByPk(
            req.params.id,
            getAssociationOptions(Gender)
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

exports.searchGenders = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Gender, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Jins bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Gender.findAll(getAssociationOptions(Gender, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteGender = async (req, res) => {
    try {
        const deleted = await Gender.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Jins topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Jins o'chirildi" 
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
