
import { AuthModel } from '../models/authModel';
const login = async (data) => {
  const user = await AuthModel.getUserByUsername(data.username)
  if (!user) {
    throw new Error('User not found')
  }
  return user
}
export const AuthService = {
    login
}