import React from "react";
import "./file.scss";
import dirLogo from "../../../../assets/img/dir.svg";
import fileLogo from "../../../../assets/img/file.svg";
import { useDispatch, useSelector } from "react-redux";
import { PushToStack, SetCurrentDir } from "../../../../reducers/fileReducer";
import { deleteFile, downloadFile } from "../../../../actions/file";

const File = ({ file }) => {
  const { _id, name, size, date } = file;

  const { currentDir } = useSelector((state) => state.file);
  const dispatch = useDispatch();

  const openDirHandler = (file) => {
    if (file.type === "dir") {
      dispatch(PushToStack(currentDir));
      dispatch(SetCurrentDir(_id));
    }
  };

  const downloadClickHandler = (event) => {
    event.stopPropagation();
    downloadFile(file);
  };
  const deleteClickHandler = (e) => {
    e.stopPropagation();
    dispatch(deleteFile(file));
  };

  return (
    <div className="file" onClick={() => openDirHandler(file)}>
      <img
        src={file.type === "dir" ? dirLogo : fileLogo}
        alt="icon"
        className="file__img"
      />
      <div className="file__name">{name}</div>
      <div className="file__date">{date.slice(0, 10)}</div>
      <div className="file__size">{size}</div>
      {file.type === "dir" ? null : (
        <button
          className="file__btn download"
          onClick={(e) => downloadClickHandler(e)}
        ></button>
      )}
      <button
        className="file__btn delete"
        onClick={(event) => deleteClickHandler(event)}
      ></button>
    </div>
  );
};

export default File;
