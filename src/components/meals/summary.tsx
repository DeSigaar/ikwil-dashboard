import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "react-modal";
import ActiveMealItem from "./meal/activeMealItem";

interface Props {
  meals?: iMeal[] | undefined;
}

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  }
};

const Summary: React.FC<Props> = ({ meals }) => {
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [noneActive, setNoneActive] = useState<boolean>(true);

  Modal.setAppElement("#root");

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  useEffect(() => {
    if (typeof meals !== "undefined") {
      meals.forEach(meal => {
        if (meal.isActive) {
          setNoneActive(false);
        }
      });
    }
  }, [meals]);
  return (
    <div className="s-card-small" id="meal">
      <h2 className="s-card-small__header">Maaltijd van de dag</h2>
      {noneActive ? <div>Er is geen maaltijd vandaag ofzo</div> : <></>}

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
              return meal.isActive ? (
                <div
                  key={meal.id}
                  onClick={e => {
                    if (isMoving !== true) {
                      openModal();
                    }
                  }}
                >
                  <ActiveMealItem meal={meal} isMoving={isMoving} />
                </div>
              ) : null;
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
                if (meal.isActive) {
                  return (
                    <div className="c-modal-meal" key={meal.id}>
                      <h2 className="c-modal-meal__title">{meal.name}</h2>
                      <div className="c-modal-meal__left-wrapper">
                        <div className="c-modal-meal__price">
                          &euro;{meal.price}
                        </div>
                        <h3 className="c-modal-meal__ingredients-title">
                          Ingredienten
                        </h3>
                        <div className="c-modal-meal__ingredients">
                          {meal.ingredients}
                        </div>
                      </div>
                      <div className="c-modal-meal__characteristics">
                        <div className="c-modal-meal__characteristics__item">
                          {meal.isHallal ? <img src="/check.svg" className="c-modal-meal__characteristics__item__img" alt="Eten is halal" /> : <img src="/close.svg" className="c-modal-meal__characteristics__item__img" alt="Eten is niet halal" />}
                          Halal
                        </div>
                        <div className="c-modal-meal__characteristics__item">
                          {meal.isVegetarian ? <img src="/check.svg" className="c-modal-meal__characteristics__item__img" alt="Eten is vegetarisch" /> : <img src="/close.svg" className="c-modal-meal__characteristics__item__img" alt="Eten is niet vegetarisch" />}
                          Vegetarisch
                        </div>
                        <div className="c-modal-meal__characteristics__item">
                          {meal.isVegan ? <img src="/check.svg" className="c-modal-meal__characteristics__item__img" alt="Eten is vegan" /> : <img src="/close.svg" className="c-modal-meal__characteristics__item__img" alt="Eten is niet vegan" />}
                          Vegan
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null
                }
              })}
            </div>
          </>
        ) : (
          <></>
        )}
      </Modal>
    </div>
  );
};
export default Summary;
