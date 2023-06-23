import { Request, Response, NextFunction, RequestHandler } from 'express'

// type Func = (req: Request, reS: Response, next: NextFunction) => Promise<void>

// Nhận vào async function hoặc là một function bình thường và trả về cho chúng ta một Request Handler
export const wrapRequestHandler = <P>(func: RequestHandler<P>) => {
  // Trong dây return về một Request Handler, trong reqHandler sẽ gọi đến func được truyền vào
  return async (req: Request<P>, res: Response, next: NextFunction) => {
    // Promise.resolve(func(req, res, next)).catch(next) -> Chỉ dùng cho mỗi async function
    try {
      // Và cái hàm trong controller nó nhận vào 3 tham số req, res, next
      await func(req, res, next) // đợi func này xử lý nếu có lỗi thì nhảy xuống catch()
    } catch (error) {
      // Trong controller nếu có lỗi gì xảy ra thì nó sẽ nhảy xuống thằng next()
      next(error)
    }
  }
}
