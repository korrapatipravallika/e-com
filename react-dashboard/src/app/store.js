import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer, { initialCartState } from "../features/cart/cartSlice";
import productsReducer from "../features/products/productSlice";
import uiReducer from "../features/ui/uiSlice";
import wishlistReducer, {
  initialWishlistState,
} from "../features/wishlist/wishlistSlice";
import {
  loadAuthState,
  loadCartState,
  loadWishlistState,
  saveAuthState,
  saveCartState,
  saveWishlistState,
} from "../utils/storage";

const preloadedCart = loadCartState();
const preloadedAuth = loadAuthState();
const preloadedWishlist = loadWishlistState();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    products: productsReducer,
    ui: uiReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: {
    auth: preloadedAuth,
    cart: preloadedCart ?? initialCartState,
    wishlist: preloadedWishlist ?? initialWishlistState,
  },
});

store.subscribe(() => {
  saveAuthState(store.getState().auth);
  saveCartState(store.getState().cart);
  saveWishlistState(store.getState().wishlist);
});


