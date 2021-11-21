import React, { useEffect } from "react";
import NavBar from "./NavBar/NavBar";
import "./app.scss";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Registration from "./registration/Registration";
import Authorization from "./authorization/Authorization";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";
import Profile from "./Profile/Profile";

const App = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) dispatch(auth());
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
      </div>
      {!isAuth ? (
        <Switch>
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Authorization} />
          <Redirect to={"/login"} />
        </Switch>
      ) : (
        <Switch>
          <Route path="/" component={Disk} exact />
          <Route path="/profile" component={Profile} exact />
          <Redirect to={"/"} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default App;
