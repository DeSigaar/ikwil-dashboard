import React from "react";
import { Link } from "react-router-dom";

interface Props {
  data?: iNewsItem[] | undefined;
}
const Summary: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <h2>Nieuws</h2>
      {typeof data !== "undefined" ? (
        <>
          {data.map(newsItem => {
            return (
              <Link key={newsItem.id} to={"/news/" + newsItem.id}>
                <div>{newsItem.title}</div>
              </Link>
            );
          })}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Summary;
