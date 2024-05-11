const express = require("express")

const app = express()

app.get("/", (request, response)=>{
  response.json({message: "Hello World!"})
})

app.listen(3333, ()=>{
  console.log("server running on port 3333! 🚀")
})

