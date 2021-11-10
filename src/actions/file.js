import axios from "axios";
import { AddFile, SetFiles } from "../reducers/fileReducer";

export default function getFiles(dirId) {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/files${dirId ? "?parent=" + dirId : ""}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(SetFiles(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}

export function createDir(dirId, name) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/files`,
        {
          name,
          parent: dirId,
          type: "dir",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(AddFile(response.data));
    } catch (e) {
      alert(e.response.data.message);
    }
  };
}
