import TagsService from "src/services/tags.service";

import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const handleAsyncThunk = async (asyncFunction, args, { rejectWithValue }) => {
    try {
        const response = await asyncFunction(...args);
        console.log(args);
        return response;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
};
export const getAllTags = createAsyncThunk(
    "tags/getAllTags",
    (data, thunkAPI) => handleAsyncThunk(TagsService.getAll, [data], thunkAPI)
);
export const createTag = createAsyncThunk(
    "tags/createTag",
    (data, thunkAPI) => handleAsyncThunk(TagsService.create, [data], thunkAPI)
);
export const updateTag = createAsyncThunk(
    "tags/updateTag",
    (data, thunkAPI) => handleAsyncThunk(TagsService.update, [data], thunkAPI)
);
export const deleteTag = createAsyncThunk(
    "tags/deleteTag",
    (data, thunkAPI) => handleAsyncThunk(TagsService.delete, [data], thunkAPI)
);
export const resetTag = createAction("tags/reset")
const tagsSlice = createSlice({
    name: "tags",
    initialState: {
        tags: [],
        status: "idle",
        error: null,
        statusDel: "idle",
        errorDel: null,
        dataDel: []
    },
    reducers: {
        resetState: (state) => {
            state.error = null;
            state.status = "idle";
            state.statusDel = "idle";
            state.tags = [];
        },
        resetDel : (state) => {
            state.error = null;
            state.statusDel = "idle";
            state.delete = [];
        },
        resetCreate: (state) => {
            state.error = null;
            state.statusCreate = "idle";
            state.create = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTags.fulfilled, (state, { payload }) => {
                state.status = "success";
                state.tags = payload;
            })
            .addCase(getAllTags.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getAllTags.rejected, (state, { payload }) => {
                state.status = "failed";
                state.error = payload;
            })
            .addCase(createTag.fulfilled, (state, { payload }) => {
                state.statusCreate = "success";
                state.create = payload;
            })
            .addCase(createTag.pending, (state) => {
                state.statusCreate = "loading";
            })
            .addCase(createTag.rejected, (state, { payload }) => {
                state.statusCreate = "failed";
                state.error = payload;
            })
            .addCase(updateTag.fulfilled, (state, { payload }) => {
                state.status = "success";
                state.tags = payload;
            })
            .addCase(updateTag.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateTag.rejected, (state, { payload }) => {
                state.status = "failed";
                state.error = payload;
            })
            .addCase(deleteTag.fulfilled, (state, { payload }) => {
                state.statusDel = "success";
                state.dataDel = payload;
            })
            .addCase(deleteTag.pending, (state) => {
                state.statusDel = "loading";
            })
            .addCase(deleteTag.rejected, (state, { payload }) => {
                state.statusDel = "failed";
                state.errorDel = payload;
            })
            .addCase(resetTag, (state) => {
                state.tags = [];
            })
    }
});
export const { resetDel } = tagsSlice.actions;
export const { resetState } = tagsSlice.actions;
export const { resetCreate } = tagsSlice.actions;
export default tagsSlice.reducer;