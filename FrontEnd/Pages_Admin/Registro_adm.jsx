import React, { useEffect, useState } from 'react';
import "../Styles/Registro_adm.css";
import { validarEntrada, validarCadena } from '../Controles/Controles';
import axios from 'axios';
import {BACK_URL} from "../config.js";

const Registro_adm = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const [nom_usu, setNom_usu] = useState("");
  const [ape_usu, setApe_usu] = useState("");
  const [cor_usu, setCor_usu] = useState("");
  const [con_usu, setCont_usu] = useState("");
  const [tipo_usu, setTipo_usu] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!validarCadena(nom_usu, 3, 15)) {
      setError("El nombre de usuario debe contener entre 3 y 15 caracteres.");
      return;
    }
    if (!validarEntrada(nom_usu)) {
      setError("El nombre de usuario debe contener solo letras y números.");
      return;
    }
    if (!validarCadena(cor_usu, 5, 50)) {
      setError("El correo debe ser válido.");
      return;
    }

    try {
      const response = await axios.post(BACK_URL+"/Crear_Usuario.php", {
        nom_usu,
        ape_usu,
        cor_usu,
        con_usu,
        tipo_usu
      });

      if (response.data.status === true) {
        alert("Usuario registrado con éxito");
        console.log(response.data.message);
        closeModal();
        window.location.reload(); 
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error al conectar con el backend", error);
      alert("Hubo un problema al conectar con el servidor");
    }
  };

  return (
    <div className="register">
      <div className="modal-reg">
        <div className="modal-cont">
          <span className="close-button-reg" onClick={closeModal}>
            &times;
          </span>
          <h2>Nuevo Usuario</h2>
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
              value={con_usu}
              onChange={(e) => setCont_usu(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Tipo de Usuario</label>
            <select
              value={tipo_usu}
              onChange={(e) => setTipo_usu(e.target.value)}
            >
              <option value="">Seleccione tipo</option>
              <option value="Administrador">Administrador</option>
              <option value="Empleado">Empleado</option>
              <option value="Cliente">Cliente</option>
            </select>
          </div>
          <div className="button-group">
          <button className="btn_gua" onClick={handleRegister}>Guardar Usuario</button>
            <button className="btn_can" onClick={closeModal}>Cancelar</button>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro_adm;