import React, { useState } from "react";
import axios from "axios";
import "../Styles/Recuperar_cont.css";
import { BACK_URL } from "../config.js";

const Recuperar_cont = ({ closeModal }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
   
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

export default Recuperar_cont