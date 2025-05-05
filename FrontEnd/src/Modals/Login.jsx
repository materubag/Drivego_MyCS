import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import axios from "axios";
import Registro from "../Modals/RegistrarSesion.jsx";
import Recuperar from "../Modals/RecuperarContraseña.jsx";
import CambiarContraseña from "../Modals/CambiarContraseña.jsx";
import {BACK_URL} from "../config.js";

const Login = ({ closeModal }) => {
  const [correo_usuario, setCorreo] = useState("");
  const [contrasena, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        BACK_URL+"/login.php",
        {
          correo_usuario,
          contrasena,
        }
      );

      if (response.data.status === true) {
        console.log(response.data);
        const userData = {
          nombre: response.data.nombre || "Usuario",
          rol: response.data.rol,
          correo: correo_usuario, 
        };
        localStorage.setItem("user", JSON.stringify(userData));
      
        if (response.data.redirect === "si") {
          console.log("si abre");
          toggleChangePasswordModal();
        } else if (response.data.rol === "Cliente") {
            window.location.reload();
          closeModal();
        } else if (response.data.rol === "Administrador") {
          console.log("Inicio de sesión como Administrador");
          closeModal();
          navigate("/administrador");
        }else if (response.data.rol === "Empleado") {
          console.log("Inicio de sesión como Empleado");
          closeModal();
          navigate("/empleado");
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error al conectar con el backend", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  };

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const toggleChangePasswordModal = () => {
    setShowChangePasswordModal(!showChangePasswordModal);
  };

  return (
    <>
      <div className="overlay" onClick={closeModal}></div>
      <div className="modal">
        <div className="modal-content">

          <button onClick={closeModal} className="close-button" >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="login-logo-container">
            <a href="/" className="login-logo-link">
              <img src="/Logo-sin_fodo.png" alt="Logo" className="login-logo" />
            </a>
          </div>
          
          <h2 className="login-titulo">Iniciar Sesión</h2>
          <div className="login-form">
            <div className="login-input-container">
              <div className="login-input-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Ingrese su correo"
                value={correo_usuario}
                onChange={(e) => setCorreo(e.target.value)}
                className="login-input"
              />
            </div>
            <div className="login-input-container">
              <div className="login-input-icon">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ingrese su contraseña"
                value={contrasena}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
              />
          <div
             className="login-toggle-password"
             onClick={() => setShowPassword(!showPassword)}
          >
          {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <div className="login-forgot-password">
              <a href="#" className="login-forgot-link">
                ¿Olvidaste la contraseña?
              </a>
            </div>
            <button
              onClick={handleLogin}
              className="login-button"
            >
              Iniciar Sesión
            </button>
            <div className="login-register-container">
              <p className="login-register-text">
                ¿No tienes cuenta? {" "}
                <a href="#" className="login-register-link">
                  Regístrate
                </a>
              </p>

            </div>
          </div>
        </div>
      </div>
      {showForgotPasswordModal && (
        <Recuperar closeModal={toggleForgotPasswordModal} />
      )}
      {showRegisterModal && <Registro closeModal={toggleRegisterModal} />}
      {showChangePasswordModal && (
        <CambiarContraseña closeModal={toggleChangePasswordModal} />
      )}
    </>
  );
};

export default Login;