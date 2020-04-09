import React from "react";
import { Link, Redirect } from "react-router-dom"; // eslint-disable-line @typescript-eslint/no-unused-vars
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

interface Props {
  loggedIn?: boolean;
}

const AdminNav: React.FC<Props> = ({ loggedIn }) => {
  return (
    <div className="s-nav admin">
      <Link to="/">
        <img src="/logo.svg" alt="Stichting Ik Wil Logo" className="c-logo" />
      </Link>
      <nav className="c-nav">
        <ul>
          {!loggedIn ? (
            <div></div>
          ) : (
            <>
              <li>
                <Link to="/admin/meals">Maaltijd van de dag</Link>
              </li>
              <li>
                <Link to="/admin/news">Nieuws</Link>
              </li>
              <li>
                <Link to="/admin/activities">Activiteiten</Link>
              </li>
              <li>
                <Link to="/admin/organisers">Coördinatoren</Link>
              </li>
              <li>
                <Link to="/admin/rules">Huisregelementen</Link>
              </li>
              <li>
                <Link to="/admin/add-admin">Voeg administrator toe</Link>
              </li>
              <li>
                <Link to="/admin/login" onClick={() => signOut()}>
                  Logout
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div></div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  let loggedIn = false;
  if (!state.firebase.profile.isEmpty) {
    if (state.firebase.profile.admin) {
      loggedIn = true;
    }
  }
  return { authError: state.auth.authError, loggedIn };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AdminNav);
