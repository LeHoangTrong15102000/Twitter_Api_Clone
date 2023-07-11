// Chứa kết nối đến với database của mongodb

import { MongoClient, Db, Collection } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follower.schema'
import Tweet from '~/models/schemas/Tweet.schema'
import VideoStatus from '~/models/schemas/VideoStatus.schema'
import Bookmark from '~/models/schemas/Bookmark.schema'
import Like from '~/models/schemas/Like.schema'
import Hashtag from '~/models/schemas/Hashtag.schema'

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

  async indexUsers() {
    const exists = await this.users.indexExists(['email_1_password_1', 'email_1', 'username_1'])

    if (!exists) {
      this.users.createIndex({ email: 1, password: 1 })
      this.users.createIndex({ email: 1 }, { unique: true })
      this.users.createIndex({ username: 1 }, { unique: true })
    }
  }

  async indexRefreshTokens() {
    const exists = await this.refreshTokens.indexExists(['exp_1', 'token_1'])

    if (!exists) {
      this.refreshTokens.createIndex({ token: 1 })
      this.refreshTokens.createIndex(
        { exp: 1 },
        {
          expireAfterSeconds: 0
        }
      )
    }
  }

  async indexVideoStatus() {
    const exists = await this.videoStatus.indexExists(['name_1'])

    if (!exists) {
      this.videoStatus.createIndex({ name: 1 })
    }
  }

  async indexFollowers() {
    const exists = await this.followers.indexExists(['user_id_1_followed_user_id_1'])

    if (!exists) {
      this.followers.createIndex({ user_id: 1, followed_user_id: 1 })
    }
  }

  // geter dùng để lấy giá trị gì đó từ class
  // thêm type cho users, result trả về sẽ là một collection có genericType là `User`
  // Muốn lấy ra những giá trị từ database(cụ thể là collection)

  get tweets(): Collection<Tweet> {
    return this.db.collection(process.env.DB_TWEETS_COLLECTION as string)
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }

  // Đây sẽ là những Collection của database
  get refreshTokens(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESHTOKEN_COLLECTION as string)
  }

  get followers(): Collection<Follower> {
    return this.db.collection(process.env.DB_FOLLOWERS_COLLECTION as string)
  }

  get videoStatus(): Collection<VideoStatus> {
    return this.db.collection(process.env.DB_VIDEO_STATUS_COLLECTION as string)
  }

  get hashtags(): Collection<Hashtag> {
    return this.db.collection(process.env.DB_HASHTAG_TWEET_COLLECTION as string)
  }

  get bookmarks(): Collection<Bookmark> {
    return this.db.collection(process.env.DB_BOOKMARK_TWEET_COLLECTION as string)
  }

  get likes(): Collection<Like> {
    return this.db.collection(process.env.DB_LIKE_TWEET_COLLECTION as string)
  }
}

// tạo object từ class DatabaseService
const databaseService = new DatabaseService()
export default databaseService
