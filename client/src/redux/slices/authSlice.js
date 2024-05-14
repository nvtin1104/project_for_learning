import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import AuthService  from '../../services/auth.service';
async function handleRequest(request, arg, thunkAPI) {
  try {
    const response = await request(arg);
    return response;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
}
export const handleGetUserGit = createAsyncThunk(
  'auth/getUserGit',
  (code, thunkAPI) => handleRequest(AuthService.getUserGit, code, thunkAPI)
);
export const handleGetUser = createAsyncThunk(
  'auth/handleGetUser',
  (_, thunkAPI) => handleRequest(AuthService.handleGetUser, null, thunkAPI)
);

export const resetState = createAction('auth/resetState');
export const resetStatus = createAction('auth/resetStatus');
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.status = 'idle';
      state.tokenGit = null;
      state.userGit = null;
    },
    resetStatus: (state) => {
      state.status = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetUserGit.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleGetUserGit.fulfilled, (state, action) => {
        state.status = 'success';
        state.tokenGit = action.payload;
      })
      .addCase(handleGetUserGit.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(handleGetUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleGetUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.userGit = action.payload;
      })
      .addCase(handleGetUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetState: resetStateAction } = authSlice.actions;
export const { resetStatus: resetStatusAction } = authSlice.actions;
export default authSlice.reducer;
