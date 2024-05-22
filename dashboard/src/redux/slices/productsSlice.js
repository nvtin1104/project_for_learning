/* eslint-disable import/no-unresolved */
import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ProductsSerice from "src/services/products.service";

const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
    try {
        const response = await asyncFunction(...args);
        return response;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
};


export const fetchAllProducts = createAsyncThunk(
    "products/getAll",
    (_, thunkAPI) => handleAsyncThunk(ProductsSerice.getAll, [null], thunkAPI)
);
export const createProduct = createAsyncThunk(
    "products/create",
    (data, thunkAPI) => handleAsyncThunk(ProductsSerice.create, [data], thunkAPI)
);
export const deleteProduct = createAsyncThunk(
    "products/delete",
    (id, thunkAPI) => handleAsyncThunk(ProductsSerice.delete, [id], thunkAPI)
);
export const getProduct = createAsyncThunk(
    "products/get",
    (id, thunkAPI) => handleAsyncThunk(ProductsSerice.get, [id], thunkAPI)
);
export const updateProduct = createAsyncThunk(
    "products/update",
    ({ id, data }, thunkAPI) => handleAsyncThunk(ProductsSerice.update, [id, data], thunkAPI)
);
export const resetProducts = createAction("products/reset")
const productsSlice = createSlice({
    name: "products",
    initialState: {
        data: [],
        status: "idle",
        error: null,
        statusCreate: "idle",
        statusDel: "idle",
        product: null
    },
    reducers: {
        resetState: (state) => {
            state.error = null;
            state.status = "idle";
            state.products = {};
        },
        resetCreate: (state) => {
            state.error = null;
            state.statusCreate = "idle";
            state.create = {};
        },
        resetDelete: (state) => {
            state.error = null;
            state.statusDel = "idle";
            state.delete = {};
        },
        resetUpdate: (state) => {
            state.product = null;
            state.statusGetOne = "idle";
            state.error = null;
            state.statusUpdate = "idle";
            state.update = {};
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProducts.fulfilled, (state, { payload }) => {
                state.status = "success";
                state.products = payload;
            })
            .addCase(fetchAllProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAllProducts.rejected, (state, { payload }) => {
                state.status = "failed";
                state.error = payload;
            })
            .addCase(createProduct.fulfilled, (state, { payload }) => {
                state.statusCreate = "success";
                state.create = payload;
            })
            .addCase(createProduct.pending, (state) => {
                state.statusCreate = "loading";
            })
            .addCase(createProduct.rejected, (state, { payload }) => {
                state.statusCreate = "failed";
                state.error = payload;
            })
            .addCase(deleteProduct.fulfilled, (state, { payload }) => {
                state.statusDel = "success";
                state.delete = payload;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.statusDel = "loading";
            })
            .addCase(deleteProduct.rejected, (state, { payload }) => {
                state.statusDel = "failed";
                state.error = payload;
            })
            .addCase(getProduct.fulfilled, (state, { payload }) => {
                state.statusGetOne = "success";
                state.product = payload;
            })
            .addCase(getProduct.pending, (state) => {
                state.statusGetOne = "loading";
            })
            .addCase(getProduct.rejected, (state, { payload }) => {
                state.statusGetOne = "failed";
                state.error = payload;
            })
            .addCase(updateProduct.fulfilled, (state, { payload }) => {
                state.statusUpdate = "success";
                state.update = payload;
            })
            .addCase(updateProduct.pending, (state) => {
                state.statusUpdate = "loading";
            })
            .addCase(updateProduct.rejected, (state, { payload }) => {
                state.statusUpdate = "failed";
                state.error = payload;
            })
            ;
    },
});
export const { resetUpdate } = productsSlice.actions;
export const { resetState: resetProductsAction } = productsSlice.actions;
export const { resetCreate: resetCreateProduct } = productsSlice.actions;
export const { resetDelete: resetDeleteProduct } = productsSlice.actions;
export default productsSlice.reducer;