const express = require('express');
const seatTypeRouter = express.Router();
const { seatTypeValidation } = require('../validation/seat_type.validation');
const { createBodyValidator } = require('../validation/common.validation');
const {
    postSeatType,
    getSeatTypes,
    getSeatTypeById,
    updateSeatType,
    deleteSeatType,
    searchSeatTypes
} = require('../controller/seat_type.controller');

const validateSeatType = (schema) => {
    return createBodyValidator(schema);
};

/**
 * @swagger
 * tags:
 *   name: Seat types
 *   description: O'rindiq turlarini boshqarish
 */

/**
 * @swagger
 * /api/seat-types/postSeatType:
 *   post:
 *     summary: Yangi o'rindiq turi yaratish
 *     tags: [Seat types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: VIP
 *     responses:
 *       '201':
 *         description: O'rindiq turi yaratildi
 *       '400':
 *         description: Yuborilgan ma'lumot noto'g'ri yoki tur mavjud
 *       '500':
 *         description: Ichki server xatosi
 */
seatTypeRouter.post('/postSeatType', validateSeatType(seatTypeValidation), postSeatType);

/**
 * @swagger
 * /api/seat-types/getSeatTypes:
 *   get:
 *     summary: Barcha o'rindiq turlarini olish
 *     tags: [Seat types]
 *     responses:
 *       '200':
 *         description: O'rindiq turlari ro'yxati
 *       '500':
 *         description: Ichki server xatosi
 */
seatTypeRouter.get('/getSeatTypes', getSeatTypes);

/**
 * @swagger
 * /api/seat-types/getSeatTypeById/{id}:
 *   get:
 *     summary: O'rindiq turini ID bo'yicha olish
 *     tags: [Seat types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           pattern: '^[0-9a-fA-F]{24}$'
 *     responses:
 *       '200':
 *         description: O'rindiq turi topildi
 *       '404':
 *         description: O'rindiq turi topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
seatTypeRouter.get('/getSeatTypeById/:id', getSeatTypeById);

/**
 * @swagger
 * /api/seat-types/updateSeatType/{id}:
 *   put:
 *     summary: O'rindiq turini yangilash
 *     tags: [Seat types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           pattern: '^[0-9a-fA-F]{24}$'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *                 example: VIP
 *     responses:
 *       '200':
 *         description: O'rindiq turi yangilandi
 *       '400':
 *         description: Yuborilgan ma'lumot noto'g'ri
 *       '404':
 *         description: O'rindiq turi topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
seatTypeRouter.put('/updateSeatType/:id', validateSeatType(seatTypeValidation), updateSeatType);

/**
 * @swagger
 * /api/seat-types/searchSeatType:
 *   get:
 *     summary: O'rindiq turlarini nomi bo'yicha qidirish
 *     tags: [Seat types]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         example: vip
 *     responses:
 *       '200':
 *         description: Qidiruv natijalari
 *       '400':
 *         description: Qidiruv so'rovi yuborilmagan
 *       '500':
 *         description: Ichki server xatosi
 */
seatTypeRouter.get('/searchSeatType', searchSeatTypes);

/**
 * @swagger
 * /api/seat-types/deleteSeatType/{id}:
 *   delete:
 *     summary: O'rindiq turini o'chirish
 *     tags: [Seat types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           pattern: '^[0-9a-fA-F]{24}$'
 *     responses:
 *       '200':
 *         description: O'rindiq turi o'chirildi
 *       '404':
 *         description: O'rindiq turi topilmadi
 *       '500':
 *         description: Ichki server xatosi
 */
seatTypeRouter.delete('/deleteSeatType/:id', deleteSeatType);

module.exports = seatTypeRouter;