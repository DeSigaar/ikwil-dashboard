import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../home/index";
import "../../scss/index.scss";
import { connect } from "react-redux";

import AddAdmin from "../auth/addAdmin";
import Login from "../auth/signIn";
import Nav from "../nav/index";
import AdminNav from "../nav/admin";

import Organisers from "../organisers/index";
import Organizer from "../organisers/organizer/organizer";
import OrganizerEdit from "../organisers/organizer/edit";
import OrganizerAdd from "../organisers/organizer/create";
import OrganizerAdmin from "../organisers/admin";

import News from "../news/index";
import NewsItem from "../news/newsItem/newsItem";
import NewsItemEdit from "../news/newsItem/edit";
import NewsItemAdd from "../news/newsItem/create";
import NewsAdmin from "../news/admin";

import Rules from "../rules/index";
import RuleAdd from "../rules/rule/create";
import Rule from "../rules/rule/rule";
import RuleEdit from "../rules/rule/edit";
import RuleAdmin from "../rules/admin";

import Activities from "../activities/index";
import Activity from "../activities/activity/activity";
import ActivityAdd from "../activities/activity/create";
import ActivityEdit from "../activities/activity/edit";
import ActivityAdmin from "../activities/admin";

import Admin from "../admin/index";

import Meals from "../meals/index";
import Meal from "../meals/meal/meal";
import MealAdd from "../meals/meal/create";
import MealEdit from "../meals/meal/edit";
import MealAdmin from "../meals/admin";
interface Props {
  loggedIn?: boolean;
}

const App: React.FC<Props> = ({ loggedIn }) => {
  return (
    <div>
      {loggedIn ? (
        <>
          <Route path="/admin">
            <Admin />
            {/* <AdminNav /> */}
          </Route>
          <Route path="/admin/meal/add" component={MealAdd} />
          <Route path="/admin/activity/add" component={ActivityAdd} />
          <Route path="/admin/rule/add" component={RuleAdd} />
          <Route path="/admin/organizer/add" component={OrganizerAdd} />
          <Route path="/admin/news/add" component={NewsItemAdd} />

          <Route
            path="/admin/activity/:id/edit"
            render={({ match }) => <ActivityEdit link={match} />}
          />
          <Route
            path="/admin/meal/:id/edit"
            render={({ match }) => <MealEdit link={match} />}
          />
          <Route
            path="/admin/organizer/:id/edit"
            render={({ match }) => <OrganizerEdit link={match} />}
          />
          <Route
            path="/admin/news/:id/edit"
            render={({ match }) => <NewsItemEdit link={match} />}
          />
          <Route
            path="/admin/rule/:id/edit"
            render={({ match }) => <RuleEdit link={match} />}
          />
          <Route path="/admin/add-admin">
            <AddAdmin />
          </Route>
          <Route exact path="/admin/meals" component={MealAdmin} />
          <Route exact path="/admin/activities" component={ActivityAdmin} />
          <Route exact path="/admin/news" component={NewsAdmin} />
          <Route exact path="/admin/organizer" component={OrganizerAdmin} />
          <Route exact path="/admin/rule" component={RuleAdmin} />
        </>
      ) : (
        <>
          <Route exact path="/login">
            <Login />
          </Route>
        </>
      )}
      {window.location.href.indexOf("/admin") < 0 ? <Nav /> : <AdminNav />}
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
