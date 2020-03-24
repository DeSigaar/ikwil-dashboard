import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditActivity } from "../../../store/actions/activitiesActions";
import { Redirect } from "react-router-dom";
import { getSecondPart } from "../../../functions/stringSplitting";
interface Props {
  link?: any;
  profile?: any;
  activity?: iActivity;
  auth?: any;
  categories?: iCategory[];
  organisers?: iOrganizer[];
}

const ActivityEdit: React.FC<Props> = ({
  activity,
  auth,
  profile,
  link,
  categories,
  organisers
}) => {

  const [name, setName] = useState<string>("");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  const [category, setSelectedCategory] = useState<string>("geen");
  const [activeOrganisers, setActiveOrganisers] = useState<string[]>([]);
  useEffect(() => {
    if (typeof activity !== "undefined") {
      setName(activity.name);
      setStartTime(activity.startTime);
      setEndTime(activity.endTime);
      setRoom(activity.name);
      setSelectedCategory(getSecondPart(activity.category, "/"));
      let arr:string[] = [];
      activity.organisers.forEach(organizer => {
        arr.push(getSecondPart(organizer, "/"))
        setActiveOrganisers(arr);
      });

    }
  }, [activity]);

  let categoryOptions = [<option key="none" value="geen">Select</option>];
  if (typeof categories !== "undefined") {
    categories.forEach(category => 
      <div key={category.id}>
      categoryOptions.push(
        <option  value={category.id}>
          {category.name}
        </option>
      );
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let organisers: string[] = [];
    activeOrganisers.forEach(ref => {
      organisers.push("organisers/" + ref);
    });
    EditActivity(
      { name, startTime, endTime, room, category, organisers },
      profile,
      auth.uid,
      link.params.id,

    );
    setRedirect(true);
  };


  let organisersOptions: any = [];
  if (typeof organisers !== "undefined") {
    organisers.forEach(organizer => <div key={organizer.id}>{typeof organizer.id !== "undefined" ? organisersOptions.push( 
      <div key={organizer.id}>
        <input
          checked={activeOrganisers.includes(organizer.id)}
          onChange={e => handleActiveOrganisers(e, organizer.id)}
          type="checkbox"
        />
        {organizer.name}
      </div>
    ): null}</div>);
  }
  const handleActiveOrganisers = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string | undefined
  ) => {
    let tempActiveOrganisers = [...activeOrganisers];
    if (typeof id !== "undefined") {
      if (tempActiveOrganisers.includes(id)) {
        tempActiveOrganisers.splice(
          tempActiveOrganisers.findIndex(item => item === id),
          1
        );
      } else {
        tempActiveOrganisers.push(id);
      }
      setActiveOrganisers(tempActiveOrganisers);
    }
  };
  if (typeof activity !== "undefined") {
    if (!redirect) {
      return (
        <>
          <h2>Edit</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <div>
              naam
              <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div>
              Tijden
              <input
                required
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
              />
              tot
              <input
                required
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
              />
            </div>
            <div>
              Locatie
              <input
                required
                value={room}
                onChange={e => setRoom(e.target.value)}
              />
            </div>
            <div>
      
          {organisersOptions}
        </div>
            <div>
              Categorie
              <select
                required
                value={category}
                onChange={e => setSelectedCategory(e.target.value)}
              >
                {categoryOptions}
              </select>
            </div>
            
            <button>update</button>
          </form>
        </>
      );
    } else {
      return <Redirect to={"/activity/" + link.params.id} />;
    }
  } else {
    return <>Error</>;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.activities !== "undefined") {
    return {
      activity: state.firestore.ordered.activities[0],
      profile: state.firebase.profile,
      auth: state.firebase.auth,
      categories: state.firestore.ordered.categories,
      organisers: state.firestore.ordered.organisers
    };
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    EditActivity: (activity: iActivity, profile: any, id: string, docId: string, organisers: string[]) =>
      dispatch(EditActivity(activity, profile, id, docId))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "activities", doc: props.link.params.id },
    {
      collection: "categories"
    },
    {
      collection: "organisers"
    }
  ])
)(ActivityEdit) as React.FC<Props>;
