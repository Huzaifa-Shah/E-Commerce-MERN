import axios from "axios";
import { SET_LOADER, CLOSE_LOADER, LOGOUT } from "../constants/AuthConstants";
import { SET_PROFILE_ERRORS } from "../constants/ProfileConstants";

export const updateUserProfile = (user) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = await axios.post("/user/updateProfile", user, config);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: LOGOUT });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_PROFILE_ERRORS,
        payload: error.response.data.errors,
      });
    }
  };
};

export const updateUserPassword = (user) => {
  return async (dispatch, getState) => {
    const {
      AuthReducer: { token },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    dispatch({ type: SET_LOADER });
    try {
      const { data } = axios.post("/user/updatePassword", user, config);
      dispatch({ type: CLOSE_LOADER });
    } catch (error) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_PROFILE_ERRORS,
        payload: error.response.data.errors,
      });
    }
  };
};
