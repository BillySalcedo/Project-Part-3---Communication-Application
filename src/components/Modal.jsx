import React from 'react';
import '../css/Modal.css';

function Modal(props) {
  // Render the modal component with close, cancel, and confirm buttons
  return (
    <div className="modal">
      <div className="modal-content">
        {/* Display the close button on the top right corner */}
        <button className="modal-close" onClick={props.onClose}>&times;</button>
        {/* Render the children components passed to the modal */}
        {props.children}
        {/* Display cancel and confirm buttons below the children */}
        <div className="modal-actions">
          <button className="modal-cancel" onClick={props.onClose}>Cancel</button>
          <button className="modal-ok" onClick={props.onConfirm}>Ok</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
