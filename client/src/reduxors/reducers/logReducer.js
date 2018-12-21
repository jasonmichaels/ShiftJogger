import { actionTypes } from "../types";

const initialState = {
  logs: [],
  log: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LOGS:
      return {
        ...state,
        logs: action.payload
      };
    case actionTypes.ADD_LOG:
      return {
        ...state,
        logs: [...action.payload],
        log: {}
      };
    case actionTypes.DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter(log => log._id !== action.payload),
        log: {}
      };
    case actionTypes.GET_LOG:
      return {
        ...state,
        log: action.payload
      };
    case actionTypes.EDIT_LOG:
      console.log(action.payload);
      return {
        ...state,
        logs: action.payload.logs,
        log: {}
      };
    case actionTypes.SEND_LOG:
      return {
        ...state,
        logs: action.payload
      };
    case actionTypes.GO_BACK:
      return {
        ...state,
        log: {}
      };
    default:
      return state;
  }
};
