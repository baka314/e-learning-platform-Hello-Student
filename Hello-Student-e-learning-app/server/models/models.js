const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    nickname: { type: DataTypes.STRING, defaultValue: "user" }
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    comment: { type: DataTypes.STRING, allowNull: true },
})

const BasketCourse = sequelize.define('basketCourse', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
})

    const Course = sequelize.define('course', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
        img: { type: DataTypes.STRING, allowNull: false },
        aboutCourse: { type: DataTypes.TEXT, allowNull: true },
        knowledgeTest: { type: DataTypes.JSON, allowNull: true },
        theoryChapters: { type: DataTypes.JSON, allowNull: true } // Додано поле
    })



const DifficultyLevel = sequelize.define('difficultyLevel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Specialization = sequelize.define('specialization', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
})

const DifficultyLevelSpecialization = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketCourse)
BasketCourse.belongsTo(Basket)

DifficultyLevel.hasMany(Course)
Course.belongsTo(DifficultyLevel)

Specialization.hasMany(Course)
Course.belongsTo(Specialization)

Course.hasMany(BasketCourse)
BasketCourse.belongsTo(Course)

DifficultyLevel.belongsToMany(Specialization, { through: DifficultyLevelSpecialization })
Specialization.belongsToMany(DifficultyLevel, { through: DifficultyLevelSpecialization })

module.exports = {
    User,
    Basket,
    BasketCourse,
    Course,
    DifficultyLevel,
    Specialization,
    DifficultyLevelSpecialization,

}


