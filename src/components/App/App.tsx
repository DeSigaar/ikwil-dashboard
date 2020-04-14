import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "../home/index";
import "../../scss/index.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import AddAdmin from "../auth/addAdmin";
import Login from "../auth/signIn";
import Nav from "../nav/index";
import AdminNav from "../nav/admin";

import OrganizerEdit from "../organisers/organizer/edit";
import OrganizerAdd from "../organisers/organizer/create";
import OrganizerAdmin from "../organisers/admin";

import NewsItemEdit from "../news/newsItem/edit";
import NewsItemAdd from "../news/newsItem/create";
import NewsAdmin from "../news/admin";

import RuleAdd from "../rules/rule/create";
import RuleEdit from "../rules/rule/edit";
import RuleAdmin from "../rules/admin";

import ActivityAdd from "../activities/activity/create";
import ActivityEdit from "../activities/activity/edit";
import ActivityAdmin from "../activities/admin";

import Admin from "../admin/index";

import MealAdd from "../meals/meal/create";
import MealEdit from "../meals/meal/edit";
import MealAdmin from "../meals/admin";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

library.add(faChevronLeft, faChevronRight);
interface Props {
  loggedIn?: boolean;
}

const App: React.FC<Props> = ({ loggedIn }) => {
  return (
    <div>
      <Route exact path="/loggingyouin">
        Logging you in
      </Route>
      {loggedIn ? (
        <>
          <Route path="/admin/meal/add" component={MealAdd} />
          <Route path="/admin/activity/add" component={ActivityAdd} />
          <Route path="/admin/rule/add" component={RuleAdd} />
          <Route path="/admin/organizer/add" component={OrganizerAdd} />
          <Route path="/admin/newsitem/add" component={NewsItemAdd} />

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
            path="/admin/newsitem/:id/edit"
            render={({ match }) => <NewsItemEdit link={match} />}
          />
          <Route
            path="/admin/rule/:id/edit"
            render={({ match }) => <RuleEdit link={match} />}
          ></Route>
          <Route path="/admin/add-admin">
            <AddAdmin />
          </Route>
          <Route exact path="/admin/meals" component={MealAdmin} />
          <Route exact path="/admin/activities" component={ActivityAdmin} />
          <Route exact path="/admin/news" component={NewsAdmin} />
          <Route exact path="/admin/organisers" component={OrganizerAdmin} />
          <Route exact path="/admin/rules" component={RuleAdmin} />
          <Route exact path="/admin">
            <Admin />
          </Route>
          <Redirect to="/admin" />
        </>
      ) : (
        <>
          <Route exact path="/admin/login">
            <Login />
          </Route>

          <Redirect to="/" />
        </>
      )}
      {window.location.href.indexOf("/admin") < 0 ? <Nav /> : <AdminNav />}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  if (!state.firebase.profile.isEmpty) {
    if (state.firebase.profile.admin) {
      return { loggedIn: true };
    } else {
      return { loggedIn: false };
    }
  }
};
export default withRouter(connect(mapStateToProps)(App));
