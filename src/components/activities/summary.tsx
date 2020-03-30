import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { DeleteActivity } from "../../store/actions/activitiesActions";
interface Props {
  activities?: iActivity[] | undefined;
}
const Summary: React.FC<Props> = ({ activities }) => {
  const initSortedDays = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  };

  const [sortedDays, setSortedDays] = useState<any>(initSortedDays);
  const [inititialActivities, setCheckActivities] = useState<any>(undefined);

  useEffect(() => {
    if (activities !== inititialActivities) {
      setCheckActivities(activities);
      let tempSortedDays: any = initSortedDays;

      activities?.forEach((activity: iActivity) => {
        if (typeof activity.day !== "undefined") {
          const date = new Date(activity.day.date);
          const dateToday = new Date();
          if (date > dateToday) {
            switch (date.getDay()) {
              case 1:
                tempSortedDays.Monday.push(activity);
                break;
              case 2:
                tempSortedDays.Tuesday.push(activity);
                break;
              case 3:
                tempSortedDays.Wednesday.push(activity);
                break;
              case 4:
                tempSortedDays.Thursday.push(activity);
                break;
              case 5:
                tempSortedDays.Friday.push(activity);
                break;
              case 6:
                tempSortedDays.Saturday.push(activity);
                break;
              case 7:
                tempSortedDays.Sunday.push(activity);
                break;
              default:
                break;
            }
          } else {
            if (typeof activity.id !== "undefined") {
              DeleteActivity(activity.id);
            }
          }
        }

        if (typeof activity.days !== "undefined") {
          activity.days.forEach((day: iDay) => {
            if (day.startTime !== "" && day.endTime !== "") {
              if (day.name === "Monday") {
                tempSortedDays.Monday.push(activity);
              }
              if (day.name === "Tuesday") {
                tempSortedDays.Tuesday.push(activity);
              }
              if (day.name === "Wednesday") {
                tempSortedDays.Wednesday.push(activity);
              }
              if (day.name === "Thursday") {
                tempSortedDays.Thursday.push(activity);
              }
              if (day.name === "Friday") {
                tempSortedDays.Friday.push(activity);
              }
              if (day.name === "Saturday") {
                tempSortedDays.Saturday.push(activity);
              }
              if (day.name === "Sunday") {
                tempSortedDays.Sunday.push(activity);
              }
            }
          });
          setSortedDays(tempSortedDays);
        }
      });
    }
  }, [activities, inititialActivities, sortedDays, initSortedDays]);

  let renderDays: any = [];
  Object.keys(sortedDays).forEach(function(key) {
    renderDays.push(
      <div key={key}>
        <h2>{key}</h2>
        {sortedDays[key].map((activity: any) => {
          let times;
          if (typeof activity.days !== "undefined") {
            times = activity.days.find((item: any) => item.name === key);
          }
          if (typeof activity.day !== "undefined") {
            times = activity.day;
          }
          return (
            <div key={activity.id + key}>
              <Link to={"/activity/" + activity.id} className="c-activity">
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
                    <div>starttijd: {times.startTime}</div>
                    <div>eindtijd: {times.endTime}</div>
                  </div>
                  <div className="c-activity__room">{activity.room}</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  });

  return (
    <>
      <h2 className="s-card-big__header">Activiteiten</h2>
      <div className="s-card-big__scrollable-container">{renderDays}</div>
      <div className="c-dayChanger">
        <Link id="back" to={"#"} className="c-dayChanger__arrow">
          <img src="./chevron-left-solid.svg" alt="left chevron" />
        </Link>
        <h3 className="c-dayChanger__date">Vandaag</h3>
        <Link id="forward" to={"#"} className="c-dayChanger__arrow">
          <img src="./chevron-right-solid.svg" alt="right chevron" />
        </Link>
      </div>
    </>
  );
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteActivity: (docId: string) => dispatch(DeleteActivity(docId))
  };
};
export default connect(null, mapDispatchToProps)(Summary) as React.FC<Props>;
