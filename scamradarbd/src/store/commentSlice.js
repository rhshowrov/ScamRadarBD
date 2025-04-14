import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";


// Thunk to fetch comments
export const getComments = createAsyncThunk(
  'comments/getComments', // Unique name
  async (post_id, { rejectWithValue }) => {
    try {
      const res = await api.get(`api/post/comments/${post_id}`);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data?.error);
    }
  }
);

// Thunk to post a comment
export const postComments = createAsyncThunk(
  'comments/postComments', // Unique name
  async ({ post_id, comment }, { rejectWithValue }) => {
    try {
      const res = await api.post(`api/post/comments/${post_id}`, { comment });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data?.error);
    }
  }
);

// Initial state
const initialState = {
  comments: [],
  loading: false, // Loading state for getComments
  posting: false, // Loading state for postComments
  error: null,
  success: null,
};

// Slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    resetState: (state) => {
      state.comments = []; // Clear comments
      state.error = null;
      state.loading = false;
      state.posting = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // getComments cases
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.success = true;
        state.loading = false;
      })
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error Occurred While Fetching Comments!";
      })

      // postComments cases
      .addCase(postComments.fulfilled, (state, action) => {
        state.comments.unshift(action.payload); // Add the new comment to the beginning
        state.success = true;
        state.posting = false;
      })
      .addCase(postComments.pending, (state) => {
        state.posting = true;
      })
      .addCase(postComments.rejected, (state, action) => {
        state.posting = false;
        state.error = action.payload || "Error Occurred While Submitting Comments!";
      });
  },
});

export const commentsSliceActions = commentsSlice.actions;
export default commentsSlice;