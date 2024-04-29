const { GET_DB } = require('~/config/mongodb')

const getUserByUsername = async (username) => {
  try {
    const db = await GET_DB()
    const user = await db.collection('users').findOne({ username })
    return user
  } catch (error) {
    throw new Error(error)
  }
}
export const AuthModel = {
    getUserByUsername
}