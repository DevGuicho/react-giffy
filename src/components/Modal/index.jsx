import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ children, handleClose }) => {
  return (
    <div className="modal">
      <button className="" onClick={handleClose}>
        <span aria-label="Fav Gif" role="img">
          <i className="fas fa-times-circle"></i>
        </span>
      </button>
      <div className="modal-content">{children}</div>
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
