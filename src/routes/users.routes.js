const {Router} = require("express")
const UsersControllers = require("../controllers/usersControllers")


const usersRoutes = Router()

const usersControllers = new UsersControllers()

usersRoutes.post('/', usersControllers.create)
usersRoutes.get('/:id', usersControllers.show)
usersRoutes.put('/:id', usersControllers.update)
usersRoutes.delete('/:id', usersControllers.delete)

module.exports = usersRoutes