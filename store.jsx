import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const initialState = {
  drafts: [],
  sent: [],
  user: null,
  isLoggedIn: false,
  fileToEdit: []
};

const actionTypes = {
  SAVE: "SAVE",
  GET_DRAFTS: "GET_DRAFTS",
  ON_EDIT: "ON_EDIT"
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE:
      return { ...state, drafts: [...state.drafts, action.payload] };
    case actionTypes.GET_DRAFTS:
      return state;
    case actionTypes.ON_EDIT:
      const { drafts } = state;
      const theFileToEdit = drafts.filter(log => {
        log.logId === action.payload.draft.logId;
      });
      return { fileToEdit: theFileToEdit };
    default:
      return state;
  }
};

// ACTIONS
export const saveDraft = payload => dispatch => {
  return dispatch({ type: actionTypes.SAVE, payload });
};

export const fetchDrafts = dispatch => {
  return dispatch({
    type: actionTypes.GET_DRAFTS
  });
};

export const editFile = payload => dispatch => {
  return dispatch({ type: actionTypes.ON_EDIT, payload });
};

export function initializeStore(initialState = initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
