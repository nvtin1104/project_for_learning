import { handleComparePassword, handleCreatePassword } from '~/utils/handlePassword';
import {UserModel} from '../models/usersModel'
import {ObjectId} from 'mongodb'
import {createResfeshToken, createToken} from '~/middlewares/auth'

const createUser = async (data) => {
  try {
    const existedUser = await UserModel.getUserBy(data.username, 'username')
    if (existedUser) {
      throw 'Username is already taken'
    }
    data.password =  await handleCreatePassword(data.password)
    data.refreshToken = createResfeshToken({ username: data.username, role: 'user' })

    const newUser = await UserModel.create(data)
    data.accessToken = createToken({ username: data.username, role: 'user', userId: newUser._id})
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
    return await UserModel.deleteUserById(id)
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
const changePassword = async (id, data) => {
  try {
    const user = await UserModel.getUserChangePassword(new ObjectId(id), '_id')
    if (!user) {
      throw 'User not found'
    }
    const checkPassword = await handleComparePassword(data.oldPassword, user.password);
    if (!checkPassword) {
      throw 'Old password is incorrect'
    }
    if (data.newPassword === data.oldPassword){
      throw 'New password must be different from old password'
    }
    const newPassword = await handleCreatePassword(data.newPassword)
    return await UserModel.changePassword(id, newPassword)
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
    return await UserModel.update(id, data)
  } catch (error) {
    throw new Error(error)
  }
}
export const UsersService = {
  createUser,
  getAll,
  deleteUserById,
  getUserById,
  updateUserById,
  changePassword
}
