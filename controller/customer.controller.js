const { Customer, createSearchWhere, getAssociationOptions } = require('../models');

const publicCustomer = (customer) => {
    const data = customer.toJSON();
    delete data.hashed_password;
    delete data.hashed_refresh_token;
    return data;
};

exports.postCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        return res.status(201).json(publicCustomer(await Customer.findByPk(
            customer.id,
            getAssociationOptions(Customer)
        )));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getCustomers = async (req, res) => {
    try {
        return res.status(200).json(await Customer.findAll(getAssociationOptions(Customer)));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.getCustomerById = async (req, res) => {
    try {
        const customer = await Customer.findByPk(
            req.params.id,
            getAssociationOptions(Customer)
        );
        if (!customer) return res.status(404).json(
            { 
                success: false, 
                message: "Mijoz topilmadi" 
            }
        );
        return res.status(200).json(publicCustomer(customer));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.updateCustomer = async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);
        if (!customer) return res.status(404).json(
            { 
                success: false, 
                message: "Mijoz topilmadi" 
            }
        );
        await customer.update(req.body);
        return res.status(200).json(publicCustomer(await Customer.findByPk(
            req.params.id,
            getAssociationOptions(Customer)
        )));
    } catch (error) {
        return res.status(500).json(
            { 
                success: false, 
                message: error.message 
            }
        );
    }
};

exports.searchCustomers = async (req, res) => {
    try {
        const query = String(req.query.query || '').trim();
        if (!query) return res.status(400).json(
            { 
                success: false, 
                message: "Qidiruv so'rovi kiritilishi shart" 
            }
        );
        const where = createSearchWhere(Customer, query);
        if (!where) return res.status(400).json(
            { 
                success: false, 
                message: "Mijoz bo'yicha qidirish uchun maydonlar yo'q" 
            }
        );
        return res.status(200).json(await Customer.findAll(
            getAssociationOptions(Customer, { where })
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

exports.deleteCustomer = async (req, res) => {
    try {
        const deleted = await Customer.destroy(
            { 
                where: { id: req.params.id } 
            }
        );
        if (!deleted) return res.status(404).json(
            { 
                success: false, 
                message: "Mijoz topilmadi" 
            }
        );
        return res.status(200).json(
            { 
                success: true, 
                message: "Mijoz o'chirildi" 
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
