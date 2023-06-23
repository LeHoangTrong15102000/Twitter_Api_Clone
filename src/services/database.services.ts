// Chứa kết nối đến với database của mongodb

import { MongoClient, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'

config() // lấy thằng config() để có thể sử dụng được thằng env
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.jzb6290.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(process.env.DB_NAME)
  }

  // func connect database
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 }) // Khi mà đoạn mã này nó bị lỗi thì cái func chúng ta nó sẽ reject khi mà nó reject thì nó sẽ nhảy vào catch
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('Error connect database', error)
      throw error // khi có lỗi thì quăng cái lỗi ra
    }
  }

  // thêm type cho users
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
}

// tạo object từ class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
