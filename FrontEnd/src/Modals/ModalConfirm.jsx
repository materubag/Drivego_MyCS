import React from "react";


const ModalConfirm= ({ closeModal, onLogout }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={closeModal}>
          &times;
        </button>
        <h3>¿Estás seguro de que quieres cerrar sesión?</h3>
        <div className="modal-buttons">
          <button onClick={onLogout} className="cancel-logout-button">Confirmar</button>
          <button onClick={closeModal} className="confirm-logout-button">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;