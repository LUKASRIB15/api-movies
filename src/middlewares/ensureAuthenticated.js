const { verify } = require("jsonwebtoken")
const AppError = require("../utils/AppError")
const Auth = require("../configs/jwt")

function ensureAuthenticated(request, response, next){
  const authHeader = request.headers.authorization

  if(!authHeader){
    throw new AppError("JWT Token is missing!", 401)
  }

  // Bearer xxxxxxxxxx.xxxxxxxxxx.xxxxxxxxxx
  // [Bearer, xxxxxxxxxx.xxxxxxxxxx.xxxxxxxxxx]
  const [, token] = authHeader.split(" ")

  try{
    const {sub: user_id} = verify(token, Auth.jwt.secret)

    request.user = {
      id: Number(user_id)
    }

    return next()
  }catch{
    throw new AppError("JWT Token is invalid!", 401)
  }
}

module.exports = ensureAuthenticated