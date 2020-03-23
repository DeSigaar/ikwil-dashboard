import React from "react";
import { Link } from "react-router-dom";

interface Props {
  data?: iOrganizer[] | undefined;
}
const Summary: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <h2>Overzicht</h2>
      {typeof data !== "undefined" ? (
        <>
          {data.map(organisor => {
            return (
              <Link key={organisor.id} to={"/organizer/" + organisor.id}>
                <div>{organisor.name}</div>
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
