const express = require('express');
const sectorRouter = express.Router();
const { sectorValidation } = require('../validation/sector.validation');
const { createBodyValidator } = require('../validation/common.validation');

const {
    postSector,
    getSectors,
    getSectorById,
    updateSector,
    deleteSector,
    searchSectors
} = require('../controller/sector.controller');

const validateSector = (schema) => {
    return createBodyValidator(schema);
};

/**
 * @swagger
 * tags:
 *   name: Sectors
 *   description: Sectors uchun API endpointlari
 */

/**
 * @swagger
 * /api/sectors/postSector/:
 *   post:
 *     summary: Yangi sector yaratish
 *     tags: [Sectors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [sector_name]
 *             properties:
 *               sector_name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Sector yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
sectorRouter.post('/postSector', validateSector(sectorValidation), postSector);

/**
 * @swagger
 * /api/sectors/getSectors/:
 *   get:
 *     summary: Sectors ro'yxatini olish
 *     tags: [Sectors]
 *     responses:
 *       '200':
 *         description: Sectors ro'yxati
 *       '500':
 *         description: Ichki server xatosi
 */
sectorRouter.get('/getSectors', getSectors);

/**
 * @swagger
 * /api/sectors/getSectorById/{id}:
 *   get:
 *     summary: Sector elementini ID bo'yicha olish
 *     tags: [Sectors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Sector topildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
sectorRouter.get('/getSectorById/:id', getSectorById);

/**
 * @swagger
 * /api/sectors/updateSector/{id}:
 *   put:
 *     summary: Sector elementini yangilash
 *     tags: [Sectors]
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
 *               sector_name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Sector yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
sectorRouter.put('/updateSector/:id', validateSector(sectorValidation), updateSector);

/**
 * @swagger
 * /api/sectors/searchSectors/:
 *   get:
 *     summary: Sectors bo'yicha qidirish
 *     tags: [Sectors]
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
sectorRouter.get('/searchSectors', searchSectors);

/**
 * @swagger
 * /api/sectors/deleteSector/{id}:
 *   delete:
 *     summary: Sector elementini o'chirish
 *     tags: [Sectors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Sector o'chirildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
sectorRouter.delete('/deleteSector/:id', deleteSector);

module.exports = sectorRouter;