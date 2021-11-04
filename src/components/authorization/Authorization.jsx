import React, { useState } from "react";
import Input from "../../utils/Input";
import { authorization } from "../../actions/user";
import { useDispatch } from "react-redux";

const Authorization = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  return (
    <div className="registration">
      <div className="registration__header">Авторизация</div>
      <Input
        value={email}
        type="text"
        placeholder="Enter email"
        setValue={setEmail}
      />
      <Input
        value={password}
        type="password"
        placeholder="Enter password"
        setValue={setPassword}
      />
      <button
        className="registration__btn"
        onClick={() => dispatch(authorization(email, password))}
      >
        Войти
      </button>
    </div>
  );
};

export default Authorization;
