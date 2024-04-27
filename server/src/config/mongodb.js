import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let dbInstance = null

// Khởi tạo một đối tượng client để connect tới mongoDB
const client = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})
// Kết nối tới database
export const CONNECT_DB = async () => {
  await client.connect()
  dbInstance = client.db(env.DATABASE_NAME)
}
export const GET_DB = () => {
  if (!dbInstance) throw new Error('Must connect to Database first')
  return dbInstance
}

export const CLOSE_DB = async () => {
  await client.close()
}
