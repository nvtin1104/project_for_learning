import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import LessonsService from '../../services/lessons.service';
async function handleRequest(request, arg, thunkAPI) {
  try {
    return await request(arg);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
}
export const handleGetAllActiveLessons = createAsyncThunk('lessons/getAllActiveLessons', ({ page, limit, topicId }, thunkAPI) =>
  handleRequest(LessonsService.getAllActiveLessons, { page, limit, topicId }, thunkAPI)
);
export const handleGetLessonsByUserId = createAsyncThunk('lessons/getByUserId', (_, thunkAPI) =>
  handleRequest(LessonsService.getLessonsByUserId, {}, thunkAPI)
);
export const handleGetLessonsById = createAsyncThunk('search/lessonsById', ({ id }, thunkAPI) =>
  handleRequest(LessonsService.getLessonById, id, thunkAPI)
);
export const handleDeleteLessonById = createAsyncThunk('lessons/deleteLessonById', ({ id }, thunkAPI) =>
  handleRequest(LessonsService.getLessonById, id, thunkAPI)
);
export const handleGetAllTopics = createAsyncThunk('lessons/getAllTopics', (_, thunkAPI) =>
  handleRequest(LessonsService.getAllTopic, {}, thunkAPI)
);
export const handleCreateLesson = createAsyncThunk('lessons/createLesson', ({ data }, thunkAPI) =>
  handleRequest(LessonsService.create, data, thunkAPI)
);
const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    data: null,
    status: 'idle',
    statusGetByUserId: 'idle',
    statusTopics: 'idle',
    error: null,
    lesson: null,
    dataOfUser: null,
    topics: null,
    statusCreate: 'idle',
    dataCreate: null
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
    resetCreateLesson: (state) => {
      state.statusCreate = 'idle';
      state.dataCreate = null;
      state.error = null;
    }
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
      })
      .addCase(handleCreateLesson.pending, (state) => {
        state.statusCreate = 'loading';
      })
      .addCase(handleCreateLesson.fulfilled, (state, action) => {
        state.statusCreate = 'success';
        state.dataCreate = action.payload;
      })
      .addCase(handleCreateLesson.rejected, (state, action) => {
        state.statusCreate = 'failed';
        state.error = action.payload;
      })
      .addCase(handleGetAllTopics.pending, (state) => {
        state.statusTopics = 'loading';
      })
      .addCase(handleGetAllTopics.fulfilled, (state, action) => {
        state.statusTopics = 'success';
        state.topics = action.payload;
      })
      .addCase(handleGetAllTopics.rejected, (state, action) => {
        state.statusTopics = 'failed';
        state.error = action.payload;
      })
      .addCase(handleGetLessonsByUserId.pending, (state) => {
        state.statusGetByUserId = 'loading';
      })
      .addCase(handleGetLessonsByUserId.fulfilled, (state, action) => {
        state.statusGetByUserId = 'success';
        state.dataOfUser = action.payload;
      })
      .addCase(handleGetLessonsByUserId.rejected, (state, action) => {
        state.statusGetByUserId = 'failed';
        state.error = action.payload;
      })
      .addCase(handleGetLessonsById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleGetLessonsById.fulfilled, (state, action) => {
        state.status = 'success';
        state.lesson = action.payload;
      })
      .addCase(handleGetLessonsById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(handleDeleteLessonById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleDeleteLessonById.fulfilled, (state, action) => {
        state.status = 'success';
        state.lesson = action.payload;
      })
      .addCase(handleDeleteLessonById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});
export const { resetState, resetStatus, resetCreateLesson } = lessonsSlice.actions;
export default lessonsSlice.reducer;
