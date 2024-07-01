import express from 'express'
import { verifyToken } from '~/middlewares/auth'
import { DashboardController } from '~/controllers/dashboardController';


const Router = express.Router()
Router.get('/user',verifyToken, DashboardController.handleDashboardUser)
export const APIDashboard = Router