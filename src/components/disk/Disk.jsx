import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getFiles, { uploadFile } from "../../actions/file";
import "./disk.scss";
import FileList from "./filesList/FileList";
import Popup from "./Popup/Popup";
import { SetCurrentDir, SetPopup } from "../../reducers/fileReducer";
import Uploader from "./Uploader/Uploader";

const Disk = () => {
  const dispatch = useDispatch();
  const { currentDir, dirStack } = useSelector((state) => state.file);
  const [dragEnter, setDragEnter] = useState(false);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir]);

  const backClickHandler = () => {
    const backDirId = dirStack.pop();
    dispatch(SetCurrentDir(backDirId));
  };

  const fileUploadHandler = (event) => {
    const files = [...event.target.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
  };

  const DragEnterHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  };
  const DragLeaveHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(false);
  };
  const DragOverHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setDragEnter(true);
  };

  const onDropHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    let files = [...event.dataTransfer.files];
    files.forEach((file) => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  };
  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={(event) => DragEnterHandler(event)}
      onDragLeave={(event) => DragLeaveHandler(event)}
      onDragOver={(event) => DragOverHandler(event)}
    >
      <div className="disk__btns">
        <button className="disk__back" onClick={backClickHandler}></button>
        <button className="disk__create" onClick={() => dispatch(SetPopup())}>
          Создать новую папку
        </button>
        <div className="disk__upload">
          <label htmlFor="disk__file" className="disk__label">
            Загрузить файл
          </label>
          <input
            type="file"
            className="disk__file"
            id="disk__file"
            onChange={(event) => fileUploadHandler(event)}
            multiple={true}
          />
        </div>
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDragEnter={(event) => DragEnterHandler(event)}
      onDragLeave={(event) => DragLeaveHandler(event)}
      onDragOver={(event) => DragOverHandler(event)}
      onDrop={onDropHandler}
    >
      Перетащите файл сюда
    </div>
  );
};

export default Disk;
