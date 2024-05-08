
import { handleCreatePassword } from '~/utils/handlePassword'
import { UserModel } from '../models/usersModel'
import { ObjectId } from 'mongodb'
import { createResfeshToken } from '~/middlewares/auth'
const createUser = async (data) => {
  try {
    const existedUser = await UserModel.getUserBy(data.username, 'username')
    if (existedUser) {
      throw 'Username is already taken'
    }
    const password = await handleCreatePassword(data.password)
    data.password = password
    data.resfeshToken = createResfeshToken({ username: data.username, role: 'user' })

    const newUser = await UserModel.create(data)
    return newUser
  } catch (error) {
    throw new Error(error)
  }
}
const getAll = async () => await UserModel.getAll()
const deleteUserById = async (id) => {
  try {
    const user = await UserModel.getUserBy(new ObjectId(id), '_id')
    if (!user) {
      throw 'User not found'
    }
    const result = await UserModel.deleteUserById(id)
    return result
  } catch (error) {
    throw new Error(error)
  }
}
const getUserById = async (id) => {
  try {
    const user = await UserModel.getUserBy(new ObjectId(id), '_id')
    if (!user) {
      throw 'User not found'
    }
    return user
  } catch (error) {
    throw new Error(error)
  }
}
const updateUserById = async (id, data) => {
  try {
    const user = await UserModel.getUserBy(new ObjectId(id), '_id')
    if (!user) {
      throw 'User not found'
    }
    if (data.birthday) {
      const date = new Date(data.birthday)
      if (date.toString() === 'Invalid Date') {
        throw 'Invalid date format'
      }
      data.birthday = date.getTime()
    }
    if (data.password) {
      data.password = await handleCreatePassword(data.password)
    }
    const updatedUser = await UserModel.update(id, data)
    return updatedUser
  } catch (error) {
    throw new Error(error)
  }
}
export const UsersService = {
  createUser,
  getAll,
  deleteUserById,
  getUserById,
  updateUserById
}
