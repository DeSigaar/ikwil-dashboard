import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { GetPhoto } from "../../store/actions/imgActions";
import { useFirestore } from "react-redux-firebase";
import { getSecondPart } from "../../functions/stringSplitting";

interface Props {
  activity?: iActivity;
  day?: any;
  action?: any;
}
const ActivityItem: React.FC<Props> = ({ activity, day, action }) => {
  const firestore = useFirestore();

  const [category, setCategory] = useState<any>(undefined);
  const [img, setImg] = useState<any>(undefined);

  useEffect(() => {
    if (typeof activity !== "undefined") {
      if (typeof activity.category !== "undefined") {
        //Category fetch
        firestore
          .collection("categories")
          .doc(getSecondPart(activity.category, "/"))
          .get()
          .then((data: any) => {
            setCategory(data.data());

            GetPhoto(data.data().icon)?.then((res: any) => {
              setImg(res);
            });
          });
      }
    }
  }, [activity, firestore]);

  if (typeof activity !== "undefined") {
    let times: any;
    if (typeof activity.days !== "undefined") {
      times = activity.days.find((item: any) => item.name === day);
    }
    if (typeof activity.day !== "undefined") {
      times = activity.day;
    }

    return (
      <div>
        <div className="c-activity" onClick={() => action(activity)}>
          <div className="c-activity__top-content">
            <img
              className="c-activity__top-content__icon"
              alt="activity icon"
              src={img}
            />
            <h3>{activity.name}</h3>
          </div>
          <div className="c-activity__bottom-content">
            <div className="c-activity__bottom-content__time">
              {times.startTime} - {times.endTime}
            </div>
            <div className="c-activity__bottom-content__room">
              {activity.room}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};
export default connect(null, mapDispatchToProps)(ActivityItem) as React.FC<
  Props
>;
