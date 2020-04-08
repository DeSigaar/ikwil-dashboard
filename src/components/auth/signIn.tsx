import React, { useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";
interface Props {
  authError?: any;
  signIn: any;
  loggedIn?: boolean;
}

const SignIn: React.FC<Props> = ({ authError, loggedIn }) => {
  const [email, setEmail] = useState<string>("test@test.nl");
  const [password, setPassword] = useState<string>("testtest");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [notValid, setNotValid] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn({ email, password });
    if (loggedIn) {
      setRedirect(true);
    } else {
      setTimeout(() => {
        setNotValid("Geen geldig account");
      }, 1000);
    }
  };
  if (!redirect) {
    return (
      <div className="s-login">
        <img
          src="/logo.svg"
          alt="Stichting Ik Wil Logo"
          className="s-login__logo"
        />
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="o-inputfield">
            <label>Emailadres</label>
            <input
              className="o-inputfield__input login"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="o-inputfield">
            <label>Wachtwoord</label>
            <input
              className="o-inputfield__input login"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {notValid}
          <button>Login</button>
          {typeof authError !== "undefined" && authError !== null
            ? authError.message
            : null}
        </form>
      </div>
    );
  } else {
    return <Redirect to={"/admin"} />;
  }
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
    signIn: (user: iLogin) => dispatch(signIn(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
