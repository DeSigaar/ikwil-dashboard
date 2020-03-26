import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

interface Props {
  loggedIn?: boolean;
}

const Nav: React.FC<Props> = ({ loggedIn }) => {
  return (
    <div className="s-nav">
      <Link to="/">
        <img src="/logo.svg" alt="Stichting Ik Wil Logo" className="c-logo" />
      </Link>
      <nav className="c-nav">
        <ul>
          <li>
            <Link to="#meal">Maaltijd van de dag</Link>
          </li>
          <li>
            <Link to="#news">Nieuws</Link>
          </li>
          <li>
            <Link to="#activities">Activiteiten</Link>
          </li>
          <li>
            <Link to="#organisers">Coördinatoren</Link>
          </li>
          <li>
            <Link to="#rules">Huisregelementen</Link>
          </li>
          {!loggedIn ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/sign-up">sign up</Link>
              </li>
            </>
          ) : (
            <>{/* <span onClick={() => signOut()}>Logout</span> */}</>
          )}
        </ul>
      </nav>
      <div></div>
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    signOut: () => dispatch(signOut())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Nav);
