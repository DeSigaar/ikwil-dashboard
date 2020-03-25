import React from "react";
import Day from "./day";

interface Props {
  setDays: (days: iDay) => void;
  stateDays: iDay[];
}

const Days: React.FC<Props> = ({ setDays, stateDays }) => {
  return (
    <div>
      {stateDays.map(day => {
        return (
          <Day
            key={day.name}
            initialStartTime={day.startTime}
            initialEndTime={day.endTime}
            name={day.name}
            setDays={setDays}
          />
        );
      })}
    </div>
  );
};
export default Days;
