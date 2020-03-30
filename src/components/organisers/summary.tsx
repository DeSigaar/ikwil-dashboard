import React from "react";
// import { Link } from "react-router-dom";
import Modal from "react-modal";
// import organisers from ".";
interface Props {
  data?: iOrganizer[] | undefined;
}
const Summary: React.FC<Props> = ({ data }) => {
  
  Modal.setAppElement('#root')

  const [modalIsOpen, setIsOpen] = React.useState<boolean>(false);
  const [modelContent, setModelContent] = React.useState<any>(false);
  
  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }
 
  const closeModal = () => {
    setIsOpen(false);
  }

  const onClick = (organizer: iOrganizer) => {
    openModal()
    setModelContent(organizer)
 }
 

  return (
    <>
      <h2 className="s-card-small__header">Aanwezig bestuur</h2>
      <div className="s-card-small__scrollable-container">
        {typeof data !== "undefined" ? (
          <>
            {data.map(organisor => {
              return (
                <div
                  className="c-organiser__link"
                  key={organisor.id}
                  // to={"/organizer/" + organisor.id}
                  onClick={() => onClick(organisor) }
                >
                  <div className="c-organiser">
                    <img
                      className="c-organiser__image"
                      src="https://images.unsplash.com/photo-1584556812952-905ffd0c611a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                      alt="toiletrolls-Coronavirus"
                    />
                    <h3 className="c-organiser__name">{organisor.name}</h3>
                    <p className="c-organiser__description">
                      {organisor.description}
                    </p>
                    <p className="c-organiser__place">{organisor.place}</p>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <></>
          )}
              {/* <button onClick={openModal}>Open Modal</button> */}

<Modal
    isOpen={modalIsOpen}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    // style={customStyles}
  contentLabel="title"
  >
  {modelContent.name}
  </Modal>
      </div>
    </>
  );
};
export default Summary;
