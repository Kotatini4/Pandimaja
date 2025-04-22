const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Роут для регистрации нового пользователя
router.post("/register", authController.register);

// Роут для логина
router.post("/login", authController.login);

module.exports = router;
