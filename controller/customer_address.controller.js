const { CustomerAddress, createSearchWhere, getAssociationOptions } = require('../models');

exports.postCustomerAddress = async (req, res) => {
    try {
        return res.status(201).json(
            { 
                success: true, 
                data: await CustomerAddress.findByPk(
                    (await CustomerAddress.create(req.body)).id,
                    getAssociationOptions(CustomerAddress)
                )
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

exports.getCustomerAddresses = async (req, res) => {
    try {
        return res.status(200).json(
            { 
                success: true, 
                data: await CustomerAddress.findAll(getAssociationOptions(CustomerAddress))
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

exports.getCustomerAddressById = async (req, res) => {
    try {
        const address = await CustomerAddress.findByPk(
            req.params.id,
            getAssociationOptions(CustomerAddress)
        );
        if (!address) return res.status(404).json(
            { 
                success: false, 
                message: "Mijoz manzili topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                data: address 
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

exports.updateCustomerAddress = async (req, res) => {
    try {
        const address = await CustomerAddress.findByPk(req.params.id);
        if (!address) return res.status(404).json(
            { 
                success: false, 
                message: "Mijoz manzili topilmadi" 
            }
        );
        await address.update(req.body);
        return res.status(200).json(
            { 
                success: true, 
                data: await CustomerAddress.findByPk(
                    req.params.id,
                    getAssociationOptions(CustomerAddress)
                )
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

exports.searchCustomerAddresses = async (req, res) => {
    try {
        const query = String(req.query.query || '' ).trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(CustomerAddress, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Mijoz manzili bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                data: await CustomerAddress.findAll(getAssociationOptions(CustomerAddress, { where }))
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

exports.deleteCustomerAddress = async (req, res) => {
    try {
        const deleted = await CustomerAddress.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Mijoz manzili topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Mijoz manzili o'chirildi" 
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
