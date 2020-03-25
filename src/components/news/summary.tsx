import React, { useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface Props {
  data?: iNewsItem[] | undefined;
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
  const [isMoving, setIsMoving] = useState<boolean>(true);

  return (
    <>
      <h2 className="s-card-small__header">Nieuws</h2>
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
            beforeChange={() => setIsMoving(true)}
            afterChange={() => setIsMoving(false)}
          >
            {data.map(newsItem => {
              return (
                <Link
                  className="c-newsItem__link"
                  key={newsItem.id}
                  to={"/news/" + newsItem.id}
                  onClick={e => {
                    if (isMoving === true) {
                      e.preventDefault();
                    }
                  }}
                >
                  <div className="c-newsItem">
                    <img
                      className="c-newsItem__image"
                      src="https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                      alt="toiletrolls-Coronavirus"
                    />
                    <h3 className="c-newsItem__title">{newsItem.title}</h3>
                    <p className="c-newsItem__text">{newsItem.text}</p>
                  </div>
                </Link>
              );
            })}
          </Carousel>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
export default Summary;
