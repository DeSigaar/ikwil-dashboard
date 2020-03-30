import React, { useState } from "react";

interface Props {
  setDays: (day: iDay) => void;
  name: string;
  initialStartTime: string;
  initialEndTime: string;
}
const Day: React.FC<Props> = ({
  name,
  setDays,
  initialEndTime,
  initialStartTime
}) => {
  const [startTime, setStartTime] = useState<string>(initialStartTime);
  const [endTime, setEndTime] = useState<string>(initialEndTime);

  return (
    <div className="o-inputfield">
      <label className="o-inputfield__sublabel">{name}</label>
      <div className="o-inputfield__times">
        <input
          className="o-inputfield__input"
          type="time"
          value={startTime}
          onChange={e => {
            setDays({ name: name, startTime: e.target.value, endTime });
            setStartTime(e.target.value);
          }}
        />
        Tot
        <input
          className="o-inputfield__input"
          type="time"
          value={endTime}
          onChange={e => {
            setDays({ name: name, startTime, endTime: e.target.value });
            setEndTime(e.target.value);
          }}
        />
      </div>
    </div>
  );
};
export default Day;
