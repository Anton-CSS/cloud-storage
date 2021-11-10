import React, { useState } from "react";
import Input from "../../../utils/Input";
import "./popup.scss";
import { useDispatch, useSelector } from "react-redux";
import { SetPopup } from "../../../reducers/fileReducer";
import { createDir } from "../../../actions/file";

const Popup = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const popup = useSelector((state) => state.file.popup);
  const currentDir = useSelector((state) => state.file.currentDir);
  const createHandler = () => {
    dispatch(createDir(currentDir, value));
    dispatch(SetPopup());
    setValue("");
  };
  return (
    popup && (
      <div className="popup" onClick={() => dispatch(SetPopup())}>
        <div
          className="popup__content"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="popup__header">
            <div className="popup__title">Создать новую папку</div>
            <button
              className="popup__close"
              onClick={() => dispatch(SetPopup())}
            >
              X
            </button>
          </div>
          <Input
            type="text"
            value={value}
            placeholder="Введите название папки ..."
            setValue={setValue}
          />
          <button className="popup__create" onClick={() => createHandler()}>
            Создать
          </button>
        </div>
      </div>
    )
  );
};

export default Popup;
