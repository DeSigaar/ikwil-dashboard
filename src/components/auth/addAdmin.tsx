import React, { useState } from "react";
import { addAdmin } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

interface Props {
  authError?: any;
  addAdmin: any;
}

const AddAdmin: React.FC<Props> = ({ addAdmin, authError }) => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(
      "email, firstName, lastName, password :",
      email,
      firstName,
      lastName,
      password
    );
    addAdmin({ email, firstName, lastName, password });
    setRedirect(true);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="o-inputfield">
            <label>Voornaam</label>
            <input
              className="o-inputfield__input login"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="o-inputfield">
            <label>Achternaam</label>
            <input
              className="o-inputfield__input login"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="o-inputfield">
            <label>Wachtwoord</label>
            <input
              type="password"
              className="o-inputfield__input login"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>Submit</button>
          {typeof authError !== "undefined" && authError !== null
            ? authError.message
            : null}
        </form>
      </div>
    );
  } else {
    return <Redirect to="/admin" />;
  }
};

const mapStateToProps = (state: any) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    addAdmin: (newUser: iNewUser) => dispatch(addAdmin(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAdmin);
