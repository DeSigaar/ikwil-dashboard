import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "../../scss/index.scss";
import Activities from "../activities/index";
import Activity from "../activity/activity";
import Login from "../auth/signIn";
import Nav from "../nav/index";
import { connect } from "react-redux";
import SignUp from "../auth/signUp";
import ActivityEdit from "../activity/edit";
interface Props {
  loggedIn?: boolean;
}

const App: React.FC<Props> = ({ loggedIn }) => {
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
        <Route
          exact
          path="/activity/:id"
          render={({ match }) => <Activity link={match} />}
        />

        {loggedIn ? (
          <Route
            exact
            path="/activity/:id/edit"
            render={({ match }) => <ActivityEdit link={match} />}
          />
        ) : (
          <>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/sign-up">
              <SignUp />
            </Route>
          </>
        )}

        <Redirect to="/" />
      </Switch>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  if (state.firebase.auth.isEmpty === false) {
    return { loggedIn: true };
  } else {
    return { loggedIn: false };
  }
};
export default connect(mapStateToProps)(App);
