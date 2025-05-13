import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const getNotifications = createAsyncThunk(
  'api/getnotification',
  async (url = 'api/notification/get/', { rejectWithValue }) => {
    try {
      const res = await api.get(url);
      return res.data;
    } catch (error) {
      if (!error.response) return rejectWithValue("Check Server Status");
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  data: {
    results: [],
    next: null,
    count: 0,
    unseen:null
  },
  loading: true,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotifications(state) {
      state.data = initialState.data;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        const newData = action.payload;

        if (state.data.results.length > 0 && newData.results) {
  const existingIds = new Set(state.data.results.map(item => item.id));
  const filteredNewResults = newData.results.filter(item => !existingIds.has(item.id));
  state.data.results = [...state.data.results, ...filteredNewResults];
} else {
  state.data.results = newData.results || [];
}

        state.data.next = newData.next;
        state.data.count = newData.count;
        state.data.unseen = newData.unseen;
        state.loading = false;
      })
      .addCase(getNotifications.rejected, (state) => {
        state.data = initialState.data;
        state.loading = false;
      });
  },
});

export const notificationSliceActions = notificationSlice.actions;
export default notificationSlice;
