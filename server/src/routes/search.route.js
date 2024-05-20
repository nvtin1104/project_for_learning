import express from 'express'
import { SearchController } from '~/controllers/searchController'
import { verifyAdmin, verifyToken } from '~/middlewares/auth'
const Router = express.Router()
Router.post('/lessons', SearchController.handleSearchLessons)
export const APISearch = Router