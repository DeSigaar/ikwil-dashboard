import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "../../scss/index.scss";
import Activities from "../activities/index";
import Activity from "../activities/activity";
import Login from "../login/index";
import Nav from "../nav/index";
function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Activities />
        </Route>
        <Route exact path="/about">
          <h1>About</h1>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route
          exact
          path="/activity/:id"
          render={({ match }) => <Activity link={match} />}
        />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
