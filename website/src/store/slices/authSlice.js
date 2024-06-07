/* eslint-disable import/no-unresolved */
import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import AuthService from '../../services/auth.service';

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    return await asyncFunction(...args);
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

export const login = createAsyncThunk('auth/login', (data, thunkAPI) => handleAsyncThunk(AuthService.login, [data], thunkAPI));
export const register = createAsyncThunk('auth/register', (data, thunkAPI) => handleAsyncThunk(AuthService.register, [data], thunkAPI));
export const resetPassword = createAsyncThunk('auth/resetPassword', (data, thunkAPI) =>
  handleAsyncThunk(AuthService.resetPassword, [data], thunkAPI)
);
export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', (_, thunkAPI) =>
  handleAsyncThunk(AuthService.getCurrent, [null], thunkAPI)
);
export const loginWithGG = createAsyncThunk('auth/loginWithGG', (data, thunkAPI) =>
  handleAsyncThunk(AuthService.loginWithGG, [data], thunkAPI)
);
export const resetAuth = createAction('auth/reset');
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: [],
    user: null,
    status: 'idle',
    error: null,
    statusRegister: 'idle',
    statusOTP: 'idle',
    otp: null,
    statusGG: 'idle',
    gg: null
  },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.status = 'idle';
      state.user = {};
      state.statusCurrent = 'idle';
      state.statusRegister = 'idle';
      state.statusOTP = 'idle';
      state.otp = null;
      state.statusReset = 'idle';
      state.change = null;
    },
    resetStateLogin: (state) => {
      state.error = null;
      state.status = 'idle';
      state.statusGG = 'idle';
      state.user = {};
    },
    resetRegister: (state) => {
      state.error = null;
      state.statusRegister = 'idle';
      state.user = {};
    },
    resetStatusPassword: (state) => {
      state.statusReset = 'idle';
      state.change = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.user = payload.user;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.statusCurrent = 'success';
        state.user = payload;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.statusCurrent = 'loading';
      })
      .addCase(getCurrentUser.rejected, (state, { payload }) => {
        state.statusCurrent = 'failed';
        state.error = payload;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.statusRegister = 'success';
        state.user = payload;
      })
      .addCase(register.pending, (state) => {
        state.statusRegister = 'loading';
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.statusRegister = 'failed';
        state.error = payload;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.statusReset = 'success';
        state.reset = payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.statusReset = 'loading';
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.statusReset = 'failed';
        state.error = payload;
      })
      .addCase(loginWithGG.fulfilled, (state, { payload }) => {
        state.statusGG = 'success';
        state.user = payload;
      })
      .addCase(loginWithGG.pending, (state) => {
        state.statusGG = 'loading';
      })
      .addCase(loginWithGG.rejected, (state, { payload }) => {
        state.statusGG = 'failed';
        state.error = payload;
      });
  }
});
export const { resetStatusPassword } = authSlice.actions;
export const { resetRegister } = authSlice.actions;
export const { resetStateLogin } = authSlice.actions;
export const { resetState: resetAuthAction } = authSlice.actions;
export default authSlice.reducer;
