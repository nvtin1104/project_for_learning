import express from 'express'
import { UsersController } from '~/controllers/userController'
import { verifyToken } from '~/middlewares/auth'
const Router = express.Router()

Router.post('/', UsersController.handleCreateUser)
Router.get('/', verifyToken, UsersController.handleGetAllUsers)
Router.delete('/:id', verifyToken, UsersController.handleDeleteUserById)
Router.get('/:id', verifyToken, UsersController.handleGetUserById)
Router.patch('/:id', verifyToken, UsersController.handleUpdateUserById)


export const APIUsers = Router


