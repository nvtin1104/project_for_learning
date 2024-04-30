import { StatusCodes } from 'http-status-codes'
import { APIUsers } from './users.route';
import { APIAuth } from './auth.route';
import { APILessons } from './lessons.route';
const Router = require('express').Router();
Router.get('/status', async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'APIs are ready to use.'
  })
})
Router.route('/test').get((req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Get all' })
})
Router.use('/users', APIUsers)
Router.use('/auth', APIAuth)
Router.use('/lessons', APILessons)
export const APIs = Router