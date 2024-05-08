
import { handleComparePassword } from '~/utils/handlePassword'
import { AuthModel } from '../models/authModel'
import { createResfeshToken, createToken } from '~/middlewares/auth'
const login = async (data) => {
  const user = await AuthModel.getUserByUsername(data.username)
  if (!user) {
    throw new Error('User not found')
  }
  const isMatch = await handleComparePassword(data.password, user.password)
  if (isMatch) {
    const resfeshToken = createResfeshToken({ username: user.username, role: user.role })
    const accssesToken = createToken({ username: user.username, role: user.role })
    const update = await AuthModel.updateToken(data.username, resfeshToken)
    if (!update) {
      throw new Error('Error updating token')
    }
    delete user.password
    user.accssesToken = accssesToken
    return user
  }
  else {
    throw new Error('Password is incorrect')
  }
}
export const AuthService = {
  login
}