import React from "react";
import { Link } from "react-router-dom";

interface Props {
  data?: iRule[] | undefined;
}
const Summary: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <h2>Overzicht</h2>
      {typeof data !== "undefined" ? (
        <>
          {data.map(rule => {
            return (
              <Link key={rule.id} to={"/rule/" + rule.id}>
                <div>{rule.name}</div>
              </Link>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Summary;
