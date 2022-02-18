import { createSelector } from 'reselect';

// Input selector: take the whole reducer state, and gets a slice of it
const selectCart = (state) => state.cart;

// Output selector
export const selectCartItems = createSelector(
  [selectCart], // array of input selectors
  (cart) => cart.cartItems // a function that will return the value out of this selector
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);