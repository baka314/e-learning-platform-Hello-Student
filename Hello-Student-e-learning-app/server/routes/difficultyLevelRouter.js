const Router = require('express')
const router = new Router()
const difficultyLevelController = require('../controllers/difficultyLevelController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), difficultyLevelController.create)
router.get('/', difficultyLevelController.getAll)

module.exports = router
