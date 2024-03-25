const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('user', {
	id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	password: {type:DataTypes.STRING, allowNull: false},
	tokenVersion: {type:DataTypes.INTEGER, allowNull:false, defaultValue:0},
	username: {type:DataTypes.STRING, allowNull: false, unique:true},
	role: {type:DataTypes.STRING, defaultValue: 'BASIC'},
})
const PasswordTokens = sequelize.define('passwordToken', {
	id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	email: {type:DataTypes.STRING, allowNull: false, unique: true},
	token: {type:DataTypes.STRING, allowNull: false, unique: true},
	expired: {type:DataTypes.BOOLEAN, allowNull: false, defaultValue: true}
})
const AccessTokens = sequelize.define('accessTokens', {
	id: {type:DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
	token: {type:DataTypes.STRING, allowNull: false},
	expired: {type:DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
})
module.exports = {
	User,
	PasswordTokens,
	AccessTokens
}