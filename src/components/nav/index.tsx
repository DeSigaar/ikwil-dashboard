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
      <img src="/logo.svg" alt="Stichting Ik Wil Logo" className="c-logo" />
      <nav className="c-nav">
        <ul>
          <li><Link to="/">To Homepage</Link></li>
          <li><Link to="/organizer">Organizer</Link></li>
          <li><Link to="/news">News</Link></li>
        {!loggedIn ? (
          <>
             <li><Link to="/login">Login</Link></li>
             <li><Link to="/sign-up">sign up</Link></li>
          </>
        ) : (
          <>
            {/* <span onClick={() => signOut()}>Logout</span> */}
            {/* <span>|</span> */}
        </>
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
