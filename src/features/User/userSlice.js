import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserOrders,updateUser,fetchUser } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
  userInfo: null
};


export const fetchUserOrdersAsync = createAsyncThunk(
  'user/fetchUserOrders',
  async () => {
    const response = await fetchUserOrders();
    return response.data;
  }
);
export const fetchUserAsync = createAsyncThunk(
  'user/fetchUser',
  async () => {
    const response = await fetchUser();
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUserProfile',
  async (update) => {
    const response = await updateUser(update);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      });
  },
});


export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectOrdersStatus = (state) => state.user.status;


export default userSlice.reducer;
