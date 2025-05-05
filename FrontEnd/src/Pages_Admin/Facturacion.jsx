import React, { useState } from "react";
import "../Styles/Factura.css";
import { BACK_URL } from "../config.js";

const Facturacion= () => {
  const [cedula, setCedula] = useState("");
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [facturaUrl, setFacturaUrl] = useState(null);
  const [facturaId, setFacturaId] = useState(null);
  const [contratoUrl, setContratoUrl] = useState(null);
  const [contratoId, setContratoId] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true); 

    if (!cedula) {
      setError("Por favor, ingrese una cédula.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${BACK_URL}/getReservaPorCed.php?cedula=${cedula}`
      );
      const data = await response.json();

      if (data.success) {
        setReservas(data.data);
        if (data.data.length === 0) {
          setError("No se encontraron reservas para esta cédula.");
        }
      } else {
        setError(data.error || "No se encontraron reservas para esta cédula.");
      }
    } catch (err) {
      console.error("Error al consultar las reservas:", err);
      setError("Error al conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviewFactura = async (id_reserva, cedula_usu) => {
    if (facturaId === id_reserva) {
      setFacturaUrl(null);
      setFacturaId(null);
      return;
    }

    setContratoUrl(null);
    setContratoId(null);

    try {
      const response = await fetch(`${BACK_URL}/pdf_factura.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_reserva, cedula_usu }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setFacturaUrl(url);
        setFacturaId(id_reserva);
      } else {
        setError("Error al generar la factura.");
      }
    } catch (err) {
      console.error("Error al generar la factura:", err);
      setError("Error al conectar con el servidor.");
    }
  };

  const handlePreviewContrato = async (cedula_usu) => {
    if (contratoUrl) {
      setContratoUrl(null);
      setContratoId(null);
      return;
    }

    setFacturaUrl(null);
    setFacturaId(null);

    try {
      const response = await fetch(`${BACK_URL}/pdf_contrato.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cedula_usu }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setContratoUrl(url);
        setContratoId(cedula_usu);
      } else {
        setError("Error al generar el contrato.");
      }
    } catch (err) {
      console.error("Error al generar el contrato:", err);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="historial-container">
      <div className="historial-card">
        <h2>Consulta de Historial de Reservas</h2>
        <form onSubmit={handleSubmit} className="historial-form">
          <div className="form-group">
            <label htmlFor="cedula">Cédula del Cliente</label>
            <input
              type="text"
              id="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Ingrese la cédula"
              className="form-input"
            />
          </div>
          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Buscando..." : "Consultar"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        <div className="reservas-list">
          {hasSubmitted && reservas.length === 0 && !error && !isLoading && (
            <p>No se encontraron reservas para esta cédula.</p>
          )}

          {reservas.map((reserva) => (
            <details key={reserva.id_res} className="reserva-item">
              <summary>
                Reserva #{reserva.id_res} - {reserva.mar_veh} {reserva.mod_veh}
              </summary>
              <div className="reserva-detalles">
                <img
                  src={`${BACK_URL}/${
                    reserva.img_veh || "Public/Img_default.jpg"
                  }`}
                  alt={`Imagen de ${reserva.mar_veh} ${reserva.mod_veh}`}
                  className="vehiculo-imagen"
                  onError={(e) => {
                    e.target.src = "Public/Img_default.jpg";
                  }}
                />
                <p>
                  <strong>Conductor:</strong> {reserva.nom_usu_res}
                </p>
                <p>
                  <strong>Cédula:</strong> {reserva.ced_usu_res}
                </p>
                <p>
                  <strong>Matrícula:</strong> {reserva.matricula_veh}
                </p>
                <p>
                  <strong>Fecha de Reserva:</strong> {reserva.fec_res}
                </p>
                <p>
                  <strong>Fecha de Devolución:</strong> {reserva.fec_dev}
                </p>
                <p>
                  <strong>Estado del Vehículo:</strong>{" "}
                  {reserva.est_veh_dev || "No especificado"}
                </p>
                {reserva.tar_adi !== "0.00" && (
                  <p>
                    <strong>Tarifa Adicional:</strong> ${reserva.tar_adi}
                  </p>
                )}
                <p>
                  <strong></strong> {reserva.des_dev || ""}
                </p>
                <p>
                  <strong>Tipo de Vehículo:</strong>{" "}
                  {reserva.tip_veh || "No especificado"}
                </p>

                <button
                  onClick={() =>
                    handlePreviewFactura(reserva.id_res, reserva.ced_usu_res)
                  }
                  className="preview-button"
                >
                  {facturaId === reserva.id_res
                    ? "Cerrar Factura"
                    : "Ver Factura"}
                </button>

                {facturaId === reserva.id_res && facturaUrl && (
                  <div className="factura-container">
                    <iframe
                      src={facturaUrl}
                      width="100%"
                      height="600"
                      title="Factura"
                    />
                  </div>
                )}

                <button
                  onClick={() => handlePreviewContrato(reserva.ced_usu_res)}
                  className="preview-button"
                >
                  {contratoId === reserva.ced_usu_res
                    ? "Cerrar Contrato"
                    : "Ver Contrato"}
                </button>

                {contratoId === reserva.ced_usu_res && contratoUrl && (
                  <div className="factura-container">
                    <iframe
                      src={contratoUrl}
                      width="100%"
                      height="600"
                      title="Contrato"
                    />
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Facturacion;