import express from 'express'
import { verifyToken } from '~/middlewares/auth'
import { HistoryTestController } from '~/controllers/historyTestController';

const Router = express.Router()
Router.post('/', HistoryTestController.handleCreateHistoryTest)
Router.get('/:id', verifyToken, HistoryTestController.handleGetHistory)
export const APIHistoryTest = Router