// Viết vào những cái middlewares chúng của cả dự án vào đây
import { Request, Response, NextFunction } from 'express'
import pick from 'lodash/pick'

type FilterKeys<T> = Array<keyof T> // là một array với các `key là key của T`

export const filterMiddleware =
  <T>(filterKeys: FilterKeys<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body = pick(req.body, filterKeys)
    next()
  }
