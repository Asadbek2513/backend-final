const express = require('express');
const venueTypeRouter = express.Router();
const { venueTypeValidation } = require('../validation/venue_types.validation');
const { createBodyValidator } = require('../validation/common.validation');

const {
    postVenueType,
    getVenueTypes,
    getVenueTypeById,
    updateVenueType,
    deleteVenueType,
    searchVenueTypes
} = require('../controller/venue_types.controller');

const validateVenueType = (schema) => {
    return createBodyValidator(schema);
};

/**
 * @swagger
 * tags:
 *   name: Venue types
 *   description: Venue types uchun API endpointlari
 */

/**
 * @swagger
 * /api/venue-types/postVenueType/:
 *   post:
 *     summary: Venue va type bog'lanishini yaratish
 *     tags: [Venue types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [venueId, typeId]
 *             properties:
 *               venueId:
 *                 type: string
 *               typeId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Venue type yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
venueTypeRouter.post('/postVenueType', validateVenueType(venueTypeValidation), postVenueType);

/**
 * @swagger
 * /api/venue-types/getVenueTypes/:
 *   get:
 *     summary: Venue types ro'yxatini olish
 *     tags: [Venue types]
 *     responses:
 *       '200':
 *         description: Venue types ro'yxati
 *       '500':
 *         description: Ichki server xatosi
 */
venueTypeRouter.get('/getVenueTypes', getVenueTypes);

/**
 * @swagger
 * /api/venue-types/getVenueTypeById/{id}:
 *   get:
 *     summary: Venue type elementini ID bo'yicha olish
 *     tags: [Venue types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Venue type topildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
venueTypeRouter.get('/getVenueTypeById/:id', getVenueTypeById);

/**
 * @swagger
 * /api/venue-types/updateVenueType/{id}:
 *   put:
 *     summary: Venue type elementini yangilash
 *     tags: [Venue types]
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
 *               venueId:
 *                 type: string
 *               typeId:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Venue type yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
venueTypeRouter.put('/updateVenueType/:id', validateVenueType(venueTypeValidation), updateVenueType);

/**
 * @swagger
 * /api/venue-types/searchVenueTypes/:
 *   get:
 *     summary: Venue types bo'yicha qidirish
 *     tags: [Venue types]
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
venueTypeRouter.get('/searchVenueTypes', searchVenueTypes);

/**
 * @swagger
 * /api/venue-types/deleteVenueType/{id}:
 *   delete:
 *     summary: Venue type elementini o'chirish
 *     tags: [Venue types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Venue type o'chirildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
venueTypeRouter.delete('/deleteVenueType/:id', deleteVenueType);

module.exports = venueTypeRouter;