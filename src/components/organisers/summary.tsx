import React from "react";
import ActiveOrganizer from "./activeOrganizer";

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
              return <ActiveOrganizer organizer={organisor} key={organisor.id} />;
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
