const express = require("express");
const router = express.Router();
const {
    verifyToken,
    isAdmin,
    isUserOrAdmin,
} = require("../middleware/authMiddleware");
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
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       201:
 *         description: Клиент успешно добавлен
 */
router.post("/", verifyToken, isUserOrAdmin, klientController.createKlient);

/**
 * @swagger
 * /api/klient:
 *   get:
 *     summary: Получить всех клиентов
 *     tags: [Klient]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Список клиентов
 */
router.get("/", verifyToken, isUserOrAdmin, klientController.getAllKlients);

/**
 * @swagger
 * /api/klient/search:
 *   get:
 *     summary: Найти клиента по имени, фамилии или коду
 *     tags: [Klient]
 *     security:
 *       - bearerAuth: []
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
router.get(
    "/search",
    verifyToken,
    isUserOrAdmin,
    klientController.searchKlients
);

/**
 * @swagger
 * /api/klient/{id}:
 *   get:
 *     summary: Получить клиента по ID
 *     tags: [Klient]
 *     security:
 *       - bearerAuth: []
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
router.get("/:id", verifyToken, isUserOrAdmin, klientController.getKlientById);

/**
 * @swagger
 * /api/klient/{id}:
 *   patch:
 *     summary: Обновить данные клиента
 *     tags: [Klient]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       200:
 *         description: Данные клиента обновлены
 */
router.patch("/:id", verifyToken, isAdmin, klientController.updateKlient);

module.exports = router;
