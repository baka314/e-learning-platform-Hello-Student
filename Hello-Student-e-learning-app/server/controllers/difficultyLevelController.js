const { DifficultyLevel } = require('../models/models');
const ApiError = require('../error/ApiError');

class DifficultyLevelController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            if (!name) {
                return next(ApiError.badRequest("Назва рівня складності обов'язкова"));
            }

            const difficultyLevel = await DifficultyLevel.create({ name });
            return res.json(difficultyLevel);
        } catch (error) {
            console.error("🚨 Помилка при створенні рівня складності:", error);
            return next(ApiError.internal("Помилка сервера"));
        }
    }

    async getAll(req, res, next) {
        try {
            const difficultyLevels = await DifficultyLevel.findAll();
            return res.json(difficultyLevels);
        } catch (error) {
            console.error("🚨 Помилка при отриманні рівнів складності:", error);
            return next(ApiError.internal("Помилка сервера"));
        }
    }
}

module.exports = new DifficultyLevelController();
