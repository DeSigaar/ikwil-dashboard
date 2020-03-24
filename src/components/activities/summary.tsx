import React from "react";
import { Link } from "react-router-dom";

interface Props {
  data?: iActivity[] | undefined;
}
const Summary: React.FC<Props> = ({ data }) => {
  return (
    <div className="s-card">
      <h2 className="s-card__header">Overzicht</h2>
      {typeof data !== "undefined" ? (
        <>
          {data.map(activity => {
            return (
              <Link key={activity.id} to={"/activity/" + activity.id}>
                <div>{activity.name}</div>
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
