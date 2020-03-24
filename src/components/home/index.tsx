import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import News from '../news/index';

interface Props {
//   loggedIn?: boolean;
}

const Nav: React.FC<Props> = () => {
  return (
    <div className="s-home">
      <News></News>
    </div>
  );
};

// const mapStateToProps = (state: any) => {
//   if (state.firebase.auth.isEmpty === false) {
//     return { loggedIn: true };
//   } else {
//     return { loggedIn: false };
//   }
// };
// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     signOut: () => dispatch(signOut())
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Nav);
export default Nav;
