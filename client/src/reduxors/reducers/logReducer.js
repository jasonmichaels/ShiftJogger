import { actionTypes } from "../types";

const initialState = {
  logs: [],
  log: {},
  activeId: "",
  building: false
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
        logs: action.payload,
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
        logs: action.payload.logs,
        log: {}
      };
    case actionTypes.SEND_LOG:
      return {
        ...state,
        logs: action.payload,
        building: false
      };
    case actionTypes.GO_BACK:
      return {
        ...state,
        log: {}
      };
    case actionTypes.SET_ACTIVE_ID:
      return {
        ...state,
        activeId: action.payload
      };
    case actionTypes.SEARCH_LOGS:
      return {
        ...state,
        logs: action.payload
      };
    case actionTypes.SET_BUILDING:
      return {
        ...state,
        building: true
      };
    default:
      return state;
  }
};
