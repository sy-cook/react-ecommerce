import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN 
  // payload is an optional property on our action object, since in our reducer, we don't require payload
});