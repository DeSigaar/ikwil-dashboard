import React, { useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";

interface Props {
  authError?: string;
  signIn: any;
}

const Login: React.FC<Props> = ({ authError }) => {
  const [email, setEmail] = useState<string>("test@test.nl");
  const [password, setPassword] = useState<string>("testtest");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signIn({ email, password });
  };
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <h2>Login</h2>
      <div>
        email
        <input
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        password
        <input
          required
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button>Submit</button>
      {typeof authError !== "undefined" ? authError : null}
    </form>
  );
};
const mapStateToProps = (state: any) => {
  if (state.auth.authError !== null) {
    return { authError: state.auth.authError.message };
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    signIn: (credentionals: any) => dispatch(signIn)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
