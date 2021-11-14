import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer } from "../reducers/userReducer";
import { fileReducer } from "../reducers/fileReducer";
import { uploadReducer } from "../reducers/uploadReducer";

const rootReducers = combineReducers({
  user: userReducer,
  file: fileReducer,
  upload: uploadReducer,
});

export const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
