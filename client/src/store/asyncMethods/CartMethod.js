import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD
} from "../constants/CartConstants";

export const addToCart = (id, qty) => {
  return async (dispatch, getState) => {
    const {
      data: { product },
    } = await axios.get(`/details/${id}`);
    try {
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          productId: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          countInStock: product.countInStock,
          qty,
        },
      });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const removeFromCart = (id) => {
  return (dispatch, getState) => {
    try {
      dispatch({ type: CART_REMOVE_ITEM, payload: id });
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartReducer.cartItems)
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const saveShippingAddress = (data) => {
  return (dispatch) => {
    try {
      dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
      localStorage.setItem("shippingAddress", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const savePaymentMethod = (data) => {
  return (dispatch) => {
    try {
      dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
      localStorage.setItem("paymentMethod", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };
};
