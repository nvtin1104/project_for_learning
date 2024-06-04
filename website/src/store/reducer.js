import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import lessonsReducer from './slices/lessonsSlice';
import searchReducer from './slices/searchSlice';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  lessons: lessonsReducer,
  search: searchReducer
});

export default reducer;
