import React from "react";
import { useNavigate } from "react-router-dom";

const ModalUser = ({ closeModal, onLogout, onChangePassword }) => {
  const navigate = useNavigate();

  const handleHistoryClick = () => {
    navigate("/historial");
    closeModal();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={closeModal}>
          &times;
        </button>
        <h3>Opciones de Usuario</h3>
        <ul className="modal-options">
          <li>
            <button onClick={handleHistoryClick}>Historial de reserva</button>
          </li>
          <li>
            <button onClick={onChangePassword}>Cambiar Contraseña</button>
          </li>
          <li>
            <button onClick={onLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ModalUser;