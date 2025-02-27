const Router = require('express')
const router = new Router()
const specializationController = require('../controllers/specializationController')

router.post('/', specializationController.create)
router.get('/', specializationController.getAll)

module.exports = router
