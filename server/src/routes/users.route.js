import express from 'express'
import { UsersController } from '~/controllers/userController'
const Router = express.Router()

Router.post('/', UsersController.handleCreateUser)
Router.get('/', UsersController.handleGetAllUsers)

export const APIUsers = Router


