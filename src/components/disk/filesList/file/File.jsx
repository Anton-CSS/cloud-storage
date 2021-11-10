import React from "react";
import "./file.scss";
import dirLogo from "../../../../assets/img/dir.svg";
import fileLogo from "../../../../assets/img/file.svg";
import { useDispatch, useSelector } from "react-redux";
import { PushToStack, SetCurrentDir } from "../../../../reducers/fileReducer";
const File = ({ file }) => {
  const { _id, name, size, date } = file;

  const { currentDir } = useSelector((state) => state.file);
  const dispatch = useDispatch();

  const openDirHandler = () => {
    dispatch(PushToStack(currentDir));
    dispatch(SetCurrentDir(_id));
  };

  return (
    <div
      className="file"
      onClick={file.type === "dir" ? () => openDirHandler() : null}
    >
      <img
        src={file.type === "dir" ? dirLogo : fileLogo}
        alt="icon"
        className="file__img"
      />
      <div className="file__name">{name}</div>
      <div className="file__date">{date.slice(0, 10)}</div>
      <div className="file__size">{size}</div>
    </div>
  );
};

export default File;
