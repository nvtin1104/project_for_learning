
import { handleCreatePassword } from '~/utils/handlePassword'
import { UserModel } from '../models/usersModel'
const createUser = async (user) => {
  try {
    const existedUser = await UserModel.getUserBy(user.username, 'username')
    if (existedUser) {
      throw 'Username is already taken'
    }
    const password = await handleCreatePassword(user.password)
    user.password = password
    const newUser = await UserModel.create(user)
    return newUser
  } catch (error) {
    throw new Error(error)
  }
}
const getAll = async () => await UserModel.getAll()
export const UsersService = {
  createUser,
  getAll
}
