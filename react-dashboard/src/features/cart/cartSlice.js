import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialCartState = {
  items: [],
  status: "idle",
  error: null,
};

export const addCartItemAsync = createAsyncThunk(
  "cart/addCartItemAsync",
  async (product) => product
);

export const removeCartItemAsync = createAsyncThunk(
  "cart/removeCartItemAsync",
  async (productId) => productId
);

export const updateCartQuantityAsync = createAsyncThunk(
  "cart/updateCartQuantityAsync",
  async ({ productId, quantity }) => ({ productId, quantity })
);

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    addCartItem: (state, action) => {
      state.status = "succeeded";

      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeCartItem: (state, action) => {
      state.status = "succeeded";
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateCartQuantity: (state, action) => {
      state.status = "succeeded";

      const cartItem = state.items.find(
        (item) => item.id === action.payload.productId
      );

      if (cartItem) {
        cartItem.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCartItemAsync.fulfilled, (state, action) => {
        cartSlice.caseReducers.addCartItem(state, action);
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        cartSlice.caseReducers.removeCartItem(state, action);
      })
      .addCase(updateCartQuantityAsync.fulfilled, (state, action) => {
        cartSlice.caseReducers.updateCartQuantity(state, action);
      });
  },
});

export const {
  addCartItem,
  clearCart,
  removeCartItem,
  updateCartQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
