import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";

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
          <h1>Homepage</h1>
        </Route>
        <Route exact path="/about">
          <h1>About</h1>
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
