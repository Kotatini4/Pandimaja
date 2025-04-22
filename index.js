const express = require("express");
const app = express();
require("dotenv").config();

const sequelize = require("./config/database");
const initModels = require("./models/init-models");

// Инициализация моделей
const models = initModels(sequelize);

// Middleware
app.use(express.json());

// Маршруты
const authRoutes = require("./routes/authRoutes");
//const klientRoutes = require("./routes/klient.routes");
//const toodeRoutes = require("./routes/toode.routes");
//const lepingRoutes = require("./routes/leping.routes");

app.use("/api/auth", authRoutes);
//app.use("/api/clients", klientRoutes);
//app.use("/api/products", toodeRoutes);
//app.use("/api/contracts", lepingRoutes);

// Порт
const PORT = process.env.PORT || 3000;

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Базовый обработчик ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

module.exports = { app, models };
