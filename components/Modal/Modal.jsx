import React from "react";
import "./Modal.css";

const Modal = (props) => {
  return (
    // Modal overlay with close functionality on click
    <div className="custom__modal" onClick={() => props.onClose(false)}>
      {/* Modal content that stops propagation of click events */}
      <div className="modal__content" onClick={(event) => event.stopPropagation()}>
        {props.children} {/* Render children components inside the modal */}
      </div>
    </div>
  );
};

export default Modal;
