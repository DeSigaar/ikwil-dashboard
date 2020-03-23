import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Props {
  data?: iNewsItem[] | undefined;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const Summary: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <h2>Nieuws</h2>
      {typeof data !== "undefined" ? (
        <>
          <Carousel
            showDots={true}
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={10000}
            containerClass="carousel-container"
            arrows={false}
          >
            {data.map(newsItem => {
              return (
                <Link key={newsItem.id} to={"/news/" + newsItem.id}>
                  <div>{newsItem.title}</div>
                </Link>
              );
            })}
          </Carousel>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
export default Summary;
