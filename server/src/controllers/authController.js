import { StatusCodes } from 'http-status-codes'
import { AuthService } from '../services/authService'
const handleLogin = async (req, res) => {
  try {
    const user = await AuthService.login(req.body)
    res.status(StatusCodes.CREATED).json({ user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
export const AuthController = {
  handleLogin
}