import { actionTypes } from "../types";
import axios from "axios";

// add log

export const addLog = (log, history) => dispatch => {
  clearErrors();
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
  clearErrors();
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

export const goBack = (path, history) => dispatch => {
  dispatch({
    type: actionTypes.GO_BACK,
    payload: {}
  });
  if (path === null) return;
  history.push({
    pathname: `/${path}`
  });
};

export const deleteLog = id => dispatch => {
  setActiveID(id);
  axios
    .delete(`/api/users/logs/${id}`)
    .then(res => {
      dispatch({
        type: actionTypes.DELETE_LOG,
        payload: res.data
      });
    })
    .then(() => {
      dispatch({
        type: actionTypes.SET_ACTIVE_ID,
        payload: ""
      });
    })
    .catch(err =>
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setActiveID = id => dispatch => {
  dispatch({
    type: actionTypes.SET_ACTIVE_ID,
    payload: id
  });
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
  // clearErrors();
  // dispatch(setBuilding());
  axios
    .post(`/api/users/logs/send/${logId}`, userData)
    .then(res => {
      dispatch({
        type: actionTypes.SEND_LOG,
        payload: res.data.logs
      });
      history.push("/sent");
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const searchLogs = query => dispatch => {
  axios
    .post(`/api/users/logs/search/${query}`)
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

// clear errors from forms

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
    payload: {}
  };
};

export const setBuilding = () => {
  return {
    type: actionTypes.SET_BUILDING
  };
};
