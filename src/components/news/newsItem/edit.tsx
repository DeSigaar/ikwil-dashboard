import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { EditNewsItem } from "../../../store/actions/newsItemActions";
import { Redirect } from "react-router-dom";
import { GetPhoto } from "../../../store/actions/imgActions";

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
  const [img, setImg] = useState<any>(undefined);
  const [imgPreview, setImgPreview] = useState<any>(undefined);
  const [imgRef, setImgRef] = useState<string>("");
  useEffect(() => {
    if (typeof newsItem !== "undefined") {
      setTitle(newsItem.title);
      setText(newsItem.text);
      if (typeof newsItem.img !== "undefined") {
        setImgRef(newsItem.img);
      }
      GetPhoto(newsItem.img)?.then((res: any) => {
        setImgPreview(res);
      });
    }
  }, [newsItem]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    EditNewsItem(
      { title, text },
      profile,
      auth.uid,
      link.params.id,
      imgRef,
      img
    );
    setRedirect(true);
  };
  const handleImageUpload = (e: any) => {
    e.preventDefault();
    if (typeof e.target.files[0] !== "undefined") {
      setImgPreview(URL.createObjectURL(e.target.files[0]));
      setImg(e.target.files[0]);
    }
  };
  if (typeof newsItem !== "undefined") {
    if (!redirect) {
      return (
        <div className="s-cms">
          <div className="s-cms__form-conatiner">
            <h2 className="s-cms__header">Bewerk nieuwsbericht</h2>
            <form onSubmit={e => handleSubmit(e)}>
              <div className="o-inputfield">
                <label>Titel</label>
                <input
                  className="o-inputfield__input"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>
              <div className="o-inputfield">
                <label>Bericht</label>
                <textarea
                  className="o-inputfield__input"
                  required
                  value={text}
                  onChange={e => setText(e.target.value)}
                />
              </div>
              <div className="o-inputfield">
                <label>Afbeelding toevoegen</label>
                <img
                  className="o-inputfield__upload-preview"
                  src={imgPreview}
                  alt="preview"
                />
                <input
                  className="o-inputfield__file-upload"
                  type="file"
                  name="imgToUpload"
                  id="imgToUplaod"
                  onChange={e => handleImageUpload(e)}
                />
              </div>
              <button>update nieuwsbericht</button>
            </form>
          </div>
        </div>
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
  } else {
    return {};
  }
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    EditNewsItem: (
      newsItem: any,
      profile: any,
      id: string,
      docId: string,
      imgRef: string,
      img: any
    ) => dispatch(EditNewsItem(newsItem, profile, id, docId, imgRef, img)),
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props: Props) => [
    { collection: "news", doc: props.link.params.id }
  ])
)(Edit) as React.FC<Props>;
