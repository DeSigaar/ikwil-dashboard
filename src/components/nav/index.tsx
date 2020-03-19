import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

interface Props {
  loggedIn?: boolean;
}

const Nav: React.FC<Props> = ({ loggedIn }) => {
  return (
    <div>
      <Link to="/">To Homepage</Link>
      <span>|</span>
      <Link to="/about">About</Link>
      <span>|</span>

      {!loggedIn ? (
        <>
          <Link to="/login">Login</Link>
          <span>|</span>
          <Link to="/sign-up">sign up</Link>
        </>
      ) : (
        <>
          <span onClick={() => signOut()}>Logout</span>
          <span>|</span>
        </>
      )}
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
