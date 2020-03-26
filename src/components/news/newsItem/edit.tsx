import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditNewsItem } from "../../../store/actions/newsItemActions";
import { Redirect } from "react-router-dom";

interface Props {
  link?: any;
  profile?: any;
  newsItem?: iNewsItem;
  auth?: any;
}

const Edit: React.FC<Props> = ({ newsItem, auth, profile, link }) => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [redirect, setRedirect] = useState<boolean>(false);
  useEffect(() => {
    if (typeof newsItem !== "undefined") {
      setTitle(newsItem.title);
      setText(newsItem.text);
    }
  }, [newsItem]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    EditNewsItem({ title, text }, profile, auth.uid, link.params.id);
    setRedirect(true);
  };
  if (typeof newsItem !== "undefined") {
    if (!redirect) {
      return (
        <>
          <h2>Bewerk Nieuwsbericht</h2>
          <form onSubmit={e => handleSubmit(e)}>
            <div className="o-inputfield">
              <label className="o-inputfield__label">Titel</label>
              <input
                className="o-inputfield__input"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="o-inputfield">
              <label className="o-inputfield__label">Tekst</label>
              <textarea
                className="o-inputfield__input"
                required
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </div>
            <button>update nieuwsbericht</button>
          </form>
        </>
      );
    } else {
      return <Redirect to={"/news/" + link.params.id} />;
    }
  } else {
    return <>Error</>;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.news !== "undefined") {
    return {
      newsItem: state.firestore.ordered.news[0],
      profile: state.firebase.profile,
      auth: state.firebase.auth
    };
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    EditNewsItem: (newsItem: any, profile: any, id: string, docId: string) =>
      dispatch(EditNewsItem(newsItem, profile, id, docId))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "news", doc: props.link.params.id }
  ])
)(Edit) as React.FC<Props>;
