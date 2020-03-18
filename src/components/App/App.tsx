import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import "../../scss/index.scss";
import Activities from "../activities/index";
import Activity from "../activities/activity";

function App() {
  return (
    <div>
      <div>
        <Link to="/">To Homepage</Link>
        <span>|</span>
        <Link to="/about">About</Link>
      </div>
      <Switch>
        <Route exact path="/">
          <Activities />
        </Route>
        <Route exact path="/about">
          <h1>About</h1>
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
