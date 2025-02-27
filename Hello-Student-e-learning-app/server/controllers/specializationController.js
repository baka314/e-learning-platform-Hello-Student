const { Specialization } = require('../models/models');
const ApiError = require('../error/ApiError');

class SpecializationController {
    async create(req, res, next) {
        try {
            const { name } = req.body;
            if (!name) {
                return next(ApiError.badRequest("Назва спеціалізації обов'язкова"));
            }

            const specialization = await Specialization.create({ name });
            return res.json(specialization);
        } catch (error) {
            console.error("🚨 Помилка при створенні рівня складності:", error);
            return next(ApiError.internal("Помилка сервера"));
        }
    }

    async getAll(req, res, next) {
        try {
            const specializations = await Specialization.findAll();
            return res.json(specializations);
        } catch (error) {
            console.error("🚨 Помилка при спеціалізацій:", error);
            return next(ApiError.internal("Помилка сервера"));
        }
    }
}

module.exports = new SpecializationController();
