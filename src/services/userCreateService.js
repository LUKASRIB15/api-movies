const { hash } = require("bcryptjs")
const AppError = require("../utils/AppError")
const Auth = require("../configs/jwt")
const { sign } = require("jsonwebtoken")

class UserCreateService{
  constructor(userRepository){
    this.userRepository = userRepository
  }

  async execute({name, email, password}){
    const userEmailExists = await this.userRepository.findByEmail(email)

    if(userEmailExists){
      throw new AppError("This email already is in use by other user! Try with another email.")
    }

    const hashedPassword = await hash(password, 8)

    const {user_id} = await this.userRepository.create({name, email, password: hashedPassword})

    const {secret, expiresIn} = Auth.jwt

    const token = sign({}, secret, {
      subject: String(user_id),
      expiresIn
    })

    return {token}
  }
}

module.exports = UserCreateService