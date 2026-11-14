const express = require('express');
const countryRouter = express.Router();
const { countryValidation } = require('../validation/country.validation');
const { createBodyValidator } = require('../validation/common.validation');

const {
    postCountry,
    getCountries,
    getCountryById,
    updateCountry,
    deleteCountry,
    searchCountries
} = require('../controller/country.controller');

const validateCountry = (schema) => {
    return createBodyValidator(schema);
};

/**
 * @swagger
 * tags:
 *   name: Countries
 *   description: Countries uchun API endpointlari
 */

/**
 * @swagger
 * /api/countries/postCountry/:
 *   post:
 *     summary: Yangi country yaratish
 *     tags: [Countries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [country_name]
 *             properties:
 *               country_name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Country yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
countryRouter.post('/postCountry', validateCountry(countryValidation), postCountry);

/**
 * @swagger
 * /api/countries/getCountries/:
 *   get:
 *     summary: Countries ro'yxatini olish
 *     tags: [Countries]
 *     responses:
 *       '200':
 *         description: Countries ro'yxati
 *       '500':
 *         description: Ichki server xatosi
 */
countryRouter.get('/getCountries', getCountries);

/**
 * @swagger
 * /api/countries/getCountryById/{id}:
 *   get:
 *     summary: Country elementini ID bo'yicha olish
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Country topildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
countryRouter.get('/getCountryById/:id', getCountryById);

/**
 * @swagger
 * /api/countries/updateCountry/{id}:
 *   put:
 *     summary: Country elementini yangilash
 *     tags: [Countries]
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
 *               country_name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Country yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
countryRouter.put('/updateCountry/:id', validateCountry(countryValidation), updateCountry);

/**
 * @swagger
 * /api/countries/searchCountries/:
 *   get:
 *     summary: Countries bo'yicha qidirish
 *     tags: [Countries]
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
countryRouter.get('/searchCountries', searchCountries);

/**
 * @swagger
 * /api/countries/deleteCountry/{id}:
 *   delete:
 *     summary: Country elementini o'chirish
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Country o'chirildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
countryRouter.delete('/deleteCountry/:id', deleteCountry);

module.exports = countryRouter;
