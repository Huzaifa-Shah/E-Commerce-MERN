import axios from "axios";
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

export const homeProducts = (page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const {
        data: { response, count, perPage },
      } = await axios.get(`/home/${page}`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_PRODUCTS, payload: { response, count, perPage } });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: ERROR, payload: error.response.data.errors });
    }
  };
};

export const getProduct = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const {
        data: { product },
      } = await axios.get(`/details/${id}`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_PRODUCT, payload: product });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: ERROR, payload: error.response.data.errors });
    }
  };
};

export const createProduct = (info) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch({ type: PRODUCT_CREATE_REQUEST });
    try {
      const { data } = await axios.post("/user/createProduct", info, config);
      console.log(data);
      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const { errors } = error.response.data;
      console.log(error.response.data);
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: errors,
      });
    }
  };
};

export const getUserProducts = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_LOADER });
    try {
      const {
        AuthReducer: { token },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const {
        data: { products },
      } = await axios.get(`/user/products/${id}`, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_PRODUCT, payload: products });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: ERROR, payload: error.response.data.errors });
    }
  };
};

export const deleteUserProduct = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_LOADER });
    try {
      const {
        AuthReducer: { token },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`/user/deleteProduct/${id}`, config);
      dispatch({ type: CLOSE_LOADER });
    } catch (error) {
      console.log(error);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: ERROR, payload: error.response.data.errors });
    }
  };
};

export const updateProduct = (info) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    dispatch({ type: PRODUCT_UPDATE_REQUEST });
    try {
      const { data } = await axios.post("/user/updateProduct", info, config);
      console.log(data);
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const { errors } = error.response.data;
      console.log(error.response.data);
      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: errors,
      });
    }
  };
};
