// Tạo access_token và refresh_tokenn
import { config } from 'dotenv'
import jwt, { SignOptions } from 'jsonwebtoken'
import { TokenPayload } from '~/models/requests/User.requests'

config()
// Mình muốn cái function này là một Promise func
export const signToken = ({
  payload,
  privateKey = process.env.JWT_SECRET as string,
  // Mặc định sẽ dùng thuật toán HS256
  options = {
    algorithm: 'HS256' // HMAC
  }
}: {
  payload: string | Buffer | object
  privateKey?: string // sử dụng dấu chấm hỏi nhưng nó vẫn đảm bảo, mặc định chúng ta đã khai báo ở trên
  options?: SignOptions
}) => {
  // Promise này trả về giá trị là string
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (error, token) => {
      if (error) {
        throw reject(error)
      }
      resolve(token as string)
    })
  })
}

// VerifyToken
export const verifyToken = ({ token, secretOrPublicKey }: { token: string; secretOrPublicKey: string }) => {
  // Trả về một promise có type là TokenType
  return new Promise<TokenPayload>((resolve, reject) => {
    jwt.verify(token, secretOrPublicKey, (error, decode) => {
      if (error) {
        throw reject(error)
      }

      resolve(decode as TokenPayload)
    })
  })
}
