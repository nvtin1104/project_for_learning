import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import SearchService from '../../services/search.service';
async function handleRequest(request, arg, thunkAPI) {
  try {
    const response = await request(arg);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
}
export const handleSearchLessons = createAsyncThunk(
    'search/lessons',
    ({search}, thunkAPI) => handleRequest(SearchService.searchLessons, {search}, thunkAPI)
    );

export const resetState = createAction('search/resetState');

export const resetStatus = createAction('search/resetStatus');
const searchSlice = createSlice({
  name: 'search',
  initialState: { data: null, status: 'idle', error: null },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.status = 'idle';
      state.data = null;
    },
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleSearchLessons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleSearchLessons.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(handleSearchLessons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default searchSlice.reducer;
