const express = require("express")
const routes = require("./routes")
const database = require("./database/sqlite")

database()

const app = express()
app.use(routes)

app.listen(3333, ()=>{
  console.log("server running on port 3333! 🚀")
})

