import React from "react";
import { Link } from "react-router-dom";
interface Props {
  data?: iActivity[] | undefined;
}
const Summary: React.FC<Props> = ({ data }) => {
  return (
    <div>
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
