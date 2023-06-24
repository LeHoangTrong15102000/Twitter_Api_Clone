import HTTP_STATUS from '~/constants/httpStatus'
import { USERS_MESSAGES } from '~/constants/messages'
// Trong đây sẽ chứa bộ chuẩn hóa error trả về cho người dùng
type ErrorsType = Record<
  string,
  // {
  //   msg: string
  //   location: string
  //   value: any
  //   path: string
  //   [key: string]: any
  // }
  {
    msg: string
    [key: string]: any
  }
>
// Khi khai báo như này thì errors có kiểu là ErrorsType và sẽ được hình dung như sau errors: { [key: string], { msg: string , [key: string]: any} }

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

// Vì chúng ta đã có khuôn mẫu cho nó, ngoài message thì chúng ta muốn thêm `errorObject` nữa
// errors sẽ nhận từ bên ngoài truyền vào
export class EntityError extends ErrorWithStatus {
  errors: ErrorsType
  // status ko cần truyền vào constructor vì chúng ta sẽ để mặc định nó là 422
  // Mặc định khi bị lỗi chung thì sẽ trả về lỗi là `Validation Error`
  constructor({ message = USERS_MESSAGES.VALIDATION_ERROR, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY }) // kế thừa nó từ thằng ErrorWStatus
    this.errors = errors
  }
}
