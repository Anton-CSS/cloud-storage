import React from "react";
import "./navBar.scss";
import Logo from "../../assets/img/nav-bar-logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActionLogout } from "../../reducers/userReducer";

const NavBar = () => {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    <div className="nav-bar">
      <div className="container">
        <img src={Logo} alt="logo" className="nav-bar__logo" />
        <div className="nav-bar__header">MERN CLOUD</div>
        {!isAuth && (
          <div className="nav-bar__login">
            <NavLink to={"./login"}>Войти</NavLink>
          </div>
        )}
        {!isAuth && (
          <div className="nav-bar__registration">
            <NavLink to={"./registration"}>Регистрация</NavLink>
          </div>
        )}
        {isAuth && (
          <div
            className="nav-bar__login logout"
            onClick={() => dispatch(setActionLogout())}
          >
            Выход
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
