import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "../../scss/index.scss";
import { connect } from "react-redux";

import Home from "../home/index";

import AddAdmin from "../auth/addAdmin";
import Login from "../auth/signIn";
import Nav from "../nav/index";

import Organisers from "../organisers/index";
import Organizer from "../organisers/organizer/organizer";
import OrganizerEdit from "../organisers/organizer/edit";
import OrganizerAdd from "../organisers/organizer/create";

import News from "../news/index";
import NewsItem from "../news/newsItem/newsItem";
import NewsItemEdit from "../news/newsItem/edit";
import NewsItemAdd from "../news/newsItem/create";

import Rules from "../rules/index";
import RuleAdd from "../rules/rule/create";
import Rule from "../rules/rule/rule";
import RuleEdit from "../rules/rule/edit";

import Activities from "../activities/index";
import Activity from "../activities/activity/activity";
import ActivityAdd from "../activities/activity/create";
import ActivityEdit from "../activities/activity/edit";

import Meals from "../meals/index";
import Meal from "../meals/meal/meal";
import MealAdd from "../meals/meal/create";
import MealEdit from "../meals/meal/edit";
import MealSetActive from "../meals/set-active";
interface Props {
  loggedIn?: boolean;
}

const App: React.FC<Props> = ({ loggedIn }) => {
  return (
    <div>
      {loggedIn ? (
        <>
          <Route path="/meal/add" component={MealAdd} />
          <Route exact path="/active-meals" component={MealSetActive} />
          <Route path="/activity/add" component={ActivityAdd} />
          <Route path="/rule/add" component={RuleAdd} />
          <Route path="/organizer/add" component={OrganizerAdd} />
          <Route path="/news/add" component={NewsItemAdd} />
          <Route
            path="/activity/:id/edit"
            render={({ match }) => <ActivityEdit link={match} />}
          />
          <Route
            path="/meal/:id/edit"
            render={({ match }) => <MealEdit link={match} />}
          />
          <Route
            path="/organizer/:id/edit"
            render={({ match }) => <OrganizerEdit link={match} />}
          />
          <Route
            path="/news/:id/edit"
            render={({ match }) => <NewsItemEdit link={match} />}
          />
          <Route
            path="/rule/:id/edit"
            render={({ match }) => <RuleEdit link={match} />}
          />
          <Route path="/add-admin">
            <AddAdmin />
          </Route>
        </>
      ) : (
        <>
          <Route exact path="/login">
            <Login />
          </Route>
        </>
      )}
      <Nav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/activity">
          <Activities />
        </Route>
        <Route exact path="/meal">
          <Meals />
        </Route>

        <Route exact path="/organizer">
          <Organisers />
        </Route>
        <Route exact path="/news">
          <News />
        </Route>
        <Route exact path="/rule">
          <Rules />
        </Route>
        <Route
          exact
          path="/organizer/:id"
          render={({ match }) => <Organizer link={match} />}
        />
        <Route
          exact
          path="/meal/:id"
          render={({ match }) => <Meal link={match} />}
        />
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
        <Route
          exact
          path="/rule/:id"
          render={({ match }) => <Rule link={match} />}
        />
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
