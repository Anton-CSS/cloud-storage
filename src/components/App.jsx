import React from "react";
import NavBar from "./NavBar/NavBar";
import "./app.scss";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Registration from "./registration/Registration";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <NavBar />
      </div>
      <Switch>
        <Route path="/registration" component={Registration} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
