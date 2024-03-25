const Router = require('express')
const router = new Router()
const AccessTokenController = require('../controllers/AccessTokenController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/create', AccessTokenController.create)
router.get('/getLast', AccessTokenController.getLast)
router.get('/checkToken/:token', AccessTokenController.checkToken)

module.exports = router