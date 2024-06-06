import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import lessonsReducer from './slices/lessonsSlice';
import searchReducer from './slices/searchSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/usersSlice';
// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  lessons: lessonsReducer,
  search: searchReducer,
  auth: authReducer,
  user: userReducer
});

export default reducer;
