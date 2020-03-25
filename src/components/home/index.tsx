import React from "react";
import News from "../news/index";
import Activities from "../activities/index";
import Organisers from "../organisers/index";
import Rules from "../rules/index";

const Nav: React.FC = () => {
  return (
    <div className="s-home">
      <Organisers />
      <News />
      <Activities />
      <Rules />
    </div>
  );
};

export default Nav;
