const ApiError = require("../ErrorApi/ApiError")
const { User, UserInfo, Chat, PasswordTokens, AccessTokens } = require("../models/models")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { where, Op } = require("sequelize")
const { Sequelize } = require("../db")
const path = require("path")
const uuid = require('uuid')

function generateRandomCode(length) {
   // Define the characters that can be included in the code
   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   
   let result = '';
   const charactersLength = characters.length;
   
   // Generate a random index to pick characters from the 'characters' string
   for (let i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   
   return result;
}

class AccessTokenController {
	async create(req, res, next) {
      try{
         const token = generateRandomCode(5)
         await AccessTokens.create({token}).then(data => {
            if (!data){
               return next(ApiError.internal())
            }
         })
         return res.json({token})
      }catch (error){
         return next(ApiError.internal)
      }
   }
   async getLast(req, res, next) {
      try{
         const tokens = await AccessTokens.findAll()
         if (!tokens) {
            return next(ApiError.internal)
         }
         const lastToken = tokens[tokens.length-1].token
         return res.json({lastToken})
      }catch (error){
         return next(ApiError.internal)
      }
   }
   async checkToken(req, res, next) {
      try{
         const { token } = req.params
         console.log(token)
         const foundToken = await AccessTokens.findOne({token,expired: false})
         console.log(foundToken)
         if (!foundToken) {
            return next(ApiError.internal)
         }
         return res.json({token})
      }catch (error){
         return next(ApiError.internal)
      }
   }
}

module.exports = new AccessTokenController()