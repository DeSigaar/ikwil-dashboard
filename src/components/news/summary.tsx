import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import Modal from "react-modal";
import "react-multi-carousel/lib/styles.css";
import ActiveNewsItem from "./activeNewsItem";
import { GetPhoto } from "../../store/actions/imgActions";
import { connect } from "react-redux";
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
  const [img, SetImg] = React.useState<string>(
    "https://firebasestorage.googleapis.com/v0/b/stichting-ik-wil.appspot.com/o/images%2Fnews%2Fdefault.png?alt=media&token=84610bcf-00ad-46e8-baf1-6c8cecfadb9f"
  );

  Modal.setAppElement("#root");

  const closeModal = () => {
    setIsOpen(false);
  };

  const onClick = (newsItem: iNewsItem) => {
    setIsOpen(true);
    if (typeof newsItem.img !== "undefined") {
      GetPhoto(newsItem.img)?.then((res: any) => {
        SetImg(res);
      });
    }
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
                  <ActiveNewsItem newsItem={newsItem} />
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
            src={img}
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    GetPhoto: (path: string) => dispatch(GetPhoto(path))
  };
};

export default connect(null, mapDispatchToProps)(Summary) as React.FC<Props>;
