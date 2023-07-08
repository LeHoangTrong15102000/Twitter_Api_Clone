// Thực hiện error chung cho toàn bộ app của chúng ta

import { NextFunction, Response, Request } from 'express'
import omit from 'lodash/omit'
import HTTP_STATUS from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'

// Middleware này sẽ xử lý lỗi tập trung tại đây
// instanceof: trường hợp, khẩn cầu, lời yêu cầu
export const defaultErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // res.status(err.status || HTTP_STATUS.INTERNAL_SERVER_ERROR).json(omit(err, ['status'])) // trả về errObject
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ['status']))
  }
  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true })
  })

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    errorInfo: omit(err, ['stack'])
  })
}
