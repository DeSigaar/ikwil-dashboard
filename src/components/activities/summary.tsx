import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { DeleteActivity } from "../../store/actions/activitiesActions";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { GetDayByNumber } from "../../functions/dates";
import { sortData } from "../../functions/activitySort";
import { GetPhoto } from "../../store/actions/imgActions";
import ActivityItem from "./activityItem";
interface Props {
  activities?: iActivity[] | undefined;
  next?: any;
  previous?: any;
  carouselState?: any;
  goToSlide?: any;
}

const Summary: React.FC<Props> = ({ activities }) => {
  const initSortedDays = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
  };

  const [sortedDays, setSortedDays] = useState<any>(initSortedDays);
  const [inititialActivities, setCheckActivities] = useState<any>(undefined);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [modalContent, setModalContent] = React.useState<any>(false);

  Modal.setAppElement("#root");

  const closeModal = () => {
    setIsOpen(false);
  };

  const onClick = (activity: iActivity) => {
    setIsOpen(true);
    setModalContent(activity);
  };

  useEffect(() => {
    if (activities !== inititialActivities) {
      setCheckActivities(activities);
      setSortedDays(sortData(activities));
    }
  }, [activities, inititialActivities, sortedDays, initSortedDays]);

  let renderDays: any = [];

  if (typeof sortedDays !== "undefined" && sortedDays !== null) {
    Object.keys(sortedDays).forEach(function (key) {
      renderDays.push(
        <div key={key}>
          {sortedDays[key].length !== 0 ? (
            <>
              {sortedDays[key].map((activity: any) => {
                return (
                  <ActivityItem
                    key={activity.id}
                    day={key}
                    activity={activity}
                  />
                );
              })}
            </>
          ) : (
            <div>Geen activiteiten vandaag!</div>
          )}
        </div>
      );
    });
  }

  const ButtonGroup: React.FC<Props> = ({
    next,
    previous,
    carouselState,
    goToSlide,
  }) => {
    const { currentSlide } = carouselState;
    const [day, setDay] = useState<any>(undefined);

    useEffect(() => {
      let today = new Date();
      setDay(GetDayByNumber(currentSlide + 1));
      if (today.getDay() - 1 !== currentSlide) {
        goToSlide(today.getDay() - 1);
      }
    }, [currentSlide, goToSlide]);

    return (
      <div className="c-dayChanger">
        <button
          id="back"
          onClick={() => previous()}
          className="c-dayChanger__arrow"
        >
          <img src="../chevron-left-solid.svg" alt="left chevron" />
        </button>
        <h3 className="c-dayChanger__date">{day}</h3>
        <button
          id="forward"
          onClick={() => next()}
          className="c-dayChanger__arrow"
        >
          <img src="../chevron-right-solid.svg" alt="right chevron" />
        </button>
      </div>
    );
  };

  return (
    <>
      <h2 className="s-card-big__header">Activiteiten</h2>
      <Carousel
        responsive={responsive}
        infinite={false}
        containerClass="o-carousel"
        dotListClass="o-carousel__dots"
        sliderClass="o-carousel__slider"
        renderButtonGroupOutside={true}
        arrows={false}
        customButtonGroup={<ButtonGroup />}
        beforeChange={() => setIsMoving(true)}
        afterChange={() => setIsMoving(false)}
      >
        {renderDays}
      </Carousel>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, .75)",
          },
        }}
      >
        <div
          className="ReactModal__Content__close-icon"
          onClick={closeModal}
        ></div>
        <div className="ReactModal__Content__image-wrapper">
          {/* <img
            className="ReactModal__Content__image"
            src={}
            alt="toiletrolls-Coronavirus"
          /> */}
        </div>
        <div className="ReactModal__Content__wrapper">
          <h2 className="ReactModal__Content__title">{modalContent.name}</h2>
          <p className="ReactModal__Content__text">{modalContent.text}</p>
        </div>
      </Modal>
    </>
  );
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    GetPhoto: (path: string) => dispatch(GetPhoto(path)),
    DeleteActivity: (docId: string) => dispatch(DeleteActivity(docId)),
  };
};
export default connect(null, mapDispatchToProps)(Summary) as React.FC<Props>;
