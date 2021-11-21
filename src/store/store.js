import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { userReducer } from "../reducers/userReducer";
import { fileReducer } from "../reducers/fileReducer";
import { uploadReducer } from "../reducers/uploadReducer";
import appReducer from "../reducers/appReducer";

const rootReducers = combineReducers({
  user: userReducer,
  file: fileReducer,
  upload: uploadReducer,
  app: appReducer,
});

export const store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
