import express from 'express'
import { AuthController } from '~/controllers/authController'
const Router = express.Router()
Router.post('/login', AuthController.handleLogin)
export const APIAuth = Router