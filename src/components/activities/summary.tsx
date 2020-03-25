import React from "react";
import { Link } from "react-router-dom";

interface Props {
  data?: iActivity[] | undefined;
}
const Summary: React.FC<Props> = ({ data }) => {
  return (
    <>
      <h2 className="s-card-big__header">Activiteiten</h2>
      <div className="s-card-big__scrollable-container">
        {typeof data !== "undefined" ? (
          <>
            {data.map(activity => {
              return (
                <Link
                  key={activity.id}
                  to={"/activity/" + activity.id}
                  className="c-activity"
                >
                  <div className="c-activity__top-content">
                    <img
                      className="c-activity__icon"
                      src="/yoga.svg"
                      alt="activity icon"
                    />
                    <h3>{activity.name}</h3>
                  </div>
                  <div className="c-activity__bottom-content">
                    <div className="c-activity__time">
                      {activity.startTime} - {activity.endTime}
                    </div>
                    <div>{activity.room}</div>
                  </div>
                </Link>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Summary;
