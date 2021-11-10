import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getFiles from "../../actions/file";
import "./disk.scss";
import FileList from "./filesList/FileList";
import Popup from "./Popup/Popup";
import { SetCurrentDir, SetPopup } from "../../reducers/fileReducer";

const Disk = () => {
  const dispatch = useDispatch();
  const { currentDir, dirStack } = useSelector((state) => state.file);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  const backClickHandler = () => {
    const backDirId = dirStack.pop();
    dispatch(SetCurrentDir(backDirId));
  };

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back" onClick={backClickHandler}>
          Назад
        </button>
        <button className="disk__create" onClick={() => dispatch(SetPopup())}>
          Создать новую папку
        </button>
      </div>
      <FileList />
      <Popup />
    </div>
  );
};

export default Disk;
