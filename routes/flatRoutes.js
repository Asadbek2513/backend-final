const express = require('express');
const flatRouter = express.Router();
const { flatValidation } = require('../validation/flat.validation');
const { createBodyValidator } = require('../validation/common.validation');

const {
    postFlat,
    getFlats,
    getFlatById,
    updateFlat,
    deleteFlat,
    searchFlats
} = require('../controller/flat.controller');

const validateFlat = (schema) => {
    return createBodyValidator(schema);
};

/**
 * @swagger
 * tags:
 *   name: Flats
 *   description: Flats uchun API endpointlari
 */

/**
 * @swagger
 * /api/flats/postFlat/:
 *   post:
 *     summary: Yangi flat yaratish
 *     tags: [Flats]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [adj, condition]
 *             properties:
 *               adj:
 *                 type: number
 *               condition:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Flat yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
flatRouter.post('/postFlat', validateFlat(flatValidation), postFlat);

/**
 * @swagger
 * /api/flats/getFlats/:
 *   get:
 *     summary: Flats ro'yxatini olish
 *     tags: [Flats]
 *     responses:
 *       '200':
 *         description: Flats ro'yxati
 *       '500':
 *         description: Ichki server xatosi
 */
flatRouter.get('/getFlats', getFlats);

/**
 * @swagger
 * /api/flats/getFlatById/{id}:
 *   get:
 *     summary: Flat elementini ID bo'yicha olish
 *     tags: [Flats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Flat topildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
flatRouter.get('/getFlatById/:id', getFlatById);

/**
 * @swagger
 * /api/flats/updateFlat/{id}:
 *   put:
 *     summary: Flat elementini yangilash
 *     tags: [Flats]
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
 *               adj:
 *                 type: number
 *               condition:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Flat yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
flatRouter.put('/updateFlat/:id', validateFlat(flatValidation), updateFlat);

/**
 * @swagger
 * /api/flats/searchFlats/:
 *   get:
 *     summary: Flats bo'yicha qidirish
 *     tags: [Flats]
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
flatRouter.get('/searchFlats', searchFlats);

/**
 * @swagger
 * /api/flats/deleteFlat/{id}:
 *   delete:
 *     summary: Flat elementini o'chirish
 *     tags: [Flats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Flat o'chirildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
flatRouter.delete('/deleteFlat/:id', deleteFlat);

module.exports = flatRouter;
