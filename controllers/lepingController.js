const sequelize = require("../config/database");
const initModels = require("../models/init-models");

const models = initModels(sequelize);

// Создание договора
exports.createLeping = async (req, res) => {
    try {
        const leping = await models.leping.create(req.body);
        res.status(201).json(leping);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при создании договора." });
    }
};

// Получение всех договоров
exports.getAllLepingud = async (req, res) => {
    try {
        const lepingud = await models.leping.findAll({
            include: [
                {
                    model: models.klient,
                    attributes: ["nimi", "perekonnanimi", "kood"],
                },
                {
                    model: models.toode,
                    attributes: ["nimetus", "image", "hind"],
                },
                {
                    model: models.tootaja,
                    attributes: ["nimi", "perekonnanimi"],
                },
            ],
        });
        res.status(200).json(lepingud);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении договоров." });
    }
};

// Получение по ID
exports.getLepingById = async (req, res) => {
    try {
        const leping = await models.leping.findByPk(req.params.id);
        if (!leping)
            return res.status(404).json({ message: "Договор не найден." });
        res.status(200).json(leping);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при получении договора." });
    }
};

// Обновление
exports.updateLeping = async (req, res) => {
    try {
        const leping = await models.leping.findByPk(req.params.id);
        if (!leping)
            return res.status(404).json({ message: "Договор не найден." });

        await leping.update(req.body);
        res.status(200).json({ message: "Договор обновлён", leping });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при обновлении." });
    }
};

// Удаление
exports.deleteLeping = async (req, res) => {
    try {
        const leping = await models.leping.findByPk(req.params.id);
        if (!leping)
            return res.status(404).json({ message: "Договор не найден." });

        await leping.destroy();
        res.status(204).send();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Ошибка при удалении." });
    }
};
