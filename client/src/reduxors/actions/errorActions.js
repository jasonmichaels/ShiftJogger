import { actionTypes } from "../types";

// clear errors from forms

export const clearErrors = () => dispatch => {
  dispatch({
    type: actionTypes.CLEAR_ERRORS,
    payload: {}
  });
};
