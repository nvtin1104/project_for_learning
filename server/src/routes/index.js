import { StatusCodes } from 'http-status-codes'
import { APIUsers } from './users.route';
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
export const APIs = Router