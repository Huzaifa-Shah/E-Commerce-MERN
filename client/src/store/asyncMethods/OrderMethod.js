import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/CartConstants";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
} from "../constants/OrderConstants";

export const createOrder = (order) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: ORDER_CREATE_REQUEST });
    try {
      const { data } = await axios.post("/user/orders", order, config);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      dispatch({ type: CART_CLEAR_ITEMS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const getOrderDetails = (id) => {
  return async (dispatch, getState) => {
    try {
      const {
        AuthReducer: { token },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      dispatch({ type: ORDER_DETAILS_REQUEST });

      const { data } = await axios.get(`/user/orders/${id}`, config);
      dispatch({
        type: ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const payOrder = (orderId, paymentResult) => {
  return async (dispatch, getState) => {
    try {
      const {
        AuthReducer: { token },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch({ type: ORDER_PAY_REQUEST });
      const { data } = axios.post(
        `/user/orders/${orderId}/paid`,
        paymentResult,
        config
      );
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};

export const listMyOrders = (userId) => {
  return async (dispatch, getState) => {
    try {
      const {
        AuthReducer: { token },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      dispatch({ type: ORDER_LIST_MY_REQUEST });
      const { data } = await axios.get(`/user/orders/myorders/${userId}`, config);
      dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ORDER_LIST_MY_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};
