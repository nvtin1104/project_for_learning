import TopicsService from 'src/services/topics.service';

import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    const response = await asyncFunction(...args);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};
export const getAllTopics = createAsyncThunk('topics/getAllTopics', (data, thunkAPI) =>
  handleAsyncThunk(TopicsService.getAll, [data], thunkAPI)
);
export const createTopic = createAsyncThunk('topics/createTopic', (data, thunkAPI) =>
  handleAsyncThunk(TopicsService.create, [data], thunkAPI)
);
export const updateTopic = createAsyncThunk('topics/updateTopic', ({ id, data }, thunkAPI) =>
  handleAsyncThunk(TopicsService.update, [id, data], thunkAPI)
);
export const deleteTopic = createAsyncThunk('topics/deleteTopic', (data, thunkAPI) =>
  handleAsyncThunk(TopicsService.delete, [data], thunkAPI)
);
export const getTopicById = createAsyncThunk('topics/getTopic', (data, thunkAPI) =>
  handleAsyncThunk(TopicsService.getById, [data], thunkAPI)
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
    resetUpdate: (state) => {
      state.error = null;
      state.statusUpdate = 'idle';
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
      .addCase(createTopic.fulfilled, (state, { payload }) => {
        state.statusCreate = 'success';
        state.create = payload;
      })
      .addCase(createTopic.pending, (state) => {
        state.statusCreate = 'loading';
      })
      .addCase(createTopic.rejected, (state, { payload }) => {
        state.statusCreate = 'failed';
        state.error = payload;
      })
      .addCase(updateTopic.fulfilled, (state, { payload }) => {
        state.statusUpdate = 'success';
        state.topic = payload;
      })
      .addCase(updateTopic.pending, (state) => {
        state.statusUpdate = 'loading';
      })
      .addCase(updateTopic.rejected, (state, { payload }) => {
        state.statusUpdate = 'failed';
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
      .addCase(getTopicById.fulfilled, (state, { payload }) => {
        state.statusGet = 'success';
        state.topic = payload;
      })
      .addCase(getTopicById.pending, (state) => {
        state.statusGet = 'loading';
      })
      .addCase(getTopicById.rejected, (state, { payload }) => {
        state.statusGet = 'failed';
        state.error = payload;
      })
      .addCase(resetTag, (state) => {
        state.topics = [];
      });
  },
});
export const { resetDel } = topicsSlice.actions;
export const { resetState } = topicsSlice.actions;
export const { resetUpdate } = topicsSlice.actions;
export const { resetCreate } = topicsSlice.actions;
export default topicsSlice.reducer;
