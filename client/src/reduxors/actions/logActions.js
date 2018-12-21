import { actionTypes } from "../types";
import axios from "axios";

// add log

export const addLog = (log, history) => dispatch => {
  // dispatch(clearErrors());
  axios
    .post(`/api/users/logs/add`, log)
    .then(res => {
      dispatch({
        type: actionTypes.ADD_LOG,
        payload: res.data.logs
      });
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const getLog = (id, history) => dispatch => {
  axios
    .get(`/api/users/logs/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_LOG,
        payload: res.data
      });
      history.push(`/logs/${id}`);
    })
    .catch(err => {
      dispatch({
        type: actionTypes.GET_LOG,
        payload: {}
      });
      console.log(err);
    });
};

export const editLog = (log, id, history) => dispatch => {
  axios
    .post(`/api/users/logs/edit/${id}`, log)
    .then(res => {
      dispatch({
        type: actionTypes.EDIT_LOG,
        payload: res.data
      });
      history.push("/dashboard");
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err
      })
    );
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

export const goBack = history => dispatch => {
  dispatch({
    type: actionTypes.GO_BACK,
    payload: {}
  });
  history.push({
    pathname: "/drafts"
  });
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

export const prepSend = (id, history) => dispatch => {
  axios
    .get(`/api/users/logs/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.GET_LOG,
        payload: res.data
      });
      history.push(`/send/${id}`);
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_LOG,
        payload: {}
      })
    );
};

export const sendLog = (userData, logId, history) => dispatch => {
  clearErrors();
  axios
    .post(`/api/users/send/${logId}`, userData)
    .then(res => {
      dispatch({
        type: actionTypes.SEND_LOG,
        payload: res.data.logs
      });
      history.push("/sent");
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

// clear errors from forms

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS
  };
};
