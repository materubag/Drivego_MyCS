import React, { useState } from "react";
import axios from "axios";
import "../Styles/RecuperarContraseña.css";
import { BACK_URL } from "../config.js";

const RecuperarContraseña = ({ closeModal }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        BACK_URL+"/Correo_cont.php",
        { email },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data.status==true) {
        alert(response.data.message);
        closeModal();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      alert("Hubo un error al procesar la solicitud.");
    }
  };

  return (
    <div className="Recuperar-modal">
      <div className="Recuperar-content">
        <h2>Recuperar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Introduce tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit">
            Enviar
          </button>
        </form>
        <button className="btn-close" onClick={closeModal}>
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default RecuperarContraseña