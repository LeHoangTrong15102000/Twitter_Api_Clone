import express, { Request, Response, NextFunction } from 'express'
import usersRouter from './routes/users.routes'
import cors from 'cors'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { config } from 'dotenv'
import { initFolder } from './utils/file'
import mediasRouter from './routes/medias.routes'
import staticRouter from './routes/static.routes'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import tweetsRouter from './routes/tweets.routes'
import likesRouter from './routes/likes.routes'
import bookmarksRouter from './routes/bookmarks.routes'
import searchRouter from './routes/search.routes'

config()
// Kết nối với database của mongodb
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
})
const app = express()
app.use(cors()) // setup vậy thì mỗi đường dẫn browser đều có thể truy cập được vào cái api này
// Còn nếu chỉ muốn 1 đường dẫn browser của cty truy cập vào được thì set options cho nó
/**
 * ví dụ như sau:
 * const corOptions = {
 *  origin: 'url...',
 *  credentials: true,
 *  optionSuccessStatus: 200
 * }
 */
const port = process.env.PORT || 4000

// Tạo folder upload
initFolder()
app.use(express.json()) // Nó sẽ biến JSON thành một cái object cho chúng ta
// app.use(express.urlencoded({ extended: false })) // Dùng để mã hóa các đường dẫn
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/likes', likesRouter)
app.use('/search', searchRouter)
app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))

// Middleware xử lý lỗi tập trung ( default Error handler), khi mà các route ở trên xử lý lỗi thì nó sẽ chạy xuống defaultErrorHandler này
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// cũng được đó mà thôi không quan tâm cho lắm
// Cũng kha khá đó biết vậy là ổn rồi được gì đâu mà chúng ta phải cố gắng làm gì cho nó mắc
// Cũng ổn thôi khi mà chúng ta đặt ra mục tiêu là gì
