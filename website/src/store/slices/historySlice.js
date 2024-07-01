import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import HistoryService from 'services/history.service';

async function handleRequest(request, arg, thunkAPI) {
  try {
    return await request(arg);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
}

export const handleCreateHistoryTest = createAsyncThunk('history/test', ({ data }, thunkAPI) =>
  handleRequest(HistoryService.createTest, { data }, thunkAPI)
);
export const handleGetHistoryTest = createAsyncThunk('history/listTest', ({ id }, thunkAPI) =>
  handleRequest(HistoryService.getTest, { id }, thunkAPI)
);
export const handleGetDashboard = createAsyncThunk('history/dashboard', (_, thunkAPI) =>
  handleRequest(HistoryService.getDashboard, null, thunkAPI)
);

const historySlice = createSlice({
  name: 'history',
  initialState: { data: null, status: 'idle', error: null, listTest: null, dashboard: null },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.status = 'idle';
      state.data = null;
      state.dashboard = null;
    },
    resetStatus: (state) => {
      state.status = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleCreateHistoryTest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleCreateHistoryTest.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(handleCreateHistoryTest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(handleGetDashboard.pending, (state) => {
        state.statusDashboard = 'loading';
      })
      .addCase(handleGetDashboard.fulfilled, (state, action) => {
        state.statusDashboard = 'success';
        state.dashboard = action.payload;
      })
      .addCase(handleGetDashboard.rejected, (state, action) => {
        state.statusDashboard = 'failed';
        state.error = action.payload;
      })
      .addCase(handleGetHistoryTest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleGetHistoryTest.fulfilled, (state, action) => {
        state.status = 'success';
        state.listTest = action.payload;
      })
      .addCase(handleGetHistoryTest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});
export const { resetState, resetStatus } = historySlice.actions;
export default historySlice.reducer;
