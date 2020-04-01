import React, { useState, useEffect } from "react";
import { GetPhoto } from "../../store/actions/imgActions";

interface Props {
  newsItem?: iNewsItem;
}
const ActiveNewsItem: React.FC<Props> = ({ newsItem }) => {
  const [img, setImg] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/stichting-ik-wil.appspot.com/o/images%2Fnews%2Fdefault.png?alt=media&token=84610bcf-00ad-46e8-baf1-6c8cecfadb9f"
  );
  useEffect(() => {
    if (typeof newsItem !== "undefined") {
      if (typeof newsItem.img !== "undefined") {
        GetPhoto(newsItem.img)?.then((res: any) => {
          setImg(res);
        });
      }
    }
  });
  if (typeof newsItem !== "undefined") {
    return (
      <div className="c-newsItem">
        <img className="c-newsItem__image" src={img} alt="News" />
        <h3 className="c-newsItem__title">{newsItem.title}</h3>
        <p className="c-newsItem__text">{newsItem.text}</p>
      </div>
    );
  } else {
    return null;
  }
};
export default ActiveNewsItem;
