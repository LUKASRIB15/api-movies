const {Router} = require("express")
const MovieNotesController = require("../controllers/movieNotesController")

const movieNotesRoutes = Router()
const movieNotesController = new MovieNotesController()

movieNotesRoutes.post('/:user_id', movieNotesController.create)
movieNotesRoutes.get('/:user_id', movieNotesController.index)
movieNotesRoutes.get('/my-note/:id', movieNotesController.show)
movieNotesRoutes.delete('/:id', movieNotesController.delete)

module.exports = movieNotesRoutes