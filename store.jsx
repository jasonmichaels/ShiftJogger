import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const initialState = {
  drafts: [],
  sent: [],
  user: null,
  isLoggedIn: false,
  fileToEdit: {},
  editing: false
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
      return {
        fileToEdit: {},
        drafts: [...state.drafts, action.payload],
        editing: false
      };
    case actionTypes.GET_DRAFTS:
      return state.drafts;
    case actionTypes.ON_EDIT:
      const { drafts } = state;
      state.fileToEdit = {};
      let theFileToEdit;
      drafts.forEach(log => {
        log.logId === action.payload.draft.logId ? (theFileToEdit = log) : null;
      });
      console.log(theFileToEdit);
      return {
        ...state,
        editing: true,
        fileToEdit: theFileToEdit
      };
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
