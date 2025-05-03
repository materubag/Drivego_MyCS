import React, { useState } from "react";
import axios from "axios";
import "../Styles/CambiarContraseña.css";
import {BACK_URL} from "../config.js";

const CambiarContraseña = ({ closeModal }) => {
  const [cont, setCont] = useState("");
  const [cont_temp, setCont_temp] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        BACK_URL+"/CambiarContraseña.php",
        {
          cont_temp,
          cont,
        }
      );

      if (response.data.status === true) {
        alert(response.data.message);
        closeModal();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor", error);
      alert("Hubo un problema al cambiar la contraseña.");
    }
  };

  return (
    <div className="Recuperar-modal">
      <div className="Recuperar-content">
        <h2>Cambiar Contraseña</h2>
        <input
          type="password"
          placeholder="Contraseña Temporal"
          value={cont_temp}
          onChange={(e) => setCont_temp(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={cont}
          onChange={(e) => setCont(e.target.value)}
        />
        <button onClick={handleChangePassword} className="btn-submit">
          Cambiar Contraseña
        </button>
        <button onClick={closeModal} className="btn-close">
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default CambiarContraseña;