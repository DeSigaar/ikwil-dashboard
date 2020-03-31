import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GetPhoto } from "../../store/actions/imgActions";

interface Props {
  organizer?: any;
}
const ActiveOrganisers: React.FC<Props> = ({ organizer }) => {
  const [img, setImg] = useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/stichting-ik-wil.appspot.com/o/images%2Forganisers%2Fdefault.jpg?alt=media&token=037525ae-8fd5-4566-9b2f-4deb9a064212"
  );
  useEffect(() => {
    if (typeof organizer !== "undefined") {
      if (typeof organizer.img !== "undefined") {
        GetPhoto(organizer.img)?.then((res: any) => {
          setImg(res);
        });
      }
    }
  });
  if (typeof organizer !== "undefined") {
    return (
      <div className="c-organiser__link" key={organizer.id}>
        <div className="c-organiser">
          <img className="c-organiser__image" src={img} alt="organizer" />
          <h3 className="c-organiser__name">{organizer.name}</h3>
          <p className="c-organiser__description">{organizer.description}</p>
          <p className="c-organiser__place">{organizer.place}</p>
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
export default connect(null, mapDispatchToProps)(ActiveOrganisers) as React.FC<
  Props
>;
