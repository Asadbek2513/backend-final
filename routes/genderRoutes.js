const express = require('express');
const genderRouter = express.Router();
const { genderValidation } = require('../validation/gender.validation');
const { createBodyValidator } = require('../validation/common.validation');

const {
    postGender,
    getGenders,
    getGenderById,
    updateGender,
    deleteGender,
    searchGenders
} = require('../controller/gender.controller');

const validateGender = (schema) => {
    return createBodyValidator(schema);
};

/**
 * @swagger
 * tags:
 *   name: Genders
 *   description: Genders uchun API endpointlari
 */

/**
 * @swagger
 * /api/genders/postGender/:
 *   post:
 *     summary: Yangi gender yaratish
 *     tags: [Genders]
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
 *     responses:
 *       '201':
 *         description: Gender yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
genderRouter.post('/postGender', validateGender(genderValidation), postGender);

/**
 * @swagger
 * /api/genders/getGenders/:
 *   get:
 *     summary: Genders ro'yxatini olish
 *     tags: [Genders]
 *     responses:
 *       '200':
 *         description: Genders ro'yxati
 *       '500':
 *         description: Ichki server xatosi
 */
genderRouter.get('/getGenders', getGenders);

/**
 * @swagger
 * /api/genders/getGenderById/{id}:
 *   get:
 *     summary: Gender elementini ID bo'yicha olish
 *     tags: [Genders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Gender topildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
genderRouter.get('/getGenderById/:id', getGenderById);

/**
 * @swagger
 * /api/genders/updateGender/{id}:
 *   put:
 *     summary: Gender elementini yangilash
 *     tags: [Genders]
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
 *     responses:
 *       '200':
 *         description: Gender yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
genderRouter.put('/updateGender/:id', validateGender(genderValidation), updateGender);

/**
 * @swagger
 * /api/genders/searchGenders/:
 *   get:
 *     summary: Genders bo'yicha qidirish
 *     tags: [Genders]
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
genderRouter.get('/searchGenders', searchGenders);

/**
 * @swagger
 * /api/genders/deleteGender/{id}:
 *   delete:
 *     summary: Gender elementini o'chirish
 *     tags: [Genders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Gender o'chirildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
genderRouter.delete('/deleteGender/:id', deleteGender);

module.exports = genderRouter;
