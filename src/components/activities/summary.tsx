import React from "react";
import { Link } from "react-router-dom";

interface Props {
  data?: iActivity[] | undefined;
}
const Summary: React.FC<Props> = ({ data }) => {
  return (
    // <div className="s-card __activity-container">
    <>
      <h2 className="s-card__header">Activiteiten</h2>
      <div className="s-card __activity-container">
        {typeof data !== "undefined" ? (
          <>
            {data.map(activity => {
              return (
                <Link
                  key={activity.id}
                  to={"/activity/" + activity.id}
                  className="c-activity"
                >
                  <div className="__top-content">
                    <img
                      className="__icon"
                      src="/yoga.svg"
                      alt="activity icon"
                    />
                    <h3>{activity.name}</h3>
                  </div>
                  <div className="__bottom-content">
                    <div className="__time">
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
