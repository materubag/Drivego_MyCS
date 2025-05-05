import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ModalLogin from "../Modals/Login";
import ModalUser from "../Modals/User";
import "../Styles/Navbar.css";

const linksCliente = [
  { name: "Home", href: "/home" },
  { name: "Sucursales", href: "/oficinas" },
  { name: "Vehiculos", href: "/venta" },
  { name: "Contactos", href: "/contactos" },
];

const linksAdmin = [
  { name: "Dashboard", href: "/administrador" },
  { name: "Usuarios", href: "/usuarios" },
  { name: "Reportes", href: "/reportes" },
  { name: "Configuración", href: "/configuracion" },
];

const Navbar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser || null);
  }, [location.pathname]);

  const handleLinkClick = (href) => {
    setActiveLink(href);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
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
    setActiveLink("/home");
    closeUserModal();
  };

  return (
    <header className="header-nav">
      <a href="/" className="logo">
        <img src="/Logo2.png" alt="Logo" />
      </a>
      <nav className="navbar">
        {(user?.rol === "Administrador" ? linksAdmin : linksCliente).map((x) => (
          <Link
            key={x.href}
            to={x.href}
            className={`nav-item ${activeLink === x.href ? "active" : ""}`}
            onClick={() => handleLinkClick(x.href)}
          >
            {x.name}
            {activeLink === x.href && <span className="active-indicator"></span>}
          </Link>
        ))}
        {user ? (
          <button className="user-icon-button" onClick={openUserModal}>
            <i className="fa-solid fa-user"></i>
            <span>{user.nombre}</span>
          </button>
        ) : (
          <button className="Button-head" onClick={openLoginModal}>
            <i className="fa-solid fa-user"></i>
            <i>Iniciar Sesión</i>
          </button>
        )}
      </nav>

      {showLoginModal && <ModalLogin closeModal={closeLoginModal} />}
      {showUserModal && (
        <ModalUser
          closeModal={closeUserModal}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
};

export default Navbar;