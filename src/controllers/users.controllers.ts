// xử lý logic cho phần kết quả trả về thì xử lý trong đây
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import {
  ForgotPasswordReqBody,
  GetProfileReqParams,
  LoginReqBody,
  LogoutReqBody,
  RegisterReqBody,
  TokenPayload,
  VerifyEmailReqBody,
  VerifyForgotPasswordReqBody
} from '~/models/requests/User.requests'
import User, { UserType } from '~/models/schemas/User.schema'
import { config } from 'dotenv'

import usersService from '~/services/users.services'
import { ObjectId } from 'mongodb'
import { USERS_MESSAGES } from '~/constants/messages'

config()

// Controller là bước cuối cùng xử lý để trả về cho client
export const loginController = async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response) => {
  // Xử lý logic cho phần loginController
  const user = req.user as User
  const user_id = user._id as ObjectId
  const result = await usersService.login({ user_id: user_id.toString(), verify: user.verify })
  return res.json({
    message: USERS_MESSAGES.LOGIN_SUCCESS,
    result
  })
  // const { email, password } = req.body
  // if (email === 'langtupro0456@gmail.com' && password === '123123123') {
  //   return res.json({
  //     message: 'Login success'
  //   })
  // }
  // return res.status(400).json({
  //   message: 'Login failed'
  // })
}

export const oauthController = async (req: Request, res: Response) => {
  const { code } = req.query
  const result = await usersService.oauth(code as string)
  const urlRedirect = `${process.env.CLIENT_REDIRECT_CALLBACK}?access_token=${result.access_token}&refresh_token=${result.refresh_token}&new_user=${result.newUser}&verify=${result.verify}`

  return res.redirect(urlRedirect) // thành công thì redirect
}

export const registerController = async (
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

export const logoutController = async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response) => {
  const { refresh_token } = req.body
  const result = await usersService.logout(refresh_token)
  return res.json(result)
}

export const verifyEmailController = async (
  req: Request<ParamsDictionary, any, VerifyEmailReqBody>,
  res: Response,
  next: NextFunction
) => {
  // const { user_id } = req.decoded_email_verify_token as TokenPayload
  return {}
}

export const resendVerifyEmailController = async () => {
  return
}

export const forgotPasswordController = async (
  req: Request<ParamsDictionary, any, ForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  return
}

export const verifyForgotPasswordController = async (
  req: Request<ParamsDictionary, any, VerifyForgotPasswordReqBody>,
  res: Response,
  next: NextFunction
) => {
  return res.json({
    message: USERS_MESSAGES.VERIFY_FORGOT_PASSWORD_SUCCESS
  })
}

export const resetPasswordController = async () => {
  return
}

export const getMeController = async () => {
  // đươc thôi được mà
}

export const getProfileController = async (
  req: Request<ParamsDictionary, any, GetProfileReqParams>,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.params
  const user = await usersService.getProfile(username)

  return res.json({
    message: USERS_MESSAGES.GET_PROFILE_SUCCESS,
    result: user
  })
}

export const updateMeController = async () => {
  return
}

export const followController = async () => {
  return
}

export const unfollowController = async () => {
  return
}

export const changePasswordController = async () => {
  return
}
