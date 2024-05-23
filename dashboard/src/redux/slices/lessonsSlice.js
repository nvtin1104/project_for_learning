/* eslint-disable import/no-unresolved */
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import LessonsService from '../../services/lessons.service';

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    return await asyncFunction(...args);
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

export const fetchAllLessons = createAsyncThunk('lessons/getAll', ({ page, limit }, thunkAPI) =>
  handleAsyncThunk(LessonsService.getAll, [{ page, limit }], thunkAPI)
);
export const createLesson = createAsyncThunk('lessons/create', (data, thunkAPI) =>
  handleAsyncThunk(LessonsService.create, [data], thunkAPI)
);
export const deleteLesson = createAsyncThunk('lessons/delete', ({ id }, thunkAPI) =>
  handleAsyncThunk(LessonsService.delete, [id], thunkAPI)
);
export const getLesson = createAsyncThunk('lessons/get', (id, thunkAPI) =>
  handleAsyncThunk(LessonsService.get, [id], thunkAPI)
);
export const updateProduct = createAsyncThunk('lessons/update', ({ id, data }, thunkAPI) =>
  handleAsyncThunk(LessonsService.update, [id, data], thunkAPI)
);
export const resetProducts = createAction('lessons/reset');
const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    statusCreate: 'idle',
    statusDel: 'idle',
    lessons: null,
  },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.status = 'idle';
      state.lessons = {};
    },
    resetCreate: (state) => {
      state.error = null;
      state.statusCreate = 'idle';
      state.create = {};
    },
    resetDelete: (state) => {
      state.error = null;
      state.statusDel = 'idle';
      state.delete = {};
    },
    resetUpdate: (state) => {
      state.lessons = null;
      state.statusGetOne = 'idle';
      state.error = null;
      state.statusUpdate = 'idle';
      state.update = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllLessons.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.lessons = payload;
      })
      .addCase(fetchAllLessons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllLessons.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(createLesson.fulfilled, (state, { payload }) => {
        state.statusCreate = 'success';
        state.create = payload;
      })
      .addCase(createLesson.pending, (state) => {
        state.statusCreate = 'loading';
      })
      .addCase(createLesson.rejected, (state, { payload }) => {
        state.statusCreate = 'failed';
        state.error = payload;
      })
      .addCase(deleteLesson.fulfilled, (state, { payload }) => {
        state.statusDel = 'success';
        state.delete = payload;
      })
      .addCase(deleteLesson.pending, (state) => {
        state.statusDel = 'loading';
      })
      .addCase(deleteLesson.rejected, (state, { payload }) => {
        state.statusDel = 'failed';
        state.error = payload;
      })
      .addCase(getLesson.fulfilled, (state, { payload }) => {
        state.statusGetOne = 'success';
        state.product = payload;
      })
      .addCase(getLesson.pending, (state) => {
        state.statusGetOne = 'loading';
      })
      .addCase(getLesson.rejected, (state, { payload }) => {
        state.statusGetOne = 'failed';
        state.error = payload;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.statusUpdate = 'success';
        state.update = payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.statusUpdate = 'loading';
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.statusUpdate = 'failed';
        state.error = payload;
      });
  },
});
export const { resetUpdate } = lessonsSlice.actions;
export const { resetState: resetProductsAction } = lessonsSlice.actions;
export const { resetCreate: resetCreateProduct } = lessonsSlice.actions;
export const { resetDelete: resetDeleteProduct } = lessonsSlice.actions;
export default lessonsSlice.reducer;
