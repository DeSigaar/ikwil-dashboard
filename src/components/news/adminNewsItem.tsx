import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { DeleteNewsItem } from "../../store/actions/newsItemActions";
import { Redirect } from "react-router-dom";
import { GetPhoto } from "../../store/actions/imgActions";

interface Props {
  newsItem?: iNewsItem;
}

const NewsItem: React.FC<Props> = ({ newsItem }) => {
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
          <h2>News item</h2>
          <p>{newsItem.title}</p>
          <p>{newsItem.text}</p>
          <p>{newsItem.createdBy}</p>
          <img src={imgPreview} alt="preview" />
          <Link to={"activity/" + newsItem.id + "/edit"}>edit</Link>
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
      return <Redirect to={"/admin/news"} />;
    }
  } else {
    return null;
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    DeleteNewsItem: (docId: string) => dispatch(DeleteNewsItem(docId)),
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};

export default connect(null, mapDispatchToProps)(NewsItem) as React.FC<Props>;
