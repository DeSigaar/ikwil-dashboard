import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect, useFirestore } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { DeleteActivity } from "../../../store/actions/activitiesActions";
import { Redirect } from "react-router-dom";
import { getSecondPart } from "../../../functions/stringSplitting";

interface Props {
  link: any;
  data?: any;
}

const Activity: React.FC<Props> = ({ link, data }) => {
  const firestore = useFirestore();

  const [safeDelete, setSafeDelete] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [category, setCategory] = useState<iCategory | undefined>(undefined);
  const [organisers, setOrganisers] = useState<any>([]);
  const [count, setCount] = useState<number>(1);
  const [daysState, setDaysState] = useState<iDay[] | undefined>(undefined);
  const [time, setTime] = useState<iOnce>({
    date: "",
    startTime: "",
    endTime: ""
  });

  useEffect(() => {
    if (typeof data.activity !== "undefined") {
      if (typeof data.activity.category !== "undefined") {
        //Category fetch
        firestore
          .collection("categories")
          .doc(getSecondPart(data.activity.category, "/"))
          .get()
          .then((data: any) => setCategory(data.data()));

        if (
          typeof data.activity.organisers !== "undefined" &&
          data.activity.organisers.length > 0
        ) {
          //Organisers fetch
          let organisersIds: any = [];
          data.activity.organisers.forEach((organizer: iOrganizer) => {
            organisersIds.push(getSecondPart(organizer, "/"));
          });

          let arr: any = [];
          firestore
            .collection("organisers")
            .where("id", "in", organisersIds)
            .get()
            .then((data: any) =>
              data.docs.forEach((doc: any) => {
                arr.push(doc.data());
                setOrganisers(arr);
                setCount(Math.floor(Math.random() * Math.floor(100)));
                //TO:DO Netter maken
              })
            );

          if (
            typeof data.activity.when !== "undefined" &&
            typeof data.activity.repeats !== "undefined"
          ) {
            if (data.activity.repeats) {
              setDaysState(data.activity.when);
            } else {
              setTime(data.activity.when);
            }
          }
        }
      }
    }
  }, [data.activity, firestore]);
  if (typeof data.activity !== "undefined") {
    const handleDelte = () => {
      if (typeof data.activity.id !== "undefined") {
        DeleteActivity(data.activity.id);
        setRedirect(true);
      }
    };
    const { activity } = data;
    if (!redirect) {
      return (
        <div className={count.toString()}>
          <div>
            <h2>Activity stuff</h2>
            <div>{activity.name}</div>
            <div>{activity.room}</div>
            <div>{activity.createdBy}</div>
            <h3>Wanneer</h3>
            {time.date !== "" ? (
              <div>
                <div>{time.date}</div>
                <div>
                  Van
                  <div>{time.startTime}</div>
                  Tot
                  <div>{time.endTime}</div>
                </div>
              </div>
            ) : null}
            {typeof daysState !== "undefined" ? (
              <div>
                {daysState.map((day: iDay) => {
                  return (
                    <div key={day.name}>
                      {day.startTime !== "" && day.endTime !== "" ? (
                        <div>
                          <h5>{day.name}</h5>
                          <div>{day.startTime}</div>tot<div>{day.endTime}</div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
          {typeof category !== "undefined" ? (
            <div>
              <h2>Category stuff</h2>
              <div>{category.name}</div>
              <div>{category.bio}</div>
              <div>{category.color}</div>
              <div>{category.icon}</div>
            </div>
          ) : null}

          {typeof organisers !== "undefined" ? (
            <div>
              <h2>Organizer stuff</h2>
              {organisers.length === 0 ? (
                <>Er zijn geen kartrekkers toegevoegd</>
              ) : (
                <>
                  {organisers.map((organizer: iOrganizer) => {
                    return <div key={organizer.id}>{organizer.name}</div>;
                  })}
                </>
              )}
            </div>
          ) : null}
          <Link to={link.url + "/edit"}>edit</Link>
          <button onClick={() => setSafeDelete(true)}>delete</button>
          {safeDelete ? (
            <div>
              Are you sure you want to delete it?
              <button onClick={() => setSafeDelete(false)}>No</button>
              <button onClick={() => handleDelte()}>yes</button>
            </div>
          ) : null}
        </div>
      );
    } else {
      return <Redirect to={"/" + link.params.id} />;
    }
  } else {
    return null;
  }
};
const mapStateToProps = (state: any) => {
  let activity = {};
  let category = {};
  let data = { activity: {}, category: {} };
  if (typeof state.firestore.ordered.activities !== "undefined") {
    activity = state.firestore.ordered.activities[0];
  }
  if (typeof state.firestore.ordered.categories !== "undefined") {
    category = state.firestore.ordered.categories[0];
  }
  data.activity = activity;
  data.category = category;
  return {
    data
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteActivity: (docId: string) => dispatch(DeleteActivity(docId))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "activities", doc: props.link.params.id }
  ])
)(Activity) as React.FC<Props>;
