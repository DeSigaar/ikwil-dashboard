import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import Modal from "react-modal";
import "react-multi-carousel/lib/styles.css";

interface Props {
  meals?: iMeal[] | undefined;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  }
};


const Summary: React.FC<Props> = ({ meals }) => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  // const [modalContent, setModalContent] = React.useState<any>(false);
  Modal.setAppElement('#root')

  // useEffect(() => {
  //   setModalContent(meals)
  // }, [meals])

  const closeModal = () => {
    setIsOpen(false);
  }

  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <div className="s-card-small" id="meal">
      <h2 className="s-card-small__header">Maaltijd van de dag</h2>
      {typeof meals !== "undefined" ? (
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
            {meals.map((meal: iMeal) => {
              return (
                <div
                  className="c-meal__link"
                  key={meal.id}
                  onClick={e => {
                    if (isMoving !== true) {
                      openModal()
                    }
                  }}
                >
                  <div className="c-meal">
                    <img
                      src="/yoga.svg"
                      className="c-meal__icon"
                      alt="Maaltijd van de dag"
                    />
                    <h2 className="c-meal__title">{meal.name}</h2>
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
        <div className="ReactModal__Content__close-icon" onClick={closeModal}></div>
        {typeof meals !== "undefined" ? (
          <>
            <div className="ReactModal__Content__image-wrapper">
              <img
                className="ReactModal__Content__image"
                src="https://images.pexels.com/photos/35661/pasta-cheese-egg-food.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                alt="toiletrolls-Coronavirus"
                />
            </div>
            <div className="ReactModal__Content__wrapper">
              {meals.map((meal: iMeal) => {
                return (
                  <div className="c-modal-meal" key={meal.id}>
                    <h2 className="c-modal-meal__title">{meal.name}</h2>
                    <div className="c-modal-meal__left-wrapper">
                      <div className="c-modal-meal__price">&euro;{meal.price}</div>
                      <h3 className="c-modal-meal__ingredients-title">Ingredienten</h3>
                      <div className="c-modal-meal__ingredients">{meal.ingredients}</div>
                    </div>
                    <div className="c-modal-meal__characteristics">
                      <div className="c-modal-meal__characteristics__halal">{meal.isHallal ? "yes" : "no"}</div>
                      <div className="c-modal-meal__characteristics__vegan">{meal.isVegan ? "yes" : "no"}</div>
                      <div className="c-modal-meal__characteristics__vegetarian">{meal.isVegetarian ? "yes" : "no"}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}
        {/* <h2 className="ReactModal__Content__title">{modalContent.title}</h2>
        <p className="ReactModal__Content__text">{modalContent.text}</p> */}
      </Modal>
    </div>
  );
};
export default Summary;
