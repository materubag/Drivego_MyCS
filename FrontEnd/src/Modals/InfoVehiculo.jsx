import React, { useState, useEffect } from "react";
import "../Styles/InfoVehiculo.css";
import ModalLogin from "../Modals/Login";
import { BACK_URL } from "../config.js";
import DefaultImg from "/public/Img_default.jpg";

const InfoVehiculo = ({ vehiculo, onClose }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  const handleVenta = () => {
    if (!userInfo) {
      setShowLoginModal(true);
    } else {
      alert("Función de venta deshabilitada temporalmente.");
    }
  };

  const closeLoginModal = () => setShowLoginModal(false);

  if (!vehiculo) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>
          {vehiculo.mar_veh} {vehiculo.mod_veh}
        </h2>
        <div className="imagen-contain">
          <img
            src={`${BACK_URL}/${vehiculo.img_veh || DefaultImg}`}
            alt={`${vehiculo.mar_veh} ${vehiculo.mod_veh}`}
            className="vehiculo-img"
            style={{
              width: "420px",
              height: "250px",
              objectFit: "cover",
            }}
            onError={(e) => {
              e.target.src = DefaultImg;
            }}
          />
        </div>
        <div className="modal-info">
          <p>
            <i className="fa-solid fa-car-side">
              <strong> Tipo: {vehiculo.tip_veh}</strong>
            </i>
          </p>
          <p>
            <i className="fa-solid fa-calendar">
              <strong> Año: {vehiculo.anio_veh}</strong>
            </i>
          </p>
          <p>
            <i className="fa-solid fa-gear">
              <strong> Transmisión: {vehiculo.tip_trans_veh}</strong>
            </i>
          </p>
          <p>
            <i className="fa-solid fa-gas-pump">
              <strong> Combustible: {vehiculo.combustible}</strong>
            </i>
          </p>
          <p>
            <i className="fa-solid fa-user">
              <strong> Capacidad: {vehiculo.num_ocu_veh} personas</strong>
            </i>
          </p>
          <p>
            <i className="fa-solid fa-car-side">
              <strong> Puertas: {vehiculo.num_pue_veh} puertas</strong>
            </i>
          </p>
          <p>
            <i className="fa-solid fa-dollar-sign">
              <strong> Tarifa: {vehiculo.precio_veh} / día</strong>
            </i>
          </p>
        </div>
        <div className="modal-buttons">
          <button className="alquilar-button" onClick={handleVenta}>
            Comprar
          </button>
          <button className="close-button" onClick={onClose}>
            CERRAR
          </button>
        </div>
      </div>

      {showLoginModal && <ModalLogin closeModal={closeLoginModal} />}
    </div>
  );
};

export default InfoVehiculo;