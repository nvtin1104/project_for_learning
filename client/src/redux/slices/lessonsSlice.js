import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import LessonsService from '../../services/lessons.service';
async function handleRequest(request, arg, thunkAPI) {
  try {
    const response = await request(arg);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
}
export const handleGetAllActiveLessons = createAsyncThunk(
  'lessons/getAllActiveLessons',
  ({ page, limit, topicId }, thunkAPI) => handleRequest(LessonsService.getAllActiveLessons, { page, limit, topicId }, thunkAPI)
);
export const handleGetLessonsById = createAsyncThunk(
  'search/lessonsById',
  ({ id }, thunkAPI) => handleRequest(LessonsService.getLessonById, id, thunkAPI)
);
export const resetState = createAction('lessons/resetState');

export const resetStatus = createAction('lessons/resetStatus');
const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
    lesson: null
  },
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
      .addCase(handleGetAllActiveLessons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleGetAllActiveLessons.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(handleGetAllActiveLessons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      }).addCase(handleGetLessonsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleGetLessonsById.fulfilled, (state, action) => {
        state.status = 'success';
        state.lesson = action.payload;
      })
      .addCase(handleGetLessonsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default lessonsSlice.reducer;
