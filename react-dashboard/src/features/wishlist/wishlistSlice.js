import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const simulateWishlistApi = (payload) =>
  new Promise((resolve) => {
    window.setTimeout(() => resolve(payload), 150);
  });

export const initialWishlistState = {
  items: [],
  status: "idle",
};

export const toggleWishlistItemAsync = createAsyncThunk(
  "wishlist/toggleWishlistItemAsync",
  async (product) => simulateWishlistApi(product)
);

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialWishlistState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleWishlistItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(toggleWishlistItemAsync.fulfilled, (state, action) => {
        state.status = "succeeded";

        const exists = state.items.some((item) => item.id === action.payload.id);

        state.items = exists
          ? state.items.filter((item) => item.id !== action.payload.id)
          : [...state.items, action.payload];
      });
  },
});

export default wishlistSlice.reducer;
