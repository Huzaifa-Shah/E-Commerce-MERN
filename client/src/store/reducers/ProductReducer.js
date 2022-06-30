import {
  SET_LOADER,
  CLOSE_LOADER,
  ERROR,
  SET_PRODUCTS,
  SET_PRODUCT,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from "../constants/ProductConstants";

const initialState = {
  loading: false,
  products: [],
  product: {},
  userProducts: [],
  productError: [],
  count: 0,
  perPage: 0,
};

export const homeProducts = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === SET_LOADER) {
    return { ...state, loading: true };
  } else if (type === CLOSE_LOADER) {
    return { ...state, loading: false };
  } else if (type === ERROR) {
    return { ...state, error: payload };
  } else if (type === SET_PRODUCTS) {
    return {
      ...state,
      products: payload.response,
      count: payload.count,
      perPage: payload.perPage,
    };
  } else {
    return state;
  }
};

export const getProduct = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === SET_PRODUCT) {
    return { ...state, product: payload };
  } else {
    return state;
  }
};

export const CreateProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === PRODUCT_CREATE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === PRODUCT_CREATE_SUCCESS) {
    return { ...state, loading: false, product: payload };
  } else if (type === PRODUCT_CREATE_FAIL) {
    return { ...state, loading: false, productError: payload };
  } else {
    return state;
  }
};

export const GetUserProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === SET_LOADER) {
    return { ...state, loading: true };
  } else if (type === CLOSE_LOADER) {
    return { ...state, loading: false };
  } else if (type === SET_PRODUCT) {
    return { ...state, loading: false, userProducts: payload };
  } else if (type === ERROR) {
    return { ...state, loading: false, productError: payload };
  } else {
    return state;
  }
};

export const UpdateProductReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === PRODUCT_UPDATE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === PRODUCT_UPDATE_SUCCESS) {
    return { ...state, loading: false, product: payload };
  } else if (type === PRODUCT_UPDATE_FAIL) {
    return { ...state, loading: false, productError: payload };
  } else {
    return state;
  }
};