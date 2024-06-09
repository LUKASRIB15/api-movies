const {Router} = require("express")
const UsersControllers = require("../controllers/usersControllers")
const UserAvatarController = require("../controllers/userAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const multer = require("multer")
const uploadConfig = require("../configs/upload")


const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

const usersControllers = new UsersControllers()
const userAvatarController = new UserAvatarController()

usersRoutes.post('/', usersControllers.create)
usersRoutes.get('/:id', usersControllers.show)
usersRoutes.put('/', ensureAuthenticated, usersControllers.update)
usersRoutes.delete('/', ensureAuthenticated, usersControllers.delete)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = usersRoutes