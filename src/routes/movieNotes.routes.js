const {Router} = require("express")

const movieNotesRoutes = Router()

movieNotesRoutes.post('/', ()=>{})
movieNotesRoutes.get('/:user_id', ()=>{})
movieNotesRoutes.get('/:id', ()=>{})
movieNotesRoutes.delete('/:id', ()=>{})

module.exports = movieNotesRoutes