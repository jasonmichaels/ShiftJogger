import { actionTypes } from "../types";

const initialState = {
  logs: [],
  log: {},
  loading: false,
  editing: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOG_LOADING:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_LOGS:
      return {
        ...state,
        logs: action.payload
      };
    case actionTypes.ADD_LOG:
      return {
        ...state,
        logs: [action.payload, ...state.logs],
        log: {}
      };
    case actionTypes.DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log._id !== action.payload)
      };
    case actionTypes.GET_LOG:
      return {
        ...state,
        log: action.payload,
        loading: false
      };
    case actionTypes.EDIT_LOG:
      return {
        ...state,
        log: action.payload,
        editing: true
      };
    default:
      return state;
  }
};
