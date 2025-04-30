const express = require("express");
const router = express.Router();
const toodeController = require("../controllers/toodeController");
const multer = require("multer");
const path = require("path");

/**
 * @swagger
 * tags:
 *   name: Toode
 *   description: API для работы с товарами
 */

/**
 * @swagger
 * /api/toode:
 *   post:
 *     summary: Создать новый товар
 *     tags: [Toode]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nimetus
 *               - status_id
 *               - hind
 *             properties:
 *               nimetus:
 *                 type: string
 *               kirjaldus:
 *                 type: string
 *               status_id:
 *                 type: integer
 *               image:
 *                 type: string
 *               hind:
 *                 type: number
 *     responses:
 *       201:
 *         description: Товар успешно создан
 */
router.post("/", toodeController.createToode);

/**
 * @swagger
 * /api/toode:
 *   get:
 *     summary: Получить список всех товаров
 *     tags: [Toode]
 *     responses:
 *       200:
 *         description: Список товаров
 */
router.get("/", toodeController.getAllTooded);

/**
 * @swagger
 * /api/toode/search:
 *   get:
 *     summary: Поиск товара по наименованию
 *     tags: [Toode]
 *     parameters:
 *       - name: nimetus
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Список найденных товаров
 */
router.get("/search", toodeController.searchTooded);

/**
 * @swagger
 * /api/toode/{id}:
 *   get:
 *     summary: Получить товар по ID
 *     tags: [Toode]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о товаре
 *       404:
 *         description: Товар не найден
 */
router.get("/:id", toodeController.getToodeById);

/**
 * @swagger
 * /api/toode/{id}:
 *   put:
 *     summary: Обновить товар по ID
 *     tags: [Toode]
 *     parameters:
 *       - name: id
 *         in: path
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
 *               nimetus:
 *                 type: string
 *               kirjaldus:
 *                 type: string
 *               status_id:
 *                 type: integer
 *               image:
 *                 type: string
 *               hind:
 *                 type: number
 *     responses:
 *       200:
 *         description: Товар обновлен
 *       404:
 *         description: Товар не найден
 */
router.put("/:id", toodeController.updateToode);

/**
 * @swagger
 * /api/toode/{id}:
 *   delete:
 *     summary: Удалить товар по ID
 *     tags: [Toode]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Товар успешно удалён
 *       404:
 *         description: Товар не найден
 */
router.delete("/:id", toodeController.deleteToode);

/**
 * @swagger
 * /api/toode/status/{status_id}:
 *   get:
 *     summary: Получить список товаров по статусу
 *     tags: [Toode]
 *     parameters:
 *       - name: status_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID статуса товара
 *     responses:
 *       200:
 *         description: Список товаров с указанным статусом
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   toode_id:
 *                     type: integer
 *                   nimetus:
 *                     type: string
 *                   kirjaldus:
 *                     type: string
 *                   status_id:
 *                     type: integer
 *                   image:
 *                     type: string
 *                   hind:
 *                     type: number
 *       404:
 *         description: Товары с таким статусом не найдены
 */
router.get("/status/:status_id", toodeController.getToodedByStatus);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName =
            "toode_" + Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

const upload = multer({ storage });

/**
 * @swagger
 * /api/toode/upload:
 *   post:
 *     summary: Загрузить изображение товара
 *     tags: [Toode]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Файл успешно загружен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                   example: http://localhost:3000/uploads/toode_1714761234567.jpg
 *       400:
 *         description: Файл не был загружен
 */
router.post("/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
    }`;
    res.status(200).json({ image: fullUrl });
});
module.exports = router;
