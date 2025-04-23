const express = require("express");
const router = express.Router();
const klientController = require("../controllers/klientController");

/**
 * @swagger
 * tags:
 *   name: Klient
 *   description: API для работы с клиентами
 */

/**
 * @swagger
 * /api/klient:
 *   post:
 *     summary: Добавить нового клиента
 *     tags: [Klient]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nimi
 *               - perekonnanimi
 *               - kood
 *             properties:
 *               nimi:
 *                 type: string
 *               perekonnanimi:
 *                 type: string
 *               kood:
 *                 type: string
 *               tel:
 *                 type: string
 *               aadres:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - blocked
 *     responses:
 *       201:
 *         description: Клиент успешно добавлен
 */
router.post("/", klientController.createKlient);

/**
 * @swagger
 * /api/klient:
 *   get:
 *     summary: Получить всех клиентов
 *     tags: [Klient]
 *     responses:
 *       200:
 *         description: Список клиентов
 */
router.get("/", klientController.getAllKlients);

/**
 * @swagger
 * /api/klient/search:
 *   get:
 *     summary: Найти клиента по имени, фамилии или коду
 *     tags: [Klient]
 *     parameters:
 *       - name: nimi
 *         in: query
 *         schema:
 *           type: string
 *       - name: perekonnanimi
 *         in: query
 *         schema:
 *           type: string
 *       - name: kood
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Клиенты найдены
 */
router.get("/search", klientController.searchKlients);

/**
 * @swagger
 * /api/klient/{id}:
 *   get:
 *     summary: Получить клиента по ID
 *     tags: [Klient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID клиента
 *     responses:
 *       200:
 *         description: Информация о клиенте
 */
router.get("/:id", klientController.getKlientById);

/**
 * @swagger
 * /api/klient/{id}:
 *   patch:
 *     summary: Обновить данные клиента
 *     tags: [Klient]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID клиента
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nimi:
 *                 type: string
 *               perekonnanimi:
 *                 type: string
 *               tel:
 *                 type: string
 *               aadres:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - blocked
 *     responses:
 *       200:
 *         description: Данные клиента успешно обновлены
 *       404:
 *         description: Клиент не найден
 */
router.patch("/:id", klientController.updateKlient);

module.exports = router;
