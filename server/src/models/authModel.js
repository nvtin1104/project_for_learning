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
const updateToken = async (username, token) => {
  try {
    const db = await GET_DB()
    const update = await db.collection('users').updateOne({ username }, { $set: { token } })
    return update
  } catch (error) {
    throw new Error(error)
  }
}
export const AuthModel = {
  getUserByUsername,
  updateToken
}