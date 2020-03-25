import React, { useState, useEffect } from "react";

interface Props {
  setDays: (day: iDay) => void;
  name: string;
}
const Day: React.FC<Props> = ({ name, setDays }) => {
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  useEffect(() => {
    setDays({ name: name, startTime, endTime });
  }, [startTime, endTime, setDays, name]);

  return (
    <div>
      <h3>{name}</h3>
      <div>
        Van
        <input
          type="time"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />
      </div>
      <div>
        Tot
        <input
          type="time"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
        />
      </div>
    </div>
  );
};
export default Day;
