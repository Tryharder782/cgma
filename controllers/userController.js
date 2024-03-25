const ApiError = require("../ErrorApi/ApiError")
const { User, UserInfo, Chat, PasswordTokens } = require("../models/models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { where, Op } = require("sequelize")
const { Sequelize } = require("../db")
const path = require("path")
const uuid = require('uuid')


const generateJwt = (user) => {
   return jwt.sign(
   {
      id: user.id, 
      username: user.username, 
      role: user.role, 
      tokenVersion: user.tokenVersion
   },
   process.env.SECRET_KEY,
   { expiresIn: '24h' }
)
}


class UserController {
	async registration(req, res, next) {
		try {
         let {username, password} = req.body
			console.log('asdfasdfaksdfalkjsdhf')
			if (!username || !password){
				return next(ApiError.badRequest('no username or password provided'))
			}
			const hashPassword = await bcrypt.hash(password, 10)
			let newUser;
			await User.create({username, password: hashPassword}).then(data => {
				newUser = data.get({plain:true})
			})
			console.log(newUser)
			const token = generateJwt(newUser)
			return res.json( {token} )
		}
		catch (e) {
			return next(ApiError.badRequest(e.message))
		}
	}

	async login(req, res, next) {
		try {
			let {username, password} = req.body
			console.log(username, password)
			let user;
			await User.findOne({where: {username}}).then(data =>{
				if (!data){
					return next(ApiError.badRequest('no such user was found'))
				}
				else{
					user = data
				}
			})
			let comparePassword = bcrypt.compareSync(password, user.password)
			console.log(comparePassword)
			if (!comparePassword){
				return next(ApiError.badRequest('wrong password'))
			}
			delete user.password
			const token = generateJwt(user)
			return res.json({ token })
		} catch (error){
			return next(ApiError.internal(error))
		}
	}
	async check(req, res, next) {
		// console.log(req.user)
		try {
			const token = generateJwt(req.user)
		return res.json({token})
		} catch (error) {
			return next(ApiError.internal(error))
		}
	}
	async auth(req, res, next) {
		try {
			const {id, tokenVersion} = req.body
			const compareUser = await User.findOne({where: {id}})
			if (!compareUser) {
				return next(ApiError.internal(`couldn\'t find user to compare, user id: ${userId}`))
			}
			if (Number(tokenVersion) === compareUser.tokenVersion)
			{
				console.log('auth OK')
				return res.status(200).send('OK')	
			}
			else {
				return res.status(401)
			}
		} catch (error) {
			return next(ApiError.internal(error))
		}
	}
	// async update(req,res,next) {
	// 	try {
	// 		let {id} = req.params
	// 	id = Number(id)
	// 	const {userName, password, status, birthDate, isPrivate, tokenVersion} = req.body
	// 	const {pfp} = req.files
	// 	console.log('update', pfp);
	// 	let requestUser 
	// 	if (userName){
	// 		requestUser = {...requestUser, userName}
	// 	}
	// 	if ( pfp!== 'undefined' ){
	// 		let fileExtension = pfp.mimetype.split('/')[1]
	// 		if (fileExtension === 'jpeg') {
	// 			fileExtension	= 'jpg'
	// 		}
	// 		console.log(fileExtension)
	// 		let fileName = uuid.v4() + '.' + fileExtension
	// 		pfp.mv(path.resolve(__dirname, '..', 'static', `${fileName}`))
	// 		console.log(`file has been moved to ${path.resolve(__dirname, '..', 'static', `${fileName}`)}`)
	// 		requestUser = {...requestUser, profilePicture: fileName}
	// 	}
	// 	let requestUserInfo
	// 	if (password!== ('null')) {
	// 		const hashPassword = await bcrypt.hash(password, 10)
	// 		requestUserInfo = {...requestUserInfo, password : hashPassword, tokenVersion: Number(tokenVersion) + 1}
	// 	}
	// 	if (status) {
	// 		requestUserInfo = {...requestUserInfo, status}
	// 	}
	// 	if (birthDate) {
	// 		const birthDay = Number(birthDate.split('-')[2])
	// 		const birthMonth = Number(birthDate.split('-')[1])
	// 		const birthYear = Number(birthDate.split('-')[0])
	// 		requestUserInfo = {...requestUserInfo, birthDay, birthMonth, birthYear}
	// 	}
	// 	if (isPrivate) {
   //       requestUserInfo = {...requestUserInfo, isPrivate}
   //    }
	// 	// console.log(requestUser, requestUserInfo)
	// 	let updatedUser
	// 	await User.update(requestUser, {where:  {id}})
	// 	await UserInfo.update(requestUserInfo, {where: {userId: id}})
	// 	updatedUser = await User.findOne({
	// 		where : {id},
	// 		include: [{model: UserInfo}],
	// 		attributes: {exclude: ['createdAt', 'updatedAt']} 
	// 	})
	//  	// console.log(updatedUser);
	// 	return res.json(generateJwt(updatedUser,'reg/log'))

	// 	} catch (error) {
	// 		return next(ApiError.internal(error))
	// 	}
		
	// }
	
	async getAll(req,res,next) {
		try {
			return res.json(await User.findAll({}))
		} catch (error) {
			return next(ApiError.internal(error))
		}
	}
	// async getExact (req,res,next) {
	// 	try {
		
	// 	} catch (error) {
	// 		return next(ApiError.internal(error))
	// 	}
		
	// }

	
	async checkPassword (req,res,next){
		try {
			const {inputPass, userId} = req.body
			const password = await UserInfo.findOne({where: {userId}, attributes: ['password']})
			return res.json(bcrypt.compareSync(inputPass, password.get('password')))
		} catch (error) {
			return next(ApiError.internal(error))
		}
	}
	// async getUser (req, res, next){
	// 	try {
	// 		const userId = req.params.id
	// 		if (!userId) {
	// 			return next(ApiError.badRequest('specify user id'))
	// 		}
	// 		const user = await User.findOne({where: { id: userId }})
	// 		return res.json(user)
	// 	} catch (error) {
	// 		return next(ApiError.internal(error))
	// 	}
	// }
	// async changePassword (req,res,next){
	// 	try {
	// 		const {newPassword, token} = req.body
	// 		if (!newPassword || !token){
	// 			return next(ApiError.badRequest('no password or token specified'))
	// 		}
	// 		const changingUser = await PasswordTokens.findOne({where: {token}})
	// 		if (!changingUser){
	// 			return next(ApiError.badRequest('no password recovery requested'))
	// 		}
	// 		else if (changingUser.expired){
	// 			return next(ApiError.badRequest('password recovery expired'))
	// 		}
	// 		const hashPassword = await bcrypt.hash(newPassword, 10)
	// 		await UserInfo.update({password: hashPassword}, {where: {email: changingUser.email}})
	// 	} catch (error) {
	// 		console.log(error)
	// 		return next(ApiError.internal(error))
	// 	}
	// }
}

module.exports = new UserController()