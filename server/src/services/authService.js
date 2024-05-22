import { handleComparePassword } from '~/utils/handlePassword'
import { AuthModel } from '../models/authModel'
import { createResfeshToken, createToken } from '~/middlewares/auth'

const loginUser = async (data, role) => {
  const user = await AuthModel.getUserByUsername(data.username)
  if (!user) {
    throw new Error('User not found')
  }
  const isMatch = await handleComparePassword(data.password, user.password)
  if (!isMatch) {
    throw new Error('Password is incorrect')
  }
  if (user.role !== role) {
    throw new Error(`User is not ${role}`)
  }
  const resfeshToken = createResfeshToken({ username: user.username, role: user.role })
  const accssesToken = createToken({ username: user.username, role: user.role, userId: user._id})
  const update = await AuthModel.updateToken(data.username, resfeshToken)
  if (!update) {
    throw new Error('Error updating token')
  }
  delete user.password
  user.accssesToken = accssesToken
  return user
}

const login = async (data) => {
  return loginUser(data, 'user')
}

const loginAdmin = async (data) => {
  return loginUser(data, 'admin')
}

export const AuthService = {
  login,
  loginAdmin
}