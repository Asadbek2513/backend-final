const express = require('express');
const venueRouter = express.Router();
const { venueValidation } = require('../validation/venue.validation');
const { createBodyValidator } = require('../validation/common.validation');

const {
    postVenue,
    getVenues,
    getVenueById,
    updateVenue,
    deleteVenue,
    searchVenues
} = require('../controller/venue.controller');

const validateVenue = (schema) => {
    return createBodyValidator(schema);
};

/**
 * @swagger
 * tags:
 *   name: Venues
 *   description: Venues uchun API endpointlari
 */

/**
 * @swagger
 * /api/venues/postVenue/:
 *   post:
 *     summary: Yangi venues yaratish
 *     tags: [Venues]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               site:
 *                 type: string
 *               phone:
 *                 type: string
 *               schema:
 *                 type: string
 *               region_id:
 *                 type: string
 *               district_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Venues yaratildi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
venueRouter.post('/postVenue', validateVenue(venueValidation), postVenue);

/**
 * @swagger
 * /api/venues/getVenues/:
 *   get:
 *     summary: Venues ro‘yxatini olish
 *     tags: [Venues]
 *     responses:
 *       '200':
 *         description: Venues ro‘yxati
 *       '500':
 *         description: Ichki server xatosi
 */
venueRouter.get('/getVenues', getVenues);

/**
 * @swagger
 * /api/venues/getVenueById/{id}:
 *   get:
 *     summary: Venues elementini ID bo‘yicha olish
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Venues topildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
venueRouter.get('/getVenueById/:id', getVenueById);

/**
 * @swagger
 * /api/venues/updateVenue/{id}:
 *   put:
 *     summary: Venues elementini yangilash
 *     tags: [Venues]
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
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               location:
 *                 type: string
 *               site:
 *                 type: string
 *               phone:
 *                 type: string
 *               schema:
 *                 type: string
 *               region_id:
 *                 type: string
 *               district_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Venues yangilandi
 *       '400':
 *         description: Noto‘g‘ri ma’lumot
 */
venueRouter.put('/updateVenue/:id', validateVenue(venueValidation), updateVenue);

/**
 * @swagger
 * /api/venues/searchVenue/:
 *   get:
 *     summary: Venues bo‘yicha qidirish
 *     tags: [Venues]
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
venueRouter.get('/searchVenue', searchVenues);

/**
 * @swagger
 * /api/venues/deleteVenue/{id}:
 *   delete:
 *     summary: Venues elementini o‘chirish
 *     tags: [Venues]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Venues o‘chirildi
 *       '404':
 *         description: Ma’lumot topilmadi
 */
venueRouter.delete('/deleteVenue/:id', deleteVenue);

module.exports = venueRouter;