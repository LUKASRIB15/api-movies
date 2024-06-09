const {Router} = require("express")
const usersRoutes = require("../routes/users.routes")
const movieNotesRoutes = require("../routes/movieNotes.routes")
const movieTagsRoutes = require("../routes/movieTags.routes")
const sessionsRoutes = require("../routes/sessions.routes")

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/movie-notes', movieNotesRoutes)
routes.use('/movie-tags', movieTagsRoutes)
routes.use('/sessions', sessionsRoutes)

module.exports = routes