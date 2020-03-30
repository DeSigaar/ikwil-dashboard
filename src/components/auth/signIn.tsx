import React, { useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";

interface Props {
  authError?: any;
  signIn: any;
}

const SignIn: React.FC<Props> = ({ authError }) => {
  const [email, setEmail] = useState<string>("test@test.nl");
  const [password, setPassword] = useState<string>("testtest");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn({ email, password });
  };
  return (
    <div className="s-login">
      <img
        src="/logo.svg"
        alt="Stichting Ik Wil Logo"
        className="s-login__logo"
      />
      <form onSubmit={e => handleSubmit(e)}>
        <div className="o-inputfield">
          <label className="o-inputfield__label">Emailadres</label>
          <input
            className="o-inputfield__input login"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="o-inputfield">
          <label className="o-inputfield__label">Wachtwoord</label>
          <input
            className="o-inputfield__input login"
            required
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <button>Login</button>
        {typeof authError !== "undefined" && authError !== null
          ? authError.message
          : null}
      </form>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return { authError: state.auth.authError };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    signIn: (user: iLogin) => dispatch(signIn(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
