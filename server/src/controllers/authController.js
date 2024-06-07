import { StatusCodes } from 'http-status-codes'
import { AuthService } from '../services/authService'
import { UsersService } from '~/services/usersService';
const handleLogin = async (req, res) => {
  try {
    const user = await AuthService.login(req.body)
    res.status(StatusCodes.CREATED).json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const handleLoginAdmin = async (req, res) => {
  try {
    const user = await AuthService.loginAdmin(req.body)
    res.status(StatusCodes.CREATED).json({ user })
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message })
  }
}
const handleLoginGG = async (req, res) => {
  try {
    const data = req.body
    const result = await AuthService.loginGG(data)
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message})
  }
}
export const AuthController = {
  handleLogin,
  handleLoginAdmin,
  handleLoginGG
}