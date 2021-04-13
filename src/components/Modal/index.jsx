import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ children, handleClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="btn-modal" onClick={handleClose}>
          <i className="fas fa-times-circle"></i>
        </button>
        {children}
      </div>
    </div>
  );
};

const ModalPortal = ({ children, handleClose }) => {
  return ReactDOM.createPortal(
    <Modal handleClose={handleClose}>{children}</Modal>,
    document.getElementById("modal-root")
  );
};

export default ModalPortal;
