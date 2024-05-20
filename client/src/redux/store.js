import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
import lessonsReducer from './slices/lessonsSlice';
import searchReducer from './slices/searchSlice';
const store = configureStore({
  reducer: {
    lessons: lessonsReducer,
    search: searchReducer,
  },
});
export default store;
