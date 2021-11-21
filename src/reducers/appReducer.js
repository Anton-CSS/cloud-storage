const SHOW_LOADER = "SHOW_LOADER";
const HIDE_LOADER = "HIDE_LOADER";
const initialState = {
  loader: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SHOW_LOADER:
      return { loader: true };
    case HIDE_LOADER:
      return { loader: false };
    default:
      return state;
  }
}

export const showLoader = () => ({ type: SHOW_LOADER });
export const hideLoader = () => ({ type: HIDE_LOADER });
