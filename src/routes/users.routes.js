const {Router} = require("express")

const usersRoutes = Router()

usersRoutes.post('/', ()=>{})
usersRoutes.get('/:id', (request, response)=>response.json({message: "rotas conectadas"}))
usersRoutes.put('/:id', ()=>{})
usersRoutes.delete(':id', ()=>{})

module.exports = usersRoutes