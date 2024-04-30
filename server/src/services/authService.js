
import { handleComparePassword } from '~/utils/handlePassword'
import { AuthModel } from '../models/authModel'
import { createToken } from '~/middlewares/auth'
const login = async (data) => {
  const user = await AuthModel.getUserByUsername(data.username)
  if (!user) {
    throw new Error('User not found')
  }
  const isMatch = await handleComparePassword(data.password, user.password)
  if (isMatch) {
    const token = createToken(data.username)
    const update = await AuthModel.updateToken(data.username, token)
    if (!update) {
      throw new Error('Error updating token')
    }
    delete user.password
    return user
  }
  else {
    throw new Error('Password is incorrect')
  }
}
export const AuthService = {
  login
}