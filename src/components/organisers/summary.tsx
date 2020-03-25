import React from "react";
import { Link } from "react-router-dom";

interface Props {
  data?: iOrganizer[] | undefined;
}
const Summary: React.FC<Props> = ({ data }) => {
  return (
    <>
      <h2 className="s-card-small__header">Aanwezig bestuur</h2>
      <div className="s-card-small__scrollable-container">
        {typeof data !== "undefined" ? (
          <>
            {data.map(organisor => {
              return (
                <Link
                  className="c-organiser__link"
                  key={organisor.id}
                  to={"/organizer/" + organisor.id}
                >
                  <div className="c-organiser">
                    <img
                      className="c-organiser__image"
                      src="https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                      alt="toiletrolls-Coronavirus"
                    />
                    <h3 className="c-organiser__name">{organisor.name}</h3>
                    <p className="c-organiser__description">
                      {organisor.description}
                    </p>
                    <p className="c-organiser__place">{organisor.place}</p>
                  </div>
                </Link>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default Summary;
