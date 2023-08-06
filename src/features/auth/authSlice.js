import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkUser, createUser, signOutUser,checkAuth, resetPasswordRequest, resetPassword } from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset: false,
};

export const createUserAsync = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  "auth/checkUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await checkUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const checkAuthAsync = createAsyncThunk(
  "auth/checkAuth",
  async () => {
    try {
      const response = await checkAuth();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const resetPasswordRequestAsync = createAsyncThunk(
  "auth/resetPasswordRequest",
  async (email) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (data) => {
    try {
      const response = await resetPassword(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signOutUserAsync = createAsyncThunk(
  "auth/signOutUser",
  async () => {
    const response = await signOutUser();
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.error = null;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
      .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSent = true;
      })
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
      })
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectuserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export const selectPasswordReset = (state) => state.auth.passwordReset;
export const selectLoginStatus = (state) => state.auth.status;

export default authSlice.reducer;
