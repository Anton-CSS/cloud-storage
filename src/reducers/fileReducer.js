const SET_FILES = "SET_FILES";
const SET_CURRENT_DIR = "SET_CURRENT_DIR";
const ADD_DIR = "ADD_DIR";
const SET_POPUP = "SET_POPUP";
const SET_PUSH_STACK = "SET_PUSH_STACK";
const SET_FROM_STACK = "SET_FROM_STACK";
const DELETE_FILE = "DELETE_FILE";

const initialState = {
  files: [],
  currentDir: null,
  popup: false,
  dirStack: [],
};

export const fileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILES:
      return { ...state, files: action.payload };
    case SET_CURRENT_DIR:
      return { ...state, currentDir: action.payload };
    case SET_POPUP:
      return { ...state, popup: !state.popup };
    case ADD_DIR:
      return { ...state, files: [...state.files, action.payload] };
    case SET_PUSH_STACK:
      return { ...state, dirStack: [...state.dirStack, action.payload] };
    case SET_FROM_STACK:
      return { ...state, files: [...state.files, action.payload] };
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((item) => item._id !== action.payload)],
      };
    default:
      return state;
  }
};

export const SetFiles = (files) => ({ type: SET_FILES, payload: files });
export const SetCurrentDir = (dir) => ({ type: SET_CURRENT_DIR, payload: dir });
export const AddFile = (file) => ({ type: ADD_DIR, payload: file });
export const SetPopup = () => ({ type: SET_POPUP });
export const PushToStack = (dir) => ({ type: SET_PUSH_STACK, payload: dir });
export const DeleteFileAction = (id) => ({ type: DELETE_FILE, payload: id });
