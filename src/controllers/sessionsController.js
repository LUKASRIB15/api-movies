const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const {compare} = require("bcryptjs")
const Auth = require("../configs/jwt")
const { sign } = require("jsonwebtoken")

class SessionsController{
  async create(request, response){
    const {email, password} = request.body
     
    const user = await knex("users").where({email}).first()
  
    if(!user){
      throw new AppError("E-mail or password incorrect!", 404)
    }

    const passwordMatch = await compare(password, user.password)

    if(!passwordMatch){
      throw new AppError("E-mail or password incorrect!", 401)
    }

    const {secret, expiresIn} = Auth.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return response.json({user, token})
  }
}

module.exports = SessionsController