import { actionTypes } from "../types";
import axios from "axios";

// add log

export const addLog = (log, id) => dispatch => {
  // dispatch(clearErrors());
  axios.post(`/api/users/logs/${id}`, log).then(res => {
    dispatch({
      type: actionTypes.ADD_LOG,
      payload: res.data.logs
    });
  });
};

export const getLogs = () => dispatch => {
  // dispatch(clearErrors());
  axios
    .get(`/api/users/logs`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_LOGS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_LOGS,
        payload: {}
      })
    );
};

export const deleteLog = id => dispatch => {
  axios
    .delete(`/api/users/logs/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.DELETE_LOG,
        payload: id
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const editLog = (id, history) => dispatch => {
  axios
    .get(`/api/users/logs/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_LOG,
        payload: res.data
      });
      history.push(`/logs/${id}`);
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_LOG,
        payload: {}
      })
    );
};

// set loading state

export const setPostLoading = () => {
  return {
    type: actionTypes.POST_LOADING
  };
};

// clear errors from forms

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS
  };
};

export const goBack = id => dispatch => {
  axios
    .delete(`/api/logs/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.DELETE_POST,
        payload: id
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};
