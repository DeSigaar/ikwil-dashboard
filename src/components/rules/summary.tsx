import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Props {
  data?: iRule[] | undefined;
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

const Summary: React.FC<Props> = ({ data }) => {
  return (
    <div className="s-card-small">
      <h2 className="s-card-small__header">Huisregelementen</h2>
      {typeof data !== "undefined" ? (
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
          >
            {data.map(rule => {
              return (
                <div className="c-rule">
                  <h3 className="c-rule__title">{rule.name}</h3>
                  <p className="c-rule__text">{rule.rule}</p>
                </div>
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
