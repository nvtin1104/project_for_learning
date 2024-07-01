import Joi from 'joi';
import { ObjectId } from 'mongodb';
import { GET_DB } from '~/config/mongodb';

const handleGetUserDashboard = async ({userId}) => {
  try {
    const db = await GET_DB();
    const id = new ObjectId(userId);
  return await  db.collection('historyTest').find({authId: id}).toArray()
  }
  catch (error) {
    throw new Error(error);
  }
}
export const DashboardModel = {
  handleGetUserDashboard
}