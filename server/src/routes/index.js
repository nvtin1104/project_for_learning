import { StatusCodes } from 'http-status-codes'
import { APIUsers } from './users.route'
import { APIAuth } from './auth.route'
import { APILessons } from './lessons.route'
import { APIHistoryStudy } from './historyStudy.route'
import { APITopic } from './topic.route'
import { APISearch } from './search.route'
const Router = require('express').Router()
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
Router.use('/history-study', APIHistoryStudy)
Router.use('/topic', APITopic)
Router.use('/search', APISearch)
export const APIs = Router