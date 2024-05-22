/* eslint-disable import/no-unresolved */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import AuthService from "src/services/auth.service";
import OrdersService from "src/services/orders.service";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
    try {
        const response = await asyncFunction(...args);
        console.log(args);
        return response;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
};


export const createOrder = createAsyncThunk(
    "orders/create",
    (data, thunkAPI) => handleAsyncThunk(OrdersService.create, [data], thunkAPI)
);
export const getAllOrders = createAsyncThunk(
    "orders/getAll",
    (userId, thunkAPI) => handleAsyncThunk(OrdersService.getAll, [userId], thunkAPI)
);
export const getAllOrdersForAdmin = createAsyncThunk(
    "orders/getAllForAdmin",
    (_, thunkAPI) => handleAsyncThunk(OrdersService.getAllForAdmin, [null], thunkAPI)
);
export const updateOrder = createAsyncThunk(
    "orders/update",
    ({ id, data }, thunkAPI) => handleAsyncThunk(OrdersService.update, [id, data], thunkAPI)
);
export const getDashboard = createAsyncThunk(
    "orders/dashboard",
    (_, thunkAPI) => handleAsyncThunk(OrdersService.dashboard, [null], thunkAPI)
);
export const resetOrders = createAction("orders/reset")
const ordersSlice = createSlice({
    name: "orders",
    initialState: {
        order: [],
        status: "idle",
        error: null,
        statusGet: "idle",
        statusList: "idle",
        orders: [],
        list: []
    },
    reducers: {
        resetState: (state) => {
            state.error = null;
            state.status = "idle";
            state.user = {};
        },
        resetListOrders: (state) => {
            state.error = null;
            state.statusList = "idle";
            state.list = [];
        },
        resetStateUpdate: (state) => {
            state.error = null;
            state.statusUpdate = "idle";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.fulfilled, (state, { payload }) => {
                state.status = "success";
                state.order = payload;
            })
            .addCase(createOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createOrder.rejected, (state, { payload }) => {
                state.status = "failed";
                state.error = payload;
            })
            .addCase(getAllOrders.fulfilled, (state, { payload }) => {
                state.statusGet = "success";
                state.orders = payload;
            })
            .addCase(getAllOrders.pending, (state) => {
                state.statusGet = "loading";
            })
            .addCase(getAllOrders.rejected, (state, { payload }) => {
                state.statusGet = "failed";
                state.error = payload;
            })
            .addCase(getAllOrdersForAdmin.fulfilled, (state, { payload }) => {
                state.statusList = "success";
                state.list = payload;
            })
            .addCase(getAllOrdersForAdmin.pending, (state) => {
                state.statusList = "loading";
            })
            .addCase(getAllOrdersForAdmin.rejected, (state, { payload }) => {
                state.statusList = "failed";
                state.error = payload;
            })
            .addCase(updateOrder.fulfilled, (state, { payload }) => {
                state.statusUpdate = "success";
                state.update = payload;
            })
            .addCase(updateOrder.pending, (state) => {
                state.statusUpdate = "loading";
            })
            .addCase(updateOrder.rejected, (state, { payload }) => {
                state.statusUpdate = "failed";
                state.error = payload;
            })
            .addCase(getDashboard.fulfilled, (state, { payload }) => {
                state.statusDasboard = "success";
                state.dashboard = payload;
            })
            .addCase(getDashboard.pending, (state) => {
                state.statusDasboard = "loading";
            })
            .addCase(getDashboard.rejected, (state, { payload }) => {
                state.statusDasboard = "failed";
                state.error = payload;
            });
    },
});

export const { resetState: resetOrdersAction } = ordersSlice.actions;
export const { resetListOrders: resetListOrdersAction } = ordersSlice.actions;
export const { resetStateUpdate: resetStateUpdateAction } = ordersSlice.actions;
export default ordersSlice.reducer;