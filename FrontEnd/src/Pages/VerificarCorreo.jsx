import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Styles/VerificarCorreo.css"; 
import {BACK_URL} from "../config.js";

const VerificarCorreo = () => {
  const [correo, setCorreo] = useState("");
  const [token, setToken] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const navbar = document.querySelector("header");
    const footer = document.querySelector("footer");
    if (navbar) navbar.style.display = "none";
    if (footer) footer.style.display = "none";

    const params = new URLSearchParams(window.location.search);
    const correoParam = params.get("correo");
    const tokenParam = params.get("token");

    if (correoParam) setCorreo(correoParam);
    if (tokenParam) setToken(tokenParam);
    return () => {
      if (navbar) navbar.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, []);

  const handleVerificar = async () => {
    if (!correo || !token) {
      setMensaje("Por favor, ingresa el correo y el token.");
      return;
    }

    try {
      const response = await axios.post(
        BACK_URL+"/Verificar_usuario.php",
        { correo, token }
      );

      if (response.data.status) {
        setMensaje("¡Correo verificado con éxito! Ahora puedes iniciar sesión.");
        setTimeout(() => {
          navigate("/"); 
        }, 2000);
      } else {
        setMensaje(response.data.message || "Verificación fallida.");
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="verificar-correo">
      <div className="modal-verif">
        <div className="modal-cont-verif">
          <a href="/" className="let">
            <img src="/drive.png" alt="Logo" />
          </a>
          <h2>Verificar Correo</h2>
          {mensaje && <p style={{ color: mensaje.includes("éxito") ? "green" : "red" }}>{mensaje}</p>}
          <div className="input-container">
            <label>Correo Electrónico</label>
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Token de Verificación</label>
            <input
              type="text"
              placeholder="Token recibido en tu correo"
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </div>
          <button className="btn-verificar" onClick={handleVerificar}>
            Verificar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificarCorreo;