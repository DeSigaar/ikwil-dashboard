import React from "react";
import ActiveOrganizer from "./activeOrganizer";
import { getDayNumber } from "../../functions/dates";
interface Props {
  data?: iOrganizer[] | undefined;
}

const Summary: React.FC<Props> = ({ data }) => {
  let today = new Date().getDay();
  let days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  return (
    <>
      <h2 className="s-card-small__header">Aanwezig bestuur</h2>
      <div className="s-card-small__scrollable-container">
        {typeof data !== "undefined" ? (
          <>
            {data.map((organisor) => {
              if (typeof organisor.availability !== "undefined") {
                if (organisor.availability[days[today - 1]]) {
                  return (
                    <ActiveOrganizer organizer={organisor} key={organisor.id} />
                  );
                } else {
                  return null;
                }
              } else {
                return null;
              }
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
