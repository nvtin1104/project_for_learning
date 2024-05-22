/* eslint-disable import/no-unresolved */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import CartService from "src/services/carts.service";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
    try {
        const response = await asyncFunction(...args);
        return response;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
};


export const addToCart = createAsyncThunk(
    "cart/addToCart",
    (data, thunkAPI) => handleAsyncThunk(CartService.add, [data], thunkAPI)
);
export const getCart = createAsyncThunk(
    "cart/getCart",
    (userId, thunkAPI) => handleAsyncThunk(CartService.getAll, [userId], thunkAPI)
);
export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    (id, thunkAPI) => handleAsyncThunk(CartService.delete, [id], thunkAPI)
);
export const resetCart = createAction("cart/reset")
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: [],
        carts: [],
        status: "idle",
        error: null,
        statusGet: "idle",
        statusDel: "idle",
        errorDel: null,
        dataDel: []
    },
    reducers: {
        resetState: (state) => {
            state.error = null;
            state.status = "idle";
            state.statusDel = "idle";
            state.cart = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, { payload }) => {
                state.status = "success";
                state.cart = payload;
            })
            .addCase(addToCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addToCart.rejected, (state, { payload }) => {
                state.status = "failed";
                state.error = payload;
            })
            .addCase(getCart.fulfilled, (state, { payload }) => {
                state.statusGet = "success";
                state.carts = payload;
            })
            .addCase(getCart.pending, (state) => {
                state.statusGet = "loading";
            })
            .addCase(getCart.rejected, (state, { payload }) => {
                state.statusGet = "failed";
                state.error = payload;
            })
            .addCase(deleteCart.fulfilled, (state, { payload }) => {
                state.statusDel = "success";
                state.dataDel = payload;
            })
            .addCase(deleteCart.pending, (state) => {
                state.statusDel = "loading";
            })
            .addCase(deleteCart.rejected, (state, { payload }) => {
                state.statusDel = "failed";
                state.errorDel = payload;
            });
    },
});

export const { resetState: resetCartAction } = cartSlice.actions;
export default cartSlice.reducer;