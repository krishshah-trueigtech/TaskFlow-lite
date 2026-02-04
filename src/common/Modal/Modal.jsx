import React from "react";
import { createPortal } from "react-dom";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* <div className="modal-header">
          {title && <h2>{title}</h2>}
          <button className="modal-close-btn" onClick={onClose}>
            &times;
          </button>
        </div> */}
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
