const { District, createSearchWhere, getAssociationOptions } = require('../models');

exports.postDistrict = async (req, res) => {
    try {
        const district = await District.create(req.body);
        const districtWithRegion = await District.findByPk(
            district.id,
            getAssociationOptions(District)
        );
        return res.status(201).json(districtWithRegion);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getDistricts = async (req, res) => {
    try {
        return res.status(200).json(await District.findAll(getAssociationOptions(District)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getDistrictById = async (req, res) => {
    try {
        const district = await District.findByPk(
            req.params.id,
            getAssociationOptions(District)
        );
        if (!district) return res.status(404).json(
            { 
                success: false, 
                message: "Tuman topilmadi" 
            }
        );
        return res.status(200).json(district);
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateDistrict = async (req, res) => {
    try {
        const district = await District.findByPk(req.params.id);
        if (!district) return res.status(404).json(
            { 
                success: false, 
                message: "Tuman topilmadi" 
            }
        );
        await district.update(req.body);
        return res.status(200).json(await District.findByPk(
            req.params.id,
            getAssociationOptions(District)
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

exports.searchDistricts = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(District, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Tuman bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await District.findAll(getAssociationOptions(District, { where })));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.deleteDistrict = async (req, res) => {
    try {
        const deleted = await District.destroy(
            {
                where: { id: req.params.id }
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Tuman topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Tuman o'chirildi" 
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
