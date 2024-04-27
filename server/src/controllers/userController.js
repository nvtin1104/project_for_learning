import { UsersService } from '~/services/usersService'

const { StatusCodes } = require('http-status-codes')


const handleCreateUser = async (req, res) => {
  try {
    const user = req.body
    if (!user.name) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: 'Name is required' })
      return
    }
    if (!user.username) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: 'Username is required' })
      return
    }
    if (!user.password) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: 'Password is required' })
      return
    }
    const newUser = await UsersService.createUser(user)
    res.status(StatusCodes.CREATED).json(newUser)
  }
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleGetAllUsers = async (req, res) => {
  try {
    const users = await UsersService.getAll()
    res.status(StatusCodes.OK).json(users)
  }
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleDeleteUserById = async (req, res) => {
  try {
    const id = req.params.id
    const result = await UsersService.deleteUserById(id)
    res.status(StatusCodes.OK).json({
      message: 'Deleted successfully',
      result
    })
  }
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleGetUserById = async (req, res) => {
  try {
    const id = req.params.id
    const user = await UsersService.getUserById(id)
    res.status(StatusCodes.OK).json(user)
  }
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
const handleUpdateUserById = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body
    const updatedUser = await UsersService.updateUserById(id, data)
    res.status(StatusCodes.OK).json(updatedUser)
  }
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message })
  }
}
export const UsersController = {
  handleCreateUser,
  handleGetAllUsers,
  handleDeleteUserById,
  handleGetUserById,
  handleUpdateUserById
}
