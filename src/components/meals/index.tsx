import React from "react";
// import { connect } from "react-redux";
// import { firestoreConnect } from "react-redux-firebase";
// import { compose } from "redux";
import Summary from "./summary";
// import Create from "./meal/create";

// interface Props {
//   data?: iMeal[];
//   isLoggedIn: boolean;
// }

// const Meals: React.FC<Props> = ({ data, isLoggedIn }) => {
const Meals: React.FC = () => {
  return (
    <div>
      {/* <Summary data={data} /> */}
      <Summary />
      {/* {isLoggedIn ? <Create /> : null} */}
    </div>
  );
};

// const mapStateToProps = (state: any) => {
//   let isLoggedIn = false;
//   if (!state.firebase.profile.isEmpty) {
//     isLoggedIn = true;
//   }
//   return {
//     data: state.firestore.ordered.rules,
//     isLoggedIn
//   };
// };
// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect([
//     {
//       collection: "meals"
//     }
//   ])
// )(Meals) as React.FC;

export default Meals as React.FC;
