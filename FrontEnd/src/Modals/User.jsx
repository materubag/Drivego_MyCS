import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/User.css"; 
import CambiarContraseña from "../Modals/CambiarContraseña.jsx";


const ModalUser = ({ closeModal, onLogout }) => {
  const navigate = useNavigate();
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleHistoryClick = () => {
    navigate("/historial");
    closeModal();
  };

  const handleOpenChangePassword = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseChangePassword = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <>
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
              <button onClick={handleOpenChangePassword}>Cambiar Contraseña</button>
            </li>
            <li>
              <button onClick={onLogout} className="logout-button">
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      </div>

      {showChangePasswordModal && (
        <CambiarContraseña closeModal={handleCloseChangePassword} />
      )}
    </>
  );
};

export default ModalUser;