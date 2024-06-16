// components/Modal.tsx
import React from "react";

interface ModalProps {
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Task</h2>
          <button
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
            onClick={closeModal}
          >
            &#x2715;
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
