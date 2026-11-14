const express = require('express');
const customerRouter = express.Router();
const { customerValidation } = require('../validation/customer.validation');
const { createBodyValidator } = require('../validation/common.validation');

const {
    postCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    searchCustomers
} = require('../controller/customer.controller');

const validateCustomer = (schema) => {
    return createBodyValidator(schema);
};

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Customers uchun API endpointlari
 */

/**
 * @swagger
 * /api/customers/postCustomer/:
 *   post:
 *     summary: Yangi customers yaratish
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               gender_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Customers yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
customerRouter.post('/postCustomer', validateCustomer(customerValidation), postCustomer);

/**
 * @swagger
 * /api/customers/getCustomer/:
 *   get:
 *     summary: Customers ro‘yxatini olish
 *     tags: [Customers]
 *     responses:
 *       '200':
 *         description: Customers ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
customerRouter.get('/getCustomer', getCustomers);

/**
 * @swagger
 * /api/customers/getCustomerById/{id}:
 *   get:
 *     summary: Customers elementini ID bo‘yicha olish
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Customers topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
customerRouter.get('/getCustomerById/:id', getCustomerById);

/**
 * @swagger
 * /api/customers/updateCustomer/{id}:
 *   put:
 *     summary: Customers elementini yangilash
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               phone:
 *                 type: string
 *               hashed_password:
 *                 type: string
 *               email:
 *                 type: string
 *               birth_date:
 *                 type: string
 *               gender_id:
 *                 type: string
 *               lang_id:
 *                 type: string
 *               hashed_refresh_token:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customers yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
customerRouter.put('/updateCustomer/:id', validateCustomer(customerValidation), updateCustomer);

/**
 * @swagger
 * /api/customers/searchCustomer/:
 *   get:
 *     summary: Customers bo‘yicha qidirish
 *     tags: [Customers]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Qidiruv natijasi
 *       '400':
 *         description: Qidiruv so‘rovi noto‘g‘ri
 */
customerRouter.get('/searchCustomer', searchCustomers);

/**
 * @swagger
 * /api/customers/deleteCustomer/{id}:
 *   delete:
 *     summary: Customers elementini o‘chirish
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Customers o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
customerRouter.delete('/deleteCustomer/:id', deleteCustomer);

module.exports = customerRouter;