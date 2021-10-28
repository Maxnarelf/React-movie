import React from "react";
import "./Modal.css";

const Modal = ({ showModal, toggleModal, children }) => {
  return (
    <div
      className={showModal ? "modal active" : "modal"}
      onClick={() => toggleModal(false)}
    >
      <div
        className={showModal ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
