import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
import lessonsReducer from './slices/lessonsSlice';
const store = configureStore({
  reducer: {
    lessons: lessonsReducer,
  },
});
export default store;
