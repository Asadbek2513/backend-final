const express = require('express');
const discountRouter = express.Router();
const { discountValidation } = require('../validation/discount.validation');
const { createBodyValidator } = require('../validation/common.validation');

const {
    postDiscount,
    getDiscounts,
    getDiscountById,
    updateDiscount,
    deleteDiscount,
    searchDiscounts
} = require('../controller/discount.controller');

const validateDiscount = (schema) => {
    return createBodyValidator(schema);
};

/**
 * @swagger
 * tags:
 *   name: Discounts
 *   description: Discounts uchun API endpointlari
 */

/**
 * @swagger
 * /api/discounts/postDiscount/:
 *   post:
 *     summary: Yangi discount yaratish
 *     tags: [Discounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [discount]
 *             properties:
 *               discount:
 *                 type: string
 *               finish_date:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *     responses:
 *       '201':
 *         description: Discount yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
discountRouter.post('/postDiscount', validateDiscount(discountValidation), postDiscount);

/**
 * @swagger
 * /api/discounts/getDiscounts/:
 *   get:
 *     summary: Discounts ro'yxatini olish
 *     tags: [Discounts]
 *     responses:
 *       '200':
 *         description: Discounts ro'yxati
 *       '500':
 *         description: Ichki server xatosi
 */
discountRouter.get('/getDiscounts', getDiscounts);

/**
 * @swagger
 * /api/discounts/getDiscountById/{id}:
 *   get:
 *     summary: Discount elementini ID bo'yicha olish
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Discount topildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
discountRouter.get('/getDiscountById/:id', getDiscountById);

/**
 * @swagger
 * /api/discounts/updateDiscount/{id}:
 *   put:
 *     summary: Discount elementini yangilash
 *     tags: [Discounts]
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
 *               discount:
 *                 type: string
 *               finish_date:
 *                 type: string
 *                 format: date-time
 *                 nullable: true
 *     responses:
 *       '200':
 *         description: Discount yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
discountRouter.put('/updateDiscount/:id', validateDiscount(discountValidation), updateDiscount);

/**
 * @swagger
 * /api/discounts/searchDiscounts/:
 *   get:
 *     summary: Discounts bo'yicha qidirish
 *     tags: [Discounts]
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
 *         description: Qidiruv so'rovi noto'g'ri
 */
discountRouter.get('/searchDiscounts', searchDiscounts);

/**
 * @swagger
 * /api/discounts/deleteDiscount/{id}:
 *   delete:
 *     summary: Discount elementini o'chirish
 *     tags: [Discounts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Discount o'chirildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
discountRouter.delete('/deleteDiscount/:id', deleteDiscount);

module.exports = discountRouter;
