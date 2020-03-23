import React, { useState } from "react";
import { connect } from "react-redux";
import { createNewsItem } from "../../../store/actions/newsItemActions";

interface Props {
  profile: any;
  userId: string;
}

const Create: React.FC<Props> = ({ profile, userId }) => {
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewsItem({ title, text }, profile, userId);
  };
  return (
    <div>
      <h2>Toevoegen</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          Titel
          <input
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          Text
          <textarea
            required
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};
const mapStateToProps = (state: any) => {
  return {
    profile: state.firebase.profile,
    userId: state.firebase.auth.uid
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    createNewsItem: (newsItem: any, profile: any, userId: string) =>
      dispatch(createNewsItem(newsItem, profile, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
