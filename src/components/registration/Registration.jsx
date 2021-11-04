import React, { useState } from "react";
import Input from "../../utils/Input";
import "./registration.scss";
import { registration } from "../../actions/user";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="registration">
      <div className="registration__header">Регистрация</div>
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
        onClick={() => registration(email, password)}
      >
        Войти
      </button>
    </div>
  );
};

export default Registration;
