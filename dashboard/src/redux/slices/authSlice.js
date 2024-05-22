/* eslint-disable import/no-unresolved */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import AuthService from "src/services/auth.service";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
    try {
        const response = await asyncFunction(...args);
        console.log(args);
        return response;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
};


export const login = createAsyncThunk(
    "auth/login",
    (data, thunkAPI) => handleAsyncThunk(AuthService.login, [data], thunkAPI)
);
export const register = createAsyncThunk(
    "auth/register",
    (data, thunkAPI) => handleAsyncThunk(AuthService.register, [data], thunkAPI)
);
export const getOTP = createAsyncThunk(
    "auth/getOTP",
    (data, thunkAPI) => handleAsyncThunk(AuthService.getOTP, [data], thunkAPI)
);
export const changePassword = createAsyncThunk(
    "auth/changePassword",
    (data, thunkAPI) => handleAsyncThunk(AuthService.changePassword, [data], thunkAPI)
);
export const loginWithGG = createAsyncThunk(
    "auth/loginWithGG",
    (data, thunkAPI) => handleAsyncThunk(AuthService.loginWithGG, [data], thunkAPI)
);
export const resetAuth = createAction("auth/reset")
const authSlice = createSlice({
    name: "auth",
    initialState: {
        data: [],
        status: "idle",
        error: null,
        statusRegister: "idle",
        statusOTP: "idle",
        otp: null,
        statusGG: "idle",
        gg: null,
    },
    reducers: {
        resetState: (state) => {
            state.error = null;
            state.status = "idle";
            state.user = {};
            state.statusRegister = "idle";
            state.register = null;
            state.statusOTP = "idle";
            state.otp = null;
            state.statusChange = "idle";
            state.change = null;
        },
        resetOTP: (state) => {
            state.statusOTP = "idle";
            state.otp = null;
        },
        resetChangePassword: (state) => {
            state.statusChange = "idle";
            state.change = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, { payload }) => {
                state.status = "success";
                state.user = payload;
            })
            .addCase(login.pending, (state) => {
                state.status = "loading";
            })
            .addCase(login.rejected, (state, { payload }) => {
                state.status = "failed";
                state.error = payload;
            })
            .addCase(register.fulfilled, (state, { payload }) => {
                state.statusRegister = "success";
                state.register = payload;
            })
            .addCase(register.pending, (state) => {
                state.statusRegister = "loading";
            })
            .addCase(register.rejected, (state, { payload }) => {
                state.statusRegister = "failed";
                state.error = payload;
            })
            .addCase(getOTP.fulfilled, (state, { payload }) => {
                state.statusOTP = "success";
                state.otp = payload;
            })
            .addCase(getOTP.pending, (state) => {
                state.statusOTP = "loading";
            })
            .addCase(getOTP.rejected, (state, { payload }) => {
                state.statusOTP = "failed";
                state.error = payload;
            })
            .addCase(changePassword.fulfilled, (state, { payload }) => {
                state.statusChange = "success";
                state.change = payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.statusChange = "loading";
            })
            .addCase(changePassword.rejected, (state, { payload }) => {
                state.statusChange = "failed";
                state.error = payload;
            })
            .addCase(loginWithGG.fulfilled, (state, { payload }) => {
                state.status = "success";
                state.user = payload;
            })
            .addCase(loginWithGG.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginWithGG.rejected, (state, { payload }) => {
                state.status = "failed";
                state.error = payload;
            })
            ;
    },
});
export const { resetOTP } = authSlice.actions;
export const { resetChangePassword } = authSlice.actions;
export const { resetState: resetAuthAction } = authSlice.actions;
export default authSlice.reducer;