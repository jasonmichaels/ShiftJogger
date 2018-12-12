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
  ON_EDIT: "ON_EDIT",
  DELETE_LOG: "DELETE_LOG",
  GO_BACK: "GO_BACK"
};

// REDUCERS
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE:
      const oldDrafts = [...state.drafts];
      if (
        oldDrafts === [] ||
        oldDrafts
          .map(elem => {
            return elem.logId;
          })
          .indexOf(action.payload.logId) === -1
      ) {
        return {
          fileToEdit: {},
          drafts: [...state.drafts, action.payload],
          editing: false
        };
      } else {
        const pos = oldDrafts
          .map(elem => {
            console.log(elem.logId);
            return elem.logId;
          })
          .indexOf(action.payload.logId);

        oldDrafts.splice(pos, 1);
        oldDrafts.push(action.payload);
        return {
          fileToEdit: {},
          drafts: oldDrafts,
          editing: false
        };
      }

    case actionTypes.GET_DRAFTS:
      return state.drafts;
    case actionTypes.ON_EDIT:
      const drafts = [...state.drafts];
      let theFileToEdit;
      drafts.forEach(log => {
        log.logId === action.payload.draft.logId ? (theFileToEdit = log) : null;
      });
      return {
        ...state,
        editing: true,
        fileToEdit: theFileToEdit
      };
    case actionTypes.DELETE_LOG:
      const updatedDrafts = [...state.drafts];
      if (updatedDrafts.length === 0) return;
      const pos = updatedDrafts
        .map(elem => {
          return elem.logId;
        })
        .indexOf(action.payload.logId);
      updatedDrafts.splice(pos, 1);
      return {
        ...state,
        drafts: updatedDrafts
      };

    case actionTypes.GO_BACK:
      return {
        ...state,
        fileToEdit: {},
        editing: false
      };
    default:
      return state;
  }
};

// ACTIONS
export const saveDraft = payload => dispatch => {
  return dispatch({ type: actionTypes.SAVE, payload });
};

export const fetchDrafts = () => dispatch => {
  return dispatch({
    type: actionTypes.GET_DRAFTS
  });
};

export const editFile = payload => dispatch => {
  return dispatch({ type: actionTypes.ON_EDIT, payload });
};

export const deleteLog = payload => dispatch => {
  return dispatch({ type: actionTypes.DELETE_LOG, payload });
};

export const goBack = () => dispatch => {
  return dispatch({
    type: actionTypes.GO_BACK
  });
};

export function initializeStore(initialState = initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
