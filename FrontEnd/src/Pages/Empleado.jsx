import React, { useState, useEffect } from "react";
import "../Styles/Administrador.css";
import { useNavigate } from "react-router-dom";
import Reserva from "../Pages_Admin/Reserva";
import Devolucion from "../Pages_Admin/Devolucion";
import Facturacion from "../Pages_Admin/Facturacion";
import ModalConfirm from "../Modals/ModalConfirm";

const Empleado = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const navbar = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || null);
    return () => {
      if (navbar) navbar.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "reserva":
        return <Reserva />;
      case "devolucion":
        return <Devolucion />;
      case "facturacion":
        return <Facturacion />;
      default:
        return <Reserva />;
    }
  };

  const openUserModal = () => {
    setShowUserModal(true);
  };

  const closeUserModal = () => {
    setShowUserModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    closeUserModal();
    navigate("/");
    window.location.reload();
  };

  return (
    <div>
      <header className="header-admin">
        <button className="bar-ad" onClick={toggleMenu}>
          <i className={`fa-solid ${menuVisible ? "fa-times" : "fa-bars"}`}></i>
        </button>
        <h1>Sistema de Empleado</h1>
        <nav className="nav-admin">
          {user && (
            <button className="user-icon-button" onClick={openUserModal}>
              <i className="fa-solid fa-user"></i>
              <span>{user.nombre}</span>
            </button>
          )}
        </nav>
      </header>

      <div className={`menu-admin ${menuVisible ? "visible" : ""}`}>
        <div className="menu-cont">
          <ul>
            <li onClick={() => setSelectedComponent("reserva")}>
              <button>
                <i className="fa-solid fa-calendar-check"></i>
                {menuVisible && <span>Reservas</span>}
              </button>
            </li>
            <li onClick={() => setSelectedComponent("devolucion")}>
              <button>
                <i className="fa-solid fa-undo"></i>
                {menuVisible && <span>Devoluciones</span>}
              </button>
            </li>
            <li onClick={() => setSelectedComponent("facturacion")}>
              <button>
                <i className="fa-solid fa-file-invoice-dollar"></i>
                {menuVisible && <span>Facturación</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <main className="admin-body">{renderSelectedComponent()}</main>

      {showUserModal && (
        <ModalConfirm closeModal={closeUserModal} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Empleado;