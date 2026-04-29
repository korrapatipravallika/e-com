import { createSelector } from "@reduxjs/toolkit";

const selectCartState = (state) => state.cart ?? {};

export const selectCartItems = createSelector(
  [selectCartState],
  (cartState) => (Array.isArray(cartState.items) ? cartState.items : [])
);

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartTotals = createSelector([selectCartItems], (items) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return {
    subtotal,
    delivery: subtotal > 0 ? 15 : 0,
    grandTotal: subtotal > 0 ? subtotal + 15 : 0,
  };
});
