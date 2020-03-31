import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import Modal from "react-modal";
import "react-multi-carousel/lib/styles.css";

interface Props {
  data?: iNewsItem[] | undefined;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  }
};

const Summary: React.FC<Props> = ({ data }) => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [modalContent, setModalContent] = React.useState<any>(false);
  Modal.setAppElement("#root");

  const closeModal = () => {
    setIsOpen(false);
  };

  const onClick = (newsItem: iNewsItem) => {
    setIsOpen(true);
    setModalContent(newsItem);
  };

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
                <div
                  className="c-newsItem__link"
                  key={newsItem.id}
                  onClick={e => {
                    if (isMoving !== true) {
                      onClick(newsItem);
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
                </div>
              );
            })}
          </Carousel>
        </>
      ) : (
        <></>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, .75)"
          }
        }}
      >
        <div
          className="ReactModal__Content__close-icon"
          onClick={closeModal}
        ></div>
        <div className="ReactModal__Content__image-wrapper">
          <img
            className="ReactModal__Content__image"
            src="https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            alt="toiletrolls-Coronavirus"
          />
        </div>
        <div className="ReactModal__Content__wrapper">
          <h2 className="ReactModal__Content__title">{modalContent.title}</h2>
          <p className="ReactModal__Content__text">{modalContent.text}</p>
        </div>
      </Modal>
    </>
  );
};
export default Summary;
