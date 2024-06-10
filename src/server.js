// This import (express-async-errors) resolved my problem with the errors of AppError

// Error: node:internal/process/promises:289
// triggerUncaughtException(err, true /* fromPromise */);

// UnhandledPromiseRejection: This error originated either by throwing inside of an async function without a catch block, 
// or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason "#<AppError>"
require("express-async-errors")

const express = require("express")
const routes = require("./routes")
const database = require("./database/sqlite")
const AppError = require("./utils/AppError")
const uploadConfig = require("./configs/upload")
const cors = require("cors")


const app = express()
app.use(cors())
app.use(express.json())
app.use(routes)
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

database()

app.use((error, request, response, next)=>{
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.log(error)

  return response.status(500).json({
    status: 'error',
    message: 'Server Internal Error'
  })
})

app.listen(3333, ()=>{
  console.log("server running on port 3333! 🚀")
})

