import { $authHost, $host } from "./index";

export const createDifficultyLevel = async (difficultyLevel) => {
    try {
        const { data } = await $authHost.post('api/difficultyLevel', difficultyLevel);
        return data;
    } catch (error) {
        console.error("Помилка створення рівня складності:", error);
        throw error;
    }
};

export const fetchDifficultyLevels = async () => {
    try {
        const { data } = await $host.get('api/difficultyLevel');
        return data;
    } catch (error) {
        console.error("Помилка отримання рівнів складності:", error);
        throw error;
    }
};

export const createSpecialization = async (specialization) => {
    try {
        const { data } = await $authHost.post('api/specialization', specialization);
        return data;
    } catch (error) {
        console.error("Помилка створення спеціалізації:", error);
        throw error;
    }
};

export const fetchSpecializations = async () => {
    try {
        const { data } = await $host.get('api/specialization');
        return data;
    } catch (error) {
        console.error("Помилка отримання спеціалізацій:", error);
        throw error;
    }
};

export const createCourse = async (course) => {
    try {
        const { data } = await $authHost.post('api/course', course);
        return data;
    } catch (error) {
        console.error("Помилка створення курсу:", error);
        throw error;
    }
};

export const fetchCourses = async (difficultyLevelId, specializationId, page, limit = 5) => {
    try {
        const { data } = await $host.get('api/course', {
            params: { difficultyLevelId, specializationId, page, limit }
        });
        return data;
    } catch (error) {
        console.error("Помилка отримання курсів:", error);
        throw error;
    }
};

export const fetchOneCourse = async (id) => {
    try {
        const { data } = await $host.get(`api/course/${id}`);
        return data;
    } catch (error) {
        console.error("Помилка отримання курсу:", error);
        throw error;
    }
};