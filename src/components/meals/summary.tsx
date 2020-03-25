import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";

interface Props {
  // data?: iMeal[] | undefined;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

// const Summary: React.FC<Props> = ({ data }) => {
const Summary: React.FC = () => {
  const [isMoving, setIsMoving] = useState<boolean>(false);

  return (
    <div className="s-card-small" id="meal">
      <h2 className="s-card-small__header">Maaltijd van de dag</h2>
      {/* {typeof data !== "undefined" ? ( */}
      <>
        <Carousel
          showDots={true}
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={20000}
          containerClass="o-carousel"
          dotListClass="o-carousel__dots"
          sliderClass="o-carousel__slider"
          arrows={false}
          beforeChange={() => setIsMoving(true)}
          afterChange={() => setIsMoving(false)}
        >
          {/* {data.map(meal => { */}
          {/* return ( */}
          <Link
            className="c-meal__link"
            key={1}
            // to={"/meal/" + newsItem.id}
            to={"/meal/1"}
            onClick={e => {
              if (isMoving === true) {
                e.preventDefault();
              }
            }}
          >
            <div className="c-meal">
              <img
                src="/yoga.svg"
                className="c-meal__icon"
                alt="Maaltijd van de dag"
              />
              <h2 className="c-meal__title">Tomatensoep</h2>
            </div>
          </Link>
          {/* ); */}
          {/* })} */}
        </Carousel>
      </>
      {/* ) : (
        <></>
      )} */}
    </div>
  );
};
export default Summary;
