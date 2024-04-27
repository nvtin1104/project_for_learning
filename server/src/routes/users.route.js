import express from 'express'
import { UsersController } from '~/controllers/userController'
const Router = express.Router()

Router.post('/', UsersController.handleCreateUser)
Router.get('/', UsersController.handleGetAllUsers)
Router.delete('/:id', UsersController.handleDeleteUserById)
Router.get('/:id', UsersController.handleGetUserById)
Router.patch('/:id', UsersController.handleUpdateUserById)


export const APIUsers = Router


