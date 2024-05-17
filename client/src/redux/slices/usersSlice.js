// import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
// import UsersService from "src/services/users.service";

// const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
//     try {
//         const response = await asyncFunction(...args);
//         return response;
//     } catch (err) {
//         return rejectWithValue(err.response.data);
//     }
// };


// export const fetchAllUsers = createAsyncThunk(
//     "users/fetchAllUsers",
//     (_, thunkAPI) => handleAsyncThunk(UsersService.getAll, [null], thunkAPI)
// );

// export const fetchUserById = createAsyncThunk(
//     "users/fetchUserById",
//     ({ id }, thunkAPI) => handleAsyncThunk(UsersService.getByID, [id], thunkAPI)
// );
// export const handleAddCoin = createAsyncThunk(
//     "users/coin/handleAddCoin",
//     ({ id, data }, thunkAPI) => handleAsyncThunk(UsersService.addCoin, [id, data], thunkAPI)
// );
// export const handleEditCoin = createAsyncThunk(
//     "users/handleEditCoin",
//     ({ id, data }, thunkAPI) => handleAsyncThunk(UsersService.update, [id, data], thunkAPI)
// );
// export const handleAddUser = createAsyncThunk(
//     "users/handleAddUser",
//     ({ data }, thunkAPI) => handleAsyncThunk(UsersService.add, [data], thunkAPI)
// );
// // ... similar changes for deleteProductById, createProduct, updateProduct

// const usersSlice = createSlice({
//     name: "users",
//     initialState: {
//         data: [],
//         status: "idle",
//         statusFetchById: "idle",
//         statusAddCoin: "idle",
//         statusEditCoin: "idle",
//         statusAddUser: "idle",
//         error: null,
//     },
//     reducers: {
//         resetState: (state) => {
//             state.error = null;
//             state.status = "idle";
//             state.statusFetchById = "idle";
//             // state.statusCreate = "idle";
//             // state.statusUpdate = "idle";
//             // state.statusDelete = "idle";
//         },
//         resetStateAddCoin: (state) => {
//             state.errorCoin = null;
//             state.statusAddCoin = "idle";
//         },
//         resetStateEditCoin: (state) => {
//             state.errorEditCoin = null;
//             state.statusEditCoin = "idle";
//         },
//         resetStateAddUser: (state) => {
//             state.errorAddUser = null;
//             state.statusAddUser = "idle";
//         }
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
//                 state.status = "success";
//                 state.users = payload.users;
//             })
//             .addCase(fetchAllUsers.pending, (state) => {
//                 state.status = "loading";
//             })
//             .addCase(fetchAllUsers.rejected, (state, { payload }) => {
//                 state.status = "failed";
//                 state.error = payload;
//             })
//             .addCase(fetchUserById.fulfilled, (state, { payload }) => {
//                 state.statusFetchById = "success";
//                 state.user = payload;
//             })
//             .addCase(fetchUserById.pending, (state) => {
//                 state.statusFetchById = "loading";
//             })
//             .addCase(fetchUserById.rejected, (state, { payload }) => {
//                 state.statusFetchById = "failed";
//                 state.error = payload;
//             })
//             .addCase(handleAddCoin.fulfilled, (state, { payload }) => {
//                 state.statusAddCoin = "success";
//                 state.coin = payload;
//             })
//             .addCase(handleAddCoin.pending, (state) => {
//                 state.statusAddCoin = "loading";
//             })
//             .addCase(handleAddCoin.rejected, (state, { payload }) => {
//                 state.statusAddCoin = "failed";
//                 state.errorCoin = payload;
//             })
//             .addCase(handleEditCoin.fulfilled, (state, { payload }) => {
//                 state.statusEditCoin = "success";
//                 state.coinEdit = payload;
//             })
//             .addCase(handleEditCoin.pending, (state) => {
//                 state.statusEditCoin = "loading";
//             })
//             .addCase(handleEditCoin.rejected, (state, { payload }) => {
//                 state.statusEditCoin = "failed";
//                 state.errorEditCoin = payload;
//             })
//             .addCase(handleAddUser.fulfilled, (state, { payload }) => {
//                 state.statusAddUser = "success";
//                 state.userAdd = payload;
//             })
//             .addCase(handleAddUser.pending, (state) => {
//                 state.statusAddUser = "loading";
//             })
//             .addCase(handleAddUser.rejected, (state, { payload }) => {
//                 state.statusAddUser = "failed";
//                 state.errorAddUser = payload;
//             });
//     },
// });

// export const { resetState: resetStateAction } = usersSlice.actions;
// export const { resetStateAddCoin: resetStateAddCoinAction } = usersSlice.actions;
// export const { resetStateEditCoin: resetStateEditCoinAction } = usersSlice.actions;
// export const { resetStateAddUser: resetStateAddUserAction } = usersSlice.actions;
// export default usersSlice.reducer;