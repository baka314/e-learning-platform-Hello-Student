const Router = require('express')
const router = new Router()
const courseRouter = require('./courseRouter')
const userRouter = require('./userRouter')
const specializationRouter = require('./specializationRouter')
const difficultyLevelRouter = require('./difficultyLevelRouter')
const basketRouter=require('./basketRouter')


router.use('/user', userRouter)
router.use('/difficultyLevel', difficultyLevelRouter)
router.use('/specialization', specializationRouter)
router.use('/course', courseRouter)
router.use('/basket', basketRouter)

module.exports = router
