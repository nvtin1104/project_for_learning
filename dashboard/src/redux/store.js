import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import usersReducer from './slices/usersSlice';
import ordersReducer from './slices/ordersSlice';
import productsReducer from './slices/productsSlice';
import lessonsReducer from './slices/lessonsSlice';
import topicsReducer from './slices/topicsSlice';
const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    lessons: lessonsReducer,
    topics: topicsReducer,
  },
});
export default store;
