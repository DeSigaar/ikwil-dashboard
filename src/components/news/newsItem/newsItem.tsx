import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom";
import { DeleteNewsItem } from "../../../store/actions/newsItemActions";
import { Redirect } from "react-router-dom";
import { GetPhoto } from "../../../store/actions/imgActions";

interface Props {
  link: any;
  newsItem?: iNewsItem;
}

const NewsItem: React.FC<Props> = ({ newsItem, link }) => {
  const [safeDelete, setSafeDelete] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [imgPreview, setImgPreview] = useState<any>(undefined);

  useEffect(() => {
    if (typeof newsItem !== "undefined") {
      GetPhoto(newsItem.img)?.then((res: any) => {
        setImgPreview(res);
      });
    }
  }, [newsItem]);

  if (typeof newsItem !== "undefined") {
    const handleDelete = () => {
      if (typeof newsItem.id !== "undefined") {
        DeleteNewsItem(newsItem.id);
        setRedirect(true);
      }
    };
    if (!redirect) {
      return (
        <div>
          <h2>Organizer</h2>
          <p>{newsItem.title}</p>
          <p>{newsItem.text}</p>
          <p>{newsItem.createdBy}</p>
          <img src={imgPreview} alt="preview" />
          <Link to={link.url + "/edit"}>edit</Link>
          <button onClick={() => setSafeDelete(true)}>delete</button>
          {safeDelete ? (
            <div>
              Are you sure you want to delete it?
              <button onClick={() => setSafeDelete(false)}>No</button>
              <button onClick={() => handleDelete()}>yes</button>
            </div>
          ) : null}
        </div>
      );
    } else {
      return <Redirect to={"/news"} />;
    }
  } else {
    return null;
  }
};
const mapStateToProps = (state: any) => {
  if (typeof state.firestore.ordered.news !== "undefined") {
    return { newsItem: state.firestore.ordered.news[0] };
  } else {
    return {};
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteNewsItem: (docId: string) => dispatch(DeleteNewsItem(docId)),
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "news", doc: props.link.params.id }
  ])
)(NewsItem) as React.FC<Props>;
