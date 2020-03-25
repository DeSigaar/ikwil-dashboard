import React from "react";
import Day from "./day";

interface Props {
  setDays: (days: iDay) => void;
}

const DateTime: React.FC<Props> = ({ setDays }) => {
  return (
    <div>
      <Day name="monday" setDays={setDays} />
      <Day name="tuesday" setDays={setDays} />
      <Day name="wednesday" setDays={setDays} />
      <Day name="thursday" setDays={setDays} />
      <Day name="friday" setDays={setDays} />
      <Day name="saturday" setDays={setDays} />
      <Day name="sunday" setDays={setDays} />
    </div>
  );
};
export default DateTime;
