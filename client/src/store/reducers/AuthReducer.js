import jwt_decode from "jwt-decode";
import {
  SET_LOADER,
  CLOSE_LOADER,
  SET_TOKEN,
  REGISTER_ERRORS,
  LOGIN_ERRORS,
  LOGOUT,
  GOOGLE_ERRORS,
  GOOGLE_TOKEN,
  GOOGLE_USER,
  GOOGLE_LOGOUT,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  ADMIN_UPDATE_REQUEST,
  ADMIN_UPDATE_SUCCESS,
  ADMIN_UPDATE_FAIL,
} from "../constants/AuthConstants";

const initialState = {
  loading: false,
  registerErrors: [],
  loginErrors: [],
  googleErrors: [],
  token: "",
  user: "",
  googleUser: "",
  success: false,
  deleteUserErrors: [],
};

const verifyToken = (token) => {
  const decodedToken = jwt_decode(token);
  const expiresIn = new Date(decodedToken.exp * 1000);
  if (new Date() > expiresIn) {
    localStorage.removeItem("myToken");
    return null;
  } else {
    return decodedToken;
  }
};

const token = localStorage.getItem("myToken");
if (token) {
  const decoded = verifyToken(token);
  if (decoded) {
    initialState.token = token;
    const { user } = decoded;
    initialState.user = user;
  }
}

export const AuthReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === SET_LOADER) {
    return { ...state, loading: true };
  } else if (type === CLOSE_LOADER) {
    return { ...state, loading: false };
  } else if (type === REGISTER_ERRORS) {
    return { ...state, registerErrors: payload };
  } else if (type === SET_TOKEN) {
    const decoded = verifyToken(payload);
    const { user } = decoded;
    return {
      ...state,
      token: payload,
      user: user,
      registerErrors: [],
      loginErrors: [],
    };
  } else if (type === LOGIN_ERRORS) {
    return { ...state, loginErrors: payload };
  } else if (type === LOGOUT) {
    localStorage.removeItem("myToken");
    return { ...state, token: "", user: "" };
  } else {
    return state;
  }
};

export const GoogleReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === GOOGLE_ERRORS) {
    return { ...state, googleErrors: payload };
  } else if (type === GOOGLE_TOKEN) {
    localStorage.setItem("GoogleToken", payload);
    return { ...state, token: payload };
  } else if (type === GOOGLE_USER) {
    return { ...state, googleUser: payload };
  } else if (type === GOOGLE_LOGOUT) {
    return { ...state, token: "", googleUser: "" };
  } else {
    return state;
  }
};

export const deleteUserReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === USER_DELETE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === USER_DELETE_SUCCESS) {
    return { ...state, loading: false, success: true };
  } else if (type === USER_DELETE_FAIL) {
    return {
      ...state,
      loading: false,
      success: false,
      deleteUserErrors: payload,
    };
  } else {
    return state;
  }
};

export const updateAdminReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === ADMIN_UPDATE_REQUEST) {
    return { ...state, loading: true };
  } else if (type === ADMIN_UPDATE_SUCCESS) {
    return { ...state, loading: false, success: true };
  } else if (type === ADMIN_UPDATE_FAIL) {
    return {
      ...state,
      loading: false,
      success: false,
      deleteUserErrors: payload,
    };
  } else {
    return state;
  }
};
