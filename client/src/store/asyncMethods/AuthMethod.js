import axios from "axios";
import {
  SET_LOADER,
  CLOSE_LOADER,
  SET_TOKEN,
  REGISTER_ERRORS,
  LOGIN_ERRORS,
  USER_DELETE_REQUEST,
  USER_DELETE_FAIL,
  USER_DELETE_SUCCESS,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAIL,
} from "../constants/AuthConstants";

export const userRegister = (info) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.post("/register", info, config);
      dispatch({ type: CLOSE_LOADER });
      localStorage.setItem("myToken", data.token);
      dispatch({ type: SET_TOKEN, payload: data.token });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: REGISTER_ERRORS, payload: error.response.data.errors });
    }
  };
};

export const userLogin = (info) => {
  return async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.post("/login", info, config);
      dispatch({ type: CLOSE_LOADER });
      localStorage.setItem("myToken", data.token);
      dispatch({ type: SET_TOKEN, payload: data.token });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: LOGIN_ERRORS, payload: error.response.data.errors });
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: USER_DELETE_REQUEST });
      await axios.delete(`/user/delete/${userId}`, config);
      dispatch({ type: USER_DELETE_SUCCESS });
    } catch (error) {
      dispatch({ type: USER_DELETE_FAIL, payload: error.response.data.errors });
    }
  };
};

export const updateAdmin = (userId) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch({ type: ADMIN_UPDATE_REQUEST });
      await axios.get(`/user/updateAdmin/${userId}`, config);
      dispatch({ type: ADMIN_UPDATE_SUCCESS });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADMIN_UPDATE_FAIL,
        payload: error.response.data.errors,
      });
    }
  };
};
