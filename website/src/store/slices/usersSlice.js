/* eslint-disable import/no-unresolved */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import UsersService from '../../services/users.service';

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
  try {
    return await asyncFunction(...args);
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
};

export const createUser = createAsyncThunk('users/createUser', ({ data }, thunkAPI) =>
  handleAsyncThunk(UsersService.createUser, [data], thunkAPI)
);
export const fetchAllUsers = createAsyncThunk('users/fetchAllUsers', (_, thunkAPI) =>
  handleAsyncThunk(UsersService.getAll, [null], thunkAPI)
);
export const fetchMe = createAsyncThunk('users/fetchMe', (_, thunkAPI) => handleAsyncThunk(UsersService.getMe, [null], thunkAPI));
export const updateUser = createAsyncThunk('users/updateUser', (data, thunkAPI) => handleAsyncThunk(UsersService.update, [data], thunkAPI));
export const getUserById = createAsyncThunk('users/getById', ({ id }, thunkAPI) =>
  handleAsyncThunk(UsersService.getUserById, [id], thunkAPI)
);
export const updatePassword = createAsyncThunk('users/updatePassword', (data, thunkAPI) =>
  handleAsyncThunk(UsersService.updatePassword, [data], thunkAPI)
);
export const deleteUser = createAsyncThunk('users/deleteUser', (userId, thunkAPI) =>
  handleAsyncThunk(UsersService.delete, [userId], thunkAPI)
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    status: 'idle',
    statusMe: 'idle',
    error: null,
    me: null,
    statusUpdate: 'idle',
    statusPassword: 'idle'
  },
  reducers: {
    resetState: (state) => {
      state.error = null;
      state.status = 'idle';
      state.statusMe = 'idle';
    },
    resetStateUpdate: (state) => {
      state.error = null;
      state.statusUpdate = 'idle';
      state.statusPassword = 'idle';
    },
    resetStateUpdatePassword: (state) => {
      state.error = null;
      state.statusPassword = 'idle';
    },
    resetStateDelete: (state) => {
      state.error = null;
      state.statusDelete = 'idle';
    },
    resetStateCreate: (state) => {
      state.error = null;
      state.statusCreate = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.users = payload.users;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllUsers.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      })
      .addCase(getUserById.fulfilled, (state, { payload }) => {
        state.statusById = 'success';
        state.userById = payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.statusById = 'loading';
      })
      .addCase(getUserById.rejected, (state, { payload }) => {
        state.statusById = 'failed';
        state.error = payload;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        state.statusCreate = 'success';
        state.create = payload;
      })
      .addCase(createUser.pending, (state) => {
        state.statusCreate = 'loading';
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.statusCreate = 'failed';
        state.error = payload;
      })
      .addCase(fetchMe.fulfilled, (state, { payload }) => {
        state.statusMe = 'success';
        state.me = payload;
      })
      .addCase(fetchMe.pending, (state) => {
        state.statusMe = 'loading';
      })
      .addCase(fetchMe.rejected, (state, { payload }) => {
        state.statusMe = 'failed';
        state.error = payload;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.statusUpdate = 'success';
        state.updateData = payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.statusUpdate = 'loading';
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.statusUpdate = 'failed';
        state.error = payload;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        state.statusPassword = 'success';
        state.mess = payload;
      })
      .addCase(updatePassword.pending, (state) => {
        state.statusPassword = 'loading';
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.statusPassword = 'failed';
        state.error = payload;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.statusDelete = 'success';
        state.delete = payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.statusDelete = 'loading';
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.statusDelete = 'failed';
        state.error = payload;
      });
  }
});

export const { resetState: resetStateAction } = usersSlice.actions;
export const { resetStateUpdate } = usersSlice.actions;
export const { resetStateUpdatePassword: resetStateUpdatePasswordAction } = usersSlice.actions;
export const { resetStateDelete: resetStateDeleteAction } = usersSlice.actions;
export default usersSlice.reducer;
