// // file sẽ khai báo các thành phần của dự án sẽ được import vào đây
// type HandleFullName = () => Promise<string> // là một hàm return về một Promise<string>

// interface IUser {
//   name: string
//   age: number
// }

// const fullName = 'Le Hoang Trong' // Bth thì thằng ts-node nó sẽ tự hiểu và tự gán type cho chúng ta luôn
// // return về một Promise<string>
// const handleName: HandleFullName = () => Promise.resolve(fullName)
// console.log(fullName)

// // Thay vì phải gọi callback function rồi chạy hàm `console.log` thì chúng ta sẽ chạy hàm `console.log` luôn
// // handleName().then(console.log) // Đây là mẹo viết code rút gọn, hàm console.log
// handleName().then((res) => console.log(res))

// // Thằng node-ts nó là trình biên dịch ts, ngoài việc biên dịch thì nó còn có thể kiểm tra dữ liệu nữa
// // Thêm thằng `transPileOnly` sẽ chỉ biên dịch thôi chứ không check kiểu dữ liệu
// const renderUser = (user: IUser) => {
//   console.log(user)
// }

// const user = { name: 'John', age: 20 }

// // @ts-check
// renderUser(user as IUser) // có thể bypass kiểu dữ liệu qua như thế này

// Viết những thứ trong server vào trong đây
// import express from 'express'
// import userRouter from './user.routes'
// // import { sum } from '~/utils'

// interface User {
//   name: string
//   age: number
// }

// const router = express.Router()
// const app = express()
// const port = 3000

// app.use('/user', userRouter)

// // app.get('/', (req, res) => {
// //   const data: any = { a: 1, b: 2 }
// //   const value = sum(data)
// //   res.send(`Hello world ${value}`)
// // })

// app.listen(port, () => {
//   console.log(`Example app listening on ${port}`)
// })

// import { Router } from 'express'
// const userRouter = Router()

// // Trong đây sẽ khai báo các routes khác nhau của một app// Thằng nào đi qua cái Router này đều chạy cái function này
// // Khi mà sử dụng middleware thì chúng ta phải sử dụng cái next() để cho phép nó tới thằng tiếp theo sau cái middleware, nếu nó chạy đến đây mà chúng ta không có next() thì req nó sẽ dừng và nó không có chạy tiếp
// // Đây được gọi là middleware hay là handler cũng được trong đó có thể chứa nhiều cái handler
// userRouter.use((req, res, next) => {
//   // console.log('Hello Express js', Date.now())
//   next() // Khi mà có next() rồi thì những đoạn code bên dưới vẫn chạy nhưng mà những đoạn ở dưới vô nghĩa mà thôi, nên là chỗ này nó sẽ trả về lỗi là không thể set `headers` khi đã gửi về cho client
//   res.status(400).send('Not allowed') // lưu ý khi mà response thì đoạn code phía vẫn chạy nhưng mà nó sẽ không trả về kết quả cho client mà thôi
//   console.log('Hello world')
// })

// // Để đi qua fucntion này thì bắt buộc là nó phải chạy cái function phía trên
// userRouter.get('/tweets', (req, res) => {
//   res.json({
//     data: [
//       {
//         id: 1,
//         text: 'Hello tweet'
//       }
//     ]
//   })
// })

// userRouter.get('/about', (req, res) => {
//   res.send('About birds')
// })
// // Thằng nào đi qua cái Router này đều chạy cái function này
// // Khi mà sử dụng middleware thì chúng ta phải sử dụng cái next() để cho phép nó tới thằng tiếp theo sau cái middleware, nếu nó chạy đến đây mà chúng ta không có next() thì req nó sẽ dừng và nó không có chạy tiếp
// // Đây được gọi là middleware hay là handler cũng được trong đó có thể chứa nhiều cái handler
// userRouter.use((req, res, next) => {
//   // console.log('Hello Express js', Date.now())
//   next() // Khi mà có next() rồi thì những đoạn code bên dưới vẫn chạy nhưng mà những đoạn ở dưới vô nghĩa mà thôi, nên là chỗ này nó sẽ trả về lỗi là không thể set `headers` khi đã gửi về cho client
//   res.status(400).send('Not allowed') // lưu ý khi mà response thì đoạn code phía vẫn chạy nhưng mà nó sẽ không trả về kết quả cho client mà thôi
//   console.log('Hello world')
// })

// // Để đi qua fucntion này thì bắt buộc là nó phải chạy cái function phía trên
// userRouter.get('/tweets', (req, res) => {
//   res.json({
//     data: [
//       {
//         id: 1,
//         text: 'Hello tweet'
//       }
//     ]
//   })
// })

// userRouter.get('/about', (req, res) => {
//   res.send('About birds')
// })

// export default userRouter
