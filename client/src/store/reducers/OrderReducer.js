import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
} from "../constants/OrderConstants";

const initialState = {
  loading: true,
  success: false,
  order: [],
  orderError: [],
  orders: []
};

export const OrderCartReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ORDER_CREATE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ORDER_CREATE_SUCCESS) {
    return { ...state, loading: false, success: true, order: payload };
  } else if (ORDER_CREATE_FAIL) {
    return { ...state, loading: false, success: false, orderError: payload };
  } else if (type === ORDER_CREATE_RESET) {
    return {
      ...state,
      loading: false,
      success: false,
      order: [],
      orderError: [],
    };
  } else {
    return state;
  }
};

export const OrderDetailsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ORDER_DETAILS_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ORDER_DETAILS_SUCCESS) {
    return { ...state, loading: false, success: true, order: payload };
  } else if (type === ORDER_DETAILS_FAIL) {
    return { ...state, loading: false, success: false, orderError: payload };
  } else {
    return state;
  }
};

export const OrderPayReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ORDER_PAY_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ORDER_PAY_SUCCESS) {
    return { ...state, loading: false, success: true, order: payload };
  } else if (type === ORDER_PAY_FAIL) {
    return { ...state, loading: false, success: false, orderError: payload };
  } else if (type === ORDER_PAY_RESET) {
    return {
      ...state,
      loading: false,
      success: false,
      order: [],
      orderError: [],
    };
  } else {
    return state;
  }
};

export const OrderListMyReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ORDER_LIST_MY_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ORDER_LIST_MY_SUCCESS) {
    return { ...state, loading: false, success: true, orders: payload };
  } else if (type === ORDER_LIST_MY_FAIL) {
    return { ...state, loading: false, success: false, orderError: payload };
  } else if (type === ORDER_LIST_MY_RESET) {
    return {
      ...state,
      loading: false,
      success: false,
      orders: [],
      orderError: [],
    };
  } else {
    return state;
  }
};
