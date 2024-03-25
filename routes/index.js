const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const accessTokenRouter = require('./accessTokenRouter')

router.use('/users', userRouter)
router.use('/accessToken', accessTokenRouter)

module.exports = router