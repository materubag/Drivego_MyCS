import React, { useState, useEffect } from "react";
import "../Styles/RegistrarSesion.css";
import axios from "axios";
import { validarEntrada, validarCadena } from "../Controller/ControlCadenas.js";
import {BACK_URL} from "../config.js";


const Registro = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [nom_usu, setNom_usu] = useState("");
  const [ape_usu, setApe_usu] = useState("");
  const [cor_usu, setCor_usu] = useState("");
  const [cont1_usu, setCont1_usu] = useState("");
  const [con_usu, setCont2_usu] = useState("");
  const [error, setError] = useState("");
  const tipo_usu='Cliente';

  const handleRegistro = async () => {

    if (!validarEntrada(nom_usu)) {
      setError("El nombre de usuario debe contener solo letras y números.");
      return;
    }
    if (!validarCadena(ape_usu, 3, 15)) {
      setError("El apellido debe contener entre 3 y 15 caracteres.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(cor_usu)) {
      setError("Por favor, ingresa un correo válido.");
      return;
    }
    if (!validarCadena(cont1_usu, 6, 20)) {
      setError("La contraseña debe contener entre 6 y 20 caracteres.");
      return;
    }
    if (cont1_usu !== con_usu) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post(
        BACK_URL+"/CrearUsuario.php",
        {
          nom_usu,
          ape_usu,
          cor_usu,
          con_usu,
          tipo_usu

        }
      );

      if (response.data.status) {
        alert("Usuario registrado con éxito.");
        console.log(response.data.message);
        closeModal();
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error al conectar con el backend", error);
      setError("Hubo un problema al conectar con el servidor.");
    }
  };

  return (
    <div className="register">
      <div className="modal-reg">
        <div className="modal-cont">
          <span className="close-button-reg" onClick={closeModal}>
            &times;
          </span>
          <a href="/" className="let">
            <img src="drive.png"alt="Logo" />
          </a>
          <h2>Registrarse</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="input-group">
            <div className="input-container">
              <label>Nombre</label>
              <input
                type="text"
                placeholder="Nombre del usuario"
                value={nom_usu}
                onChange={(e) => setNom_usu(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label>Apellido</label>
              <input
                type="text"
                placeholder="Apellido del usuario"
                value={ape_usu}
                onChange={(e) => setApe_usu(e.target.value)}
              />
            </div>
          </div>
          <div className="input-container">
            <label>Correo Electrónico</label>
            <input
              type="email"
              placeholder="ejemplo@correo.com"
              value={cor_usu}
              onChange={(e) => setCor_usu(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña del usuario"
              value={cont1_usu}
              onChange={(e) => setCont1_usu(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Confirmar Contraseña</label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              value={con_usu}
              onChange={(e) => setCont2_usu(e.target.value)}
            />
          </div>
          <button className="btn_reg_ses" onClick={handleRegistro}>
            Registrarse
          </button>
        </div>
      </div>
    </div>
  );
};

export default Registro;