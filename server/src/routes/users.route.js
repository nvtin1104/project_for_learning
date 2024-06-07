import express from 'express';
import { UsersController } from '~/controllers/userController';
import { verifyToken, verifyAdmin } from '~/middlewares/auth';

const Router = express.Router();

Router.post('/', UsersController.handleCreateUser);
Router.get('/', verifyToken, UsersController.handleGetAllUsers);
Router.get('/current', verifyToken, UsersController.handleGetCurrentUser);
Router.delete('/:id', [verifyToken, verifyAdmin], UsersController.handleDeleteUserById);
Router.get('/:id', verifyToken, UsersController.handleGetUserById);
Router.patch('/current', verifyToken, UsersController.handleUpdateCurrentUser);
Router.patch('/change-password', verifyToken, UsersController.handleChangePassword);
Router.post('/reset-password', UsersController.handleResetPassword);

Router.patch('/:id', [verifyToken, verifyAdmin], UsersController.handleUpdateUserById);

export const APIUsers = Router;


