const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

const initialState = {
  currentUser: {},
  isAuth: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, currentUser: action.payload.user, isAuth: true };
    case LOGOUT:
      localStorage.removeItem("token");
      return { ...state, currentUser: {}, isAuth: false };
    default:
      return state;
  }
};

export const setActionUsers = (user) => ({ type: SET_USER, payload: user });
export const setActionLogout = () => ({ type: LOGOUT });
