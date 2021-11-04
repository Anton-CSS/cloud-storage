import React from "react";
import "./input.scss";

const Input = ({ type, placeholder, value, setValue }) => {
  return (
    <input
      value={value}
      type={type}
      placeholder={placeholder}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Input;
