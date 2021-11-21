const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";

const initialState = {
  currentUser: {},
  isAuth: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { currentUser: action.payload, isAuth: true };
    case LOGOUT:
      localStorage.removeItem("token");
      return { currentUser: {}, isAuth: false };
    default:
      return state;
  }
};

export const setActionUsers = (user) => ({ type: SET_USER, payload: user });
export const setActionLogout = () => ({ type: LOGOUT });
