const knex = require('../database/knex')
const AppError = require('../utils/AppError')
const {compare, hash} = require("bcryptjs")
const {sign} = require("jsonwebtoken")
const Auth = require("../configs/jwt")

class UsersControllers{
  async create(request, response){
    const {name, email, password} = request.body

    const userEmailExists = await knex("users").where({email}).first()

    if(userEmailExists){
      throw new AppError("This email already is in use by other user! Try with another email.")
    }

    const hashedPassword = await hash(password, 8)

    const [user_id] = await knex("users").insert({
      name,
      email,
      password: hashedPassword,
    })

    const {secret, expiresIn} = Auth.jwt

    const token = sign({}, secret, {
      subject: String(user_id),
      expiresIn
    })

    return response.status(201).json({token})
  }

  async show(request, response){
    const {id} = request.params

    const user = await knex("users").where({id}).first()

    if(!user){
      throw new AppError("User not found!")
    }

    return response.json(user)
  }

  async update(request, response){
    const {name, email, password, old_password} = request.body
    const id = request.user.id

    const user = await knex("users").where({id}).first()

    if(!user){
      throw new AppError("User not found!", 404)
    }

    const userEmailExists = await knex("users").where({email}).first()

    if(userEmailExists && userEmailExists.id !== user.id){
      throw new AppError("This email already is in use by other user! Try with another email.")
    }

    if(!password || !old_password){
      throw new AppError("For update password, we need you to enter the new password and old password!")
    }

    const checkOldPassword = await compare(old_password, user.password)

    if(!checkOldPassword){
      throw new AppError("Old password does not match with password of user!")
    }

    user.password = await hash(password, 8) ?? user.password
    user.name = name ?? user.name
    user.email = email ?? user.email
    user.updated_at = knex.fn.now()

    await knex("users").update(user).where({id: user.id})

    return response.json()
  }

  async delete(request, response){
    const id = request.user.id

    const user = await knex("users").where({id}).first()

    if(!user){
      throw new AppError("User not found!", 404)
    }

    await knex("users").where({id}).delete()

    return response.json()
  }
}

module.exports = UsersControllers