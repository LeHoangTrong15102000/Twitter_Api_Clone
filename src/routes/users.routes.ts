// Chứa các routes của thằng users
import { Router } from 'express'
import { LoginController, RegisterController } from '~/controllers/users.controllers'
import { LoginValidator, RegisterValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
import { validate } from '~/utils/validation'
const usersRouter = Router()

// Params đầu tiên sẽ là cái path, params thứ 2 -> 9 là cái handler này đóng vai trò như là một middleware vậy
usersRouter.post('/login', LoginValidator, LoginController)

/**
 * Description. Register a new user
 * Path: /register
 * Method: POST
 * body: {name: string ,email: string, password: string, confirm_password: string, date_of_birth: ISO8601(ISOString)}
 */

usersRouter.post('/register', RegisterValidator, wrapRequestHandler(RegisterController))

export default usersRouter
