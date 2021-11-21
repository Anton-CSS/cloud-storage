import React, { useState } from "react";
import "./navBar.scss";
import Logo from "../../assets/img/nav-bar-logo.svg";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setActionLogout } from "../../reducers/userReducer";
import getFiles, { searchFile } from "../../actions/file";
import { showLoader } from "../../reducers/appReducer";
import avatarLogo from "../../assets/img/avatar.svg";

const NavBar = () => {
  const { isAuth } = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);
  const { currentDir } = useSelector((state) => state.file);
  const avatar = currentUser?.avatar
    ? `http://localhost:4000/${currentUser.avatar}`
    : avatarLogo;
  console.log(currentUser);
  const searchHandler = (e) => {
    setSearch(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value !== "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            dispatch(searchFile(value));
          },
          500,
          e.target.value
        )
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  };

  return (
    <div className="nav-bar">
      <div className="container">
        <img src={Logo} alt="logo" className="nav-bar__logo" />
        <div className="nav-bar__header">MERN CLOUD</div>
        {isAuth && (
          <input
            type="text"
            value={search}
            placeholder="Введите название файла..."
            className="nav-bar__search"
            onChange={(e) => searchHandler(e)}
          />
        )}
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
        {isAuth && (
          <NavLink to={"/profile"}>
            <img src={avatar} alt="foto" className="nav-bar__avatar" />
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default NavBar;
