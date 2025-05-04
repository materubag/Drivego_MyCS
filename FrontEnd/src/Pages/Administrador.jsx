import React, { useState, useEffect } from "react";
import "../Styles/Administrador.css";
import { useNavigate } from "react-router-dom";
import Ges_user from "./Gestion_usuarios";
import Ges_veh from "./Gestion_vehiculos";
import Report from "./Reportes";
import Tariff from "./Tarifas";
import ModalConfirm from "./ModalConfirm";

const Administrador = () => {
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
      case "usuarios":
        return <Ges_user />;
      case "vehiculos":
        return <Ges_veh />;
      case "reportes":
        return <Report />
      case "tarifas":
        return <Tariff />;
      default:
        return <Ges_user />;
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
        <h1>Sistema de Administración</h1>
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
            <li onClick={() => setSelectedComponent("usuarios")}>
              <button>
                <i className="fa-solid fa-users"></i>
                {menuVisible && <span>Gestión de Usuarios</span>}
              </button>
            </li>
            <li onClick={() => setSelectedComponent("vehiculos")}>
              <button>
                <i className="fa-solid fa-car-side"></i>
                {menuVisible && <span>Gestión de Vehículos</span>}
              </button>
            </li>
            <li onClick={() => setSelectedComponent("reportes")}>
              <button>
                <i className="fa-solid fa-chart-column"></i>
                {menuVisible && <span>Reportes</span>}
              </button>
            </li>
            <li onClick={() => setSelectedComponent("tarifas")}>
              <button>
                <i className="fa-solid fa-dollar-sign"></i>
                {menuVisible && <span>Tarifas</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>

      <main className="admin-body">
        {renderSelectedComponent()}
      </main>

      {showUserModal && (
        <ModalConfirm
          closeModal={closeUserModal}
          onLogout={handleLogout}
          
        />
      )}
    </div>
  );
};

export default Administrador;