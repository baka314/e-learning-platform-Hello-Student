import { makeAutoObservable } from "mobx";

class CourseStore {
    constructor() {
        this._difficultyLevels = [];
        this._specializations = [];
        this._courses = [];
        this._selectedDifficultyLevel = {};
        this._selectedSpecialization = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 3;
        this._selectedCourse = {};  // Для хранения выбранного курса с теорией и тестом
        makeAutoObservable(this);
    }

    setDifficultyLevels(difficultyLevels) {
        this._difficultyLevels = difficultyLevels;
    }

    setSpecializations(specializations) {
        this._specializations = specializations;
    }

    setCourses(courses) {
        this._courses = courses;
    }

    setSelectedDifficultyLevel(difficultyLevel) {
        this.setPage(1);
        this._selectedDifficultyLevel = difficultyLevel;
    }

    setSelectedSpecialization(specialization) {
        this.setPage(1);
        this._selectedSpecialization = specialization;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(count) {
        this._totalCount = count;
    }

    // Добавлен метод для установки выбранного курса с теорией и тестом
    setSelectedCourse(course) {
        this._selectedCourse = course;
    }

    // Добавлен метод для получения теории выбранного курса
    getCourseTheory() {
        return this._selectedCourse.theory;
    }

    // Добавлен метод для получения теста на проверку знаний выбранного курса
    getCourseKnowledgeTest() {
        return this._selectedCourse.knowledgeTest;
    }

    get difficultyLevels() {
        return this._difficultyLevels;
    }

    get specializations() {
        return this._specializations;
    }

    get courses() {
        return this._courses;
    }

    get selectedDifficultyLevel() {
        return this._selectedDifficultyLevel;
    }

    get selectedSpecialization() {
        return this._selectedSpecialization;
    }

    get selectedCourse() {
        return this._selectedCourse;
    }

    get totalCount() {
        return this._totalCount;
    }

    get page() {
        return this._page;
    }

    get limit() {
        return this._limit;
    }
}

export default CourseStore;
