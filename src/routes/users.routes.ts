// Chứa các routes của thằng users
import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { validate } from '~/utils/validation'
const usersRouter = Router()

// Params đầu tiên sẽ là cái path, params thứ 2 -> 9 là cái handler này đóng vai trò như là một middleware vậy
usersRouter.post('/login', loginValidator, loginController)

/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * body: {name: string ,email: string, password: string, confirm_password: string, date_of_birth: ISO8601(ISOString)}
 */

usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default usersRouter
