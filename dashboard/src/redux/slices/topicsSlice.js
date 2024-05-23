import TopicsService from 'src/services/topics.service';

import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    console.log(args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};
export const getAllTopics = createAsyncThunk('topics/getAllTopics', (data, thunkAPI) =>
  handleAsyncThunk(TopicsService.getAll, [data], thunkAPI)
);
export const createTag = createAsyncThunk('topics/createTag', (data, thunkAPI) =>
  handleAsyncThunk(TopicsService.create, [data], thunkAPI)
);
export const updateTag = createAsyncThunk('topics/updateTag', (data, thunkAPI) =>
  handleAsyncThunk(TopicsService.update, [data], thunkAPI)
);
export const deleteTopic = createAsyncThunk('topics/deleteTopic', (data, thunkAPI) =>
  handleAsyncThunk(TopicsService.delete, [data], thunkAPI)
);
export const resetTag = createAction('topics/reset');
const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    topics: [],
    status: 'idle',
    error: null,
    statusDel: 'idle',
    errorDel: null,
    dataDel: [],
  },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.status = 'idle';
      state.statusDel = 'idle';
      state.topics = [];
    },
    resetDel: (state) => {
      state.error = null;
      state.statusDel = 'idle';
      state.delete = [];
    },
    resetCreate: (state) => {
      state.error = null;
      state.statusCreate = 'idle';
      state.create = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTopics.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.topics = payload;
      })
      .addCase(getAllTopics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllTopics.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(createTag.fulfilled, (state, { payload }) => {
        state.statusCreate = 'success';
        state.create = payload;
      })
      .addCase(createTag.pending, (state) => {
        state.statusCreate = 'loading';
      })
      .addCase(createTag.rejected, (state, { payload }) => {
        state.statusCreate = 'failed';
        state.error = payload;
      })
      .addCase(updateTag.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.topics = payload;
      })
      .addCase(updateTag.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateTag.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(deleteTopic.fulfilled, (state, { payload }) => {
        state.statusDel = 'success';
        state.dataDel = payload;
      })
      .addCase(deleteTopic.pending, (state) => {
        state.statusDel = 'loading';
      })
      .addCase(deleteTopic.rejected, (state, { payload }) => {
        state.statusDel = 'failed';
        state.errorDel = payload;
      })
      .addCase(resetTag, (state) => {
        state.topics = [];
      });
  },
});
export const { resetDel } = topicsSlice.actions;
export const { resetState } = topicsSlice.actions;
export const { resetCreate } = topicsSlice.actions;
export default topicsSlice.reducer;
