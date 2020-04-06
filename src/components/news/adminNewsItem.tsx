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
        <div className="c-adminItem" key={newsItem.id}>
          <div className="c-adminItem__top">
            <div className="c-adminItem__top__left">
              <div className="c-adminItem__image">
                <img src={imgPreview} alt="preview" />
              </div>
            </div>
            <div className="c-adminItem__top__center">
              <h3 className="c-adminItem__title">{newsItem.title}</h3>
              <p className="c-adminItem__text">{newsItem.text}</p>
              <p className="c-adminItem__bold">
                gepubliceerd door: {newsItem.createdBy}
              </p>
            </div>
          </div>
          <div className="c-adminItem__bottom">
            <div></div>
            <div className="c-adminItem__buttons">
              <Link to={"/admin/newsitem/" + newsItem.id + "/edit"}>
                <button
                  onChange={e => {
                    e.preventDefault();
                  }}
                >
                  Edit
                </button>
              </Link>
              <button onClick={() => setSafeDelete(true)}>delete</button>
              {safeDelete ? (
                <div className="c-adminItem__popup">
                  Are you sure you want to delete it?
                  <button onClick={() => setSafeDelete(false)}>No</button>
                  <button onClick={() => handleDelete()}>yes</button>
                </div>
              ) : null}
            </div>
          </div>
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
