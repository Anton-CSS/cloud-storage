import React from "react";
import "./navBar.scss";
import Logo from "../../assets/img/nav-bar-logo.svg";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="nav-bar">
      <div className="container">
        <img src={Logo} alt="logo" className="nav-bar__logo" />
        <div className="nav-bar__header">MERN CLOUD</div>
        <div className="nav-bar__login">
          <NavLink to={"./login"}>Войти</NavLink>
        </div>
        <div className="nav-bar__registration">
          <NavLink to={"./registration"}>Регистрация</NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
