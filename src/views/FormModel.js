import React from 'react';

function ConfirmModal({ title, onConfirm, onClose, okText, cancelText }) {
  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  };

  const modalHeaderStyle = {
    marginBottom: '10px',
  };

  const modalFooterStyle = {
    marginTop: '10px',
    textAlign: 'right',
  };

  return (
    <div style={modalStyle}>
      <div style={modalContentStyle}>
        <div style={modalHeaderStyle}>
          <h3>{title}</h3>
        </div>
        <div>
          <p>Are you sure you want to proceed?</p>
        </div>
        <div style={modalFooterStyle}>
          <button className="btn cancel-btn" onClick={onClose}>{cancelText}</button>
          <button className="btn confirm-btn" onClick={onConfirm}>{okText}</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
