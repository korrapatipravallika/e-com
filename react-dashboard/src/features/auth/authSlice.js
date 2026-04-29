import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showDialog } from "../ui/uiSlice";
import { loginSeller, signupSeller } from "./authAPI";

const initialState = {
  seller: null,
  token: null,
  status: "idle",
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await signupSeller(payload);

      dispatch(
        showDialog({
          title: "Signup successful",
          message: response.message ?? "Seller account created successfully.",
          type: "success",
        })
      );

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ?? "Unable to complete signup.";

      dispatch(
        showDialog({
          title: "Signup failed",
          message,
          type: "error",
        })
      );

      return rejectWithValue(message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const response = await loginSeller(payload);

      dispatch(
        showDialog({
          title: "Login successful",
          message: response.message ?? "Welcome back.",
          type: "success",
        })
      );

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message ?? "Unable to complete login.";

      dispatch(
        showDialog({
          title: "Login failed",
          message,
          type: "error",
        })
      );

      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;

      if (state.status === "failed") {
        state.status = "idle";
      }
    },
    logoutUser: (state) => {
      state.seller = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.seller = action.payload.seller;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearAuthError, logoutUser } = authSlice.actions;

export default authSlice.reducer;
