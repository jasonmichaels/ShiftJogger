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
        logs: [action.payload, ...state.logs],
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
      return {
        ...state,
        log: action.payload
      };
    default:
      return state;
  }
};
