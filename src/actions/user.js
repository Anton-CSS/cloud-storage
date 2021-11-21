import axios from "axios";
import { setActionUsers } from "../reducers/userReducer";

export const registration = async (email, password) => {
  try {
    const response = await axios.post(
      `http://localhost:4000/api/auth/registration`,
      {
        email,
        password,
      }
    );
    console.log(response.data.message);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const authorization = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`http://localhost:4000/api/auth/login`, {
      email,
      password,
    });
    console.log(response.data.user);
    dispatch(setActionUsers(response.data.user));
    localStorage.setItem("token", response.data.token);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const auth = () => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/auth/auth`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    dispatch(setActionUsers(response.data.user));
    localStorage.setItem("token", response.data.token);
  } catch (e) {
    alert(e.response.data.message);
    localStorage.removeItem("token");
  }
};

export const uploadAvatar = (file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      `http://localhost:4000/api/files/avatar`,
      formData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    dispatch(setActionUsers(response.data));
  } catch (e) {
    alert(e);
  }
};

export const deleteAvatar = () => async (dispatch) => {
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/files/avatar`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    dispatch(setActionUsers(response.data));
  } catch (e) {
    alert(e);
  }
};
