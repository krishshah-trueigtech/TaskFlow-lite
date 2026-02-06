import React from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="flex fixed top-0 left-0 w-full h-full bg-opacity-5 justify-center items-center z-1000 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="modal-content  bg-primaryColor border-sm shadow-[0_5px_15px_rgba(0,0,0,0.3)] relative max-w-[90dvw]  "
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div className="modal-header"> */}
        {/* {title && <h2>{title}</h2>} */}
        <div className="flex absolute right-0 p-2">
          <button
            className="modal-close-btn  border-none z-1 "
            onClick={onClose}
          >
            &times;
          </button>
        </div>

        {/* </div> */}
        {/* <div className="modal-body"> */}

        {children}

        {/* </div> */}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
