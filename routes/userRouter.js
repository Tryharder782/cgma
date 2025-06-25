const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/registration', UserController.registration)
router.post('/login',  UserController.login)
router.get('/check', authMiddleware, UserController.check)
router.post('/auth', UserController.auth)
router.post('/guest', UserController.guest)
// router.put('/update/:id', UserController.update)
router.get('/getAll', UserController.getAll) //checkRole('ADMIN')
// router.post('/getExact', UserController.getExact)
router.post('/checkPassword', UserController.checkPassword)

module.exports = router