import React from "react";
import { useDispatch } from "react-redux";
import { removeFileUploader } from "../../../../reducers/uploadReducer";

const UploadFile = ({ file }) => {
  const dispatch = useDispatch();
  const { id, name, progress } = file;
  console.log(file);
  return (
    <div className="upload-file">
      <div className="upload-file__header">
        <div className="upload-file__name">{name}</div>
        <button
          className="upload-file__delete"
          onClick={() => dispatch(removeFileUploader(id))}
        >
          X
        </button>
      </div>
      <div className="upload-file__progress-bar">
        <div
          className="upload-file__upload-bar"
          style={{ width: progress + "%" }}
        ></div>
        <div className="upload-file__percent">{progress}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
