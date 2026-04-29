import { createSelector } from "@reduxjs/toolkit";

const selectWishlistState = (state) => state.wishlist;

export const selectWishlistItems = createSelector(
  [selectWishlistState],
  (wishlistState) => wishlistState.items
);

export const selectWishlistCount = createSelector(
  [selectWishlistItems],
  (items) => items.length
);
