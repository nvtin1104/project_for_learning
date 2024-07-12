import { StatusCodes } from 'http-status-codes'
import { DashboardModel } from '~/models/dashboardModel'
const handleDashboardUser = async (req, res) => {
  try {
    const userId = req.user.userId
    if (!userId) {
      throw new Error('userId is required')
    }
    const history = await DashboardModel.handleGetUserDashboard({ userId })
    res.status(StatusCodes.OK).json(history)
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message.replace('Error: ', '') })
  }
}
export  const DashboardController = {
  handleDashboardUser
}