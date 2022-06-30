import { SET_PROFILE_ERRORS } from "../constants/ProfileConstants";

const initialState = {
  updateErrors: [],
};

export const UpdateProfileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  if (type === SET_PROFILE_ERRORS) {
    return { ...state, updateErrors: payload };
  } else {
    return state;
  }
};
