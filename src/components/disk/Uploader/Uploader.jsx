import React from "react";
import "./uploader.scss";
import UploadFile from "./uploadFile/UploadFile";
import { useDispatch, useSelector } from "react-redux";
import { hideUploader } from "../../../reducers/uploadReducer";

const Uploader = () => {
  const { isVisible, files } = useSelector((state) => state.upload);
  const dispatch = useDispatch();
  return (
    isVisible && (
      <div className="uploader">
        <div className="uploader__header">
          <div className="uploader__title">Загрузки</div>
          <button
            className="uploader__btn"
            onClick={() => dispatch(hideUploader())}
          >
            Х
          </button>
        </div>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  );
};

export default Uploader;
