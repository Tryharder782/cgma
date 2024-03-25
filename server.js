const express = require('express')
const sequelize = require('./db')
const app = module.exports = express();
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const filePathMiddleware = require('./middlewares/filePathMiddleware')
const errorHandler = require('./middlewares/ErrorHandlingMiddleware')
const server = require("http").createServer(app)
const http = require('http');
const router = require('./routes');
const PORT = process.env.PORT



app.use(cors())
app.use(express.json())
app.use(filePathMiddleware(path.resolve(__dirname, './temp')))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({
	useTempFiles: true,
	tempFileDir: path.resolve(__dirname, './temp')
}))
app.use('/api', router)
app.use (express.static(path.join(__dirname, 'client/build')))
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, 'client/build/index.html'))
})
app.use(errorHandler)



const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync({logging: console.log})
		server.listen(PORT, () => console.log(`Server started at PORT ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}
start()
