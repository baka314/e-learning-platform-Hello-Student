const uuid = require('uuid');
const path = require('path');
const { Course } = require('../models/models');
const ApiError = require('../error/ApiError');

class CourseController {
    async create(req, res, next) {
        try {
            let { name, specializationId, difficultyLevelId, aboutCourse, knowledgeTest, theoryChapters } = req.body;
            const { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            // Парсим JSON-данные
            let parsedTest = knowledgeTest ? JSON.parse(knowledgeTest) : null;
            let parsedChapters = theoryChapters ? JSON.parse(theoryChapters) : [];

            const course = await Course.create({
                name,
                specializationId,
                difficultyLevelId,
                img: fileName,
                aboutCourse,
                theoryChapters: parsedChapters,
                knowledgeTest: parsedTest
            });

            return res.json(course);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { specializationId, difficultyLevelId, limit, page } = req.query;
        page = Number(page) || 1;
        limit = Number(limit) || 9;
        let offset = (page - 1) * limit;

        let whereCondition = {};
        if (specializationId) whereCondition.specializationId = specializationId;
        if (difficultyLevelId) whereCondition.difficultyLevelId = difficultyLevelId;

        const courses = await Course.findAndCountAll({ where: whereCondition, limit, offset });
        return res.json(courses);
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const course = await Course.findOne({ where: { id } });

            if (!course) {
                return next(ApiError.badRequest('Курс не найден'));
            }

            return res.json(course);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async addChapter(req, res, next) {
        try {
            const { courseId, title, theory, test } = req.body;
            const course = await Course.findByPk(courseId);
            if (!course) return next(ApiError.badRequest("Курс не найден"));

            let chapters = course.theoryChapters || [];
            chapters.push({ title, theory, test });

            course.theoryChapters = chapters;
            await course.save();

            return res.json(course);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async addFinalQuestion(req, res, next) {
        try {
            const { courseId, question, answers } = req.body;
            const course = await Course.findByPk(courseId);
            if (!course) return next(ApiError.badRequest("Курс не найден"));

            let finalTest = course.knowledgeTest || [];
            finalTest.push({ question, answers });

            course.knowledgeTest = finalTest;
            await course.save();

            return res.json(course);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async checkChapterTest(req, res, next) {
        try {
            const { courseId, chapterIndex, userAnswers } = req.body;
            const course = await Course.findByPk(courseId);
            if (!course || !course.theoryChapters) return next(ApiError.badRequest("Глава не найдена"));

            let chapter = course.theoryChapters[chapterIndex];
            if (!chapter || !chapter.test) return next(ApiError.badRequest("Тест в этой главе отсутствует"));

            let correct = 0;
            let total = chapter.test.length;

            chapter.test.forEach((question, index) => {
                const correctAnswer = question.answers.find(a => a.isCorrect);
                if (userAnswers[index] === correctAnswer.text) {
                    correct++;
                }
            });

            return res.json({ correct, total });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async checkFinalTest(req, res, next) {
        try {
            const { courseId, userAnswers } = req.body;
            const course = await Course.findByPk(courseId);
            if (!course || !course.knowledgeTest) return next(ApiError.badRequest("Финальный тест не найден"));

            let correct = 0;
            let total = course.knowledgeTest.length;

            course.knowledgeTest.forEach((question, index) => {
                const correctAnswer = question.answers.find(a => a.isCorrect);
                if (userAnswers[index] === correctAnswer.text) {
                    correct++;
                }
            });

            return res.json({ correct, total });
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new CourseController();
