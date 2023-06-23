import express, { Request, Response, NextFunction } from 'express'
import usersRouter from './routes/users.routes'
import cors from 'cors'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'

const app = express()
const port = 3000

databaseService.connect()

app.use(cors())
app.use(express.json()) // Nó sẽ biến JSON thành một cái object cho chúng ta
// app.use(express.urlencoded({ extended: false }))s
app.use('/users', usersRouter)

// Middleware xử lý lỗi tập trung ( default Error handler), khi mà các route ở trên xử lý lỗi thì nó sẽ chạy xuống defaultErrorHandler này
app.use(defaultErrorHandler)

// Kết nối với database của mongodb

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// Cũng được thôi
