import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/index";
import Activities from "../activities/index";
import Activity from "../activities/activity/activity";
import Login from "../auth/signIn";
import Nav from "../nav/index";
import { connect } from "react-redux";
import SignUp from "../auth/signUp";
import ActivityEdit from "../activities/activity/edit";
import Organisers from "../organisers/index";
import Organizer from "../organisers/organizer/organizer";
import OrganizerEdit from "../organisers/organizer/edit";
import News from "../news/index";
import NewsItem from "../news/newsItem/newsItem";
import NewsItemEdit from "../news/newsItem/edit";

import "../../scss/index.scss";
interface Props {
  loggedIn?: boolean;
}

const App: React.FC<Props> = ({ loggedIn }) => {
  return (
    <div>
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/activities">
          <Activities />
        </Route>
        <Route exact path="/about">
          <h1>About</h1>
        </Route>
        <Route exact path="/organizer">
          <Organisers />
        </Route>
        <Route
          exact
          path="/organizer/:id"
          render={({ match }) => <Organizer link={match} />}
        />
        <Route exact path="/news">
          <News />
        </Route>
        <Route
          exact
          path="/news/:id"
          render={({ match }) => <NewsItem link={match} />}
        />
        <Route
          exact
          path="/activity/:id"
          render={({ match }) => <Activity link={match} />}
        />

        {loggedIn ? (
          <>
            <Route
              exact
              path="/activity/:id/edit"
              render={({ match }) => <ActivityEdit link={match} />}
            />
            <Route
              exact
              path="/organizer/:id/edit"
              render={({ match }) => <OrganizerEdit link={match} />}
            />
            <Route
              exact
              path="/news/:id/edit"
              render={({ match }) => <NewsItemEdit link={match} />}
            />
          </>
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
