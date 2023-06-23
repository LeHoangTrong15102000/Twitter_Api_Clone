import express from 'express'
import { body, validationResult, ValidationChain } from 'express-validator'
import { RunnableValidationChains } from 'express-validator/src/middlewares/schema'
import HTTP_STATUS from '~/constants/httpStatus'
import { EntityError, ErrorWithStatus } from '~/models/Errors'
// can be reused by many routes

// sequential processing, stops running validations chain if the previous one fails.
export const validate = (validation: RunnableValidationChains<ValidationChain>) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await validation.run(req) // truyền req vào cho nó thực hiện validate
    const errors = validationResult(req)
    // Nếu không có lỗi thì cho next()
    if (errors.isEmpty()) {
      return next()
    }

    const errorsObject = errors.mapped() // object lớn chứa các object[key] bên trong
    const entityError = new EntityError({ errors: {} })
    // Chạy vòng lặp for-in để phân lỗi ra
    for (const key in errorsObject) {
      const { msg } = errorsObject[key] // lấy ra msg: string trước

      // Trả về lỗi không phải là lỗi do validate, nếu qua được if thì nó là 422
      // Nếu không phải là 422 sẽ trả về object lỗi trong đó message có type là string
      if (msg instanceof ErrorWithStatus && msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY) {
        // errorsObject[key] = errorsObject[key].msg
        return next(msg) // khi mà lỗi ko phải 422 thì return trực tiếp ko cần nhảy xuống thằng bên dưới
      }
      entityError.errors[key] = errorsObject[key]
    }

    // res.status(400).json({ errors: errors.mapped() })
    // Sau khi entityError đã lấy được msg lỗi rồi thì next() cho chạy ra defaultErrorHandler xử lý lỗi tập trung
    next(entityError)
  }
}
