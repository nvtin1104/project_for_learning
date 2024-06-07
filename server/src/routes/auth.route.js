import express from 'express'
import { AuthController } from '~/controllers/authController'
const Router = express.Router()
Router.post('/login', AuthController.handleLogin)
Router.post('/login/admin', AuthController.handleLoginAdmin)
Router.post('/login/gg', AuthController.handleLoginGG)
export const APIAuth = Router