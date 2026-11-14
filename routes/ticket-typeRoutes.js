const express = require('express');
const ticketTypeRouter = express.Router();
const { ticketTypeValidation } = require('../validation/ticket_type.validation');
const { createBodyValidator } = require('../validation/common.validation');

const {
    postTicketType,
    getTicketTypes,
    getTicketTypeById,
    updateTicketType,
    deleteTicketType,
    searchTicketTypes
} = require('../controller/ticket_type.controller');

const validateTicketType = (schema) => {
    return createBodyValidator(schema);
};

/**
 * @swagger
 * tags:
 *   name: Ticket types
 *   description: Ticket types uchun API endpointlari
 */

/**
 * @swagger
 * /api/ticket-types/postTicketType/:
 *   post:
 *     summary: Yangi ticket type yaratish
 *     tags: [Ticket types]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [ticket_type]
 *             properties:
 *               ticket_type:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Ticket type yaratildi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
ticketTypeRouter.post('/postTicketType', validateTicketType(ticketTypeValidation), postTicketType);

/**
 * @swagger
 * /api/ticket-types/getTicketTypes/:
 *   get:
 *     summary: Ticket types ro'yxatini olish
 *     tags: [Ticket types]
 *     responses:
 *       '200':
 *         description: Ticket types ro'yxati
 *       '500':
 *         description: Ichki server xatosi
 */
ticketTypeRouter.get('/getTicketTypes', getTicketTypes);

/**
 * @swagger
 * /api/ticket-types/getTicketTypeById/{id}:
 *   get:
 *     summary: Ticket type elementini ID bo'yicha olish
 *     tags: [Ticket types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Ticket type topildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
ticketTypeRouter.get('/getTicketTypeById/:id', getTicketTypeById);

/**
 * @swagger
 * /api/ticket-types/updateTicketType/{id}:
 *   put:
 *     summary: Ticket type elementini yangilash
 *     tags: [Ticket types]
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
 *               ticket_type:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Ticket type yangilandi
 *       '400':
 *         description: Noto'g'ri ma'lumot
 */
ticketTypeRouter.put('/updateTicketType/:id', validateTicketType(ticketTypeValidation), updateTicketType);

/**
 * @swagger
 * /api/ticket-types/searchTicketTypes/:
 *   get:
 *     summary: Ticket types bo'yicha qidirish
 *     tags: [Ticket types]
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
ticketTypeRouter.get('/searchTicketTypes', searchTicketTypes);

/**
 * @swagger
 * /api/ticket-types/deleteTicketType/{id}:
 *   delete:
 *     summary: Ticket type elementini o'chirish
 *     tags: [Ticket types]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Ticket type o'chirildi
 *       '404':
 *         description: Ma'lumot topilmadi
 */
ticketTypeRouter.delete('/deleteTicketType/:id', deleteTicketType);

module.exports = ticketTypeRouter;