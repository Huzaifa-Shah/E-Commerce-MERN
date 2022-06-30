import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_CLEAR_ITEMS,
} from "../constants/CartConstants";

const initialState = {
  cartItems: [],
  shippingAddress: {},
};

export const cartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === CART_ADD_ITEM) {
    const existItem = state.cartItems.find(
      (x) => x.productId === payload.productId
    );
    if (existItem) {
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.productId === existItem.productId ? payload : x
        ),
      };
    } else {
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
      };
    }
  } else if (type === CART_REMOVE_ITEM) {
    return {
      ...state,
      cartItems: state.cartItems.filter((x) => x.productId !== payload),
    };
  } else if (type === CART_SAVE_SHIPPING_ADDRESS) {
    return { ...state, shippingAddress: payload };
  } else if (type === CART_SAVE_PAYMENT_METHOD) {
    return { ...state, paymentMethod: payload };
  } else if (type === CART_CLEAR_ITEMS) {
    localStorage.removeItem('cartItems')
    return {...state, cartItems: []}
  } else {
    return state;
  }
};
