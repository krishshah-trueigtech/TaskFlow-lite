import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-[1000] bg-black/5 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="animate-slide-down bg-primaryColor border border-white/10 shadow-2xl overflow-auto relative max-w-[90vw] max-h-[90vh] rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-2 right-2 z-10">
          <button
            className="bg-transparent text-2xl text-gray-400 hover:text-red-500 transition-colors p-2 leading-none"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
