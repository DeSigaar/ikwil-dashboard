import React, { useState } from "react";
import { signUp } from "../../store/actions/authActions";
import { connect } from "react-redux";

interface Props {
  authError?: any;
  signUp: any;
}

const AddUser: React.FC<Props> = ({ signUp, authError }) => {
  const [email, setEmail] = useState<string>("testerino@gmail.com");
  const [firstName, setFirstName] = useState<string>("Tester");
  const [lastName, setLastName] = useState<string>("ino");
  const [password, setPassword] = useState<string>("testtest");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({ email, firstName, lastName, password });
  };
  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div>
        Email <input value={email} onChange={e => setEmail(e.target.value)} />
      </div>
      <div>
        First name
        <input value={firstName} onChange={e => setFirstName(e.target.value)} />
      </div>
      <div>
        Last name
        <input value={lastName} onChange={e => setLastName(e.target.value)} />
      </div>
      <div>
        Password name
        <input value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button>Submit</button>
      {typeof authError !== "undefined" && authError !== null
        ? authError.message
        : null}
    </form>
  );
};

const mapStateToProps = (state: any) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    signUp: (newUser: iNewUser) => dispatch(signUp(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
