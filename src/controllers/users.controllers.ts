// xử lý logic cho phần kết quả trả về thì xử lý trong đây
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'

import usersService from '~/services/users.services'

export const LoginController = (req: Request, res: Response) => {
  const { email, password } = req.body

  if (email === 'langtupro0456@gmail.com' && password === '123123123') {
    return res.json({
      message: 'Login success'
    })
  }

  return res.status(400).json({
    message: 'Login failed'
  })
}

export const RegisterController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, password, confirm_password, name, date_of_birth } = req.body

  // throw new Error('Test lỗi')
  const result = await usersService.register({ email, name, password, confirm_password, date_of_birth })
  // console.log('Result users', result)

  return res.json({
    message: 'Register success',
    result
  })
}

export const getMe = () => {
  // đươc thôi được mà
}
