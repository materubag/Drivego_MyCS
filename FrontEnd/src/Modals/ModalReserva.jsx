import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/ModalReserva.css";
import { BACK_URL } from "../config.js";

registerLocale("es", es);

const ModalReserva = ({ vehiculo, onClose }) => {
  const [form, setForm] = useState({
    cedula: "",
    nombre: "",
    fechaInicio: null,
    aceptaTerminos: false, 
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (date) => {
    setForm((prevForm) => ({
      ...prevForm,
      fechaInicio: date,
    }));
  };

  const validarFormulario = () => {
    if (
      !form.cedula ||
      !form.nombre ||
      !form.fechaInicio ||
      !vehiculo ||
      !form.aceptaTerminos 
    ) {
      setError("Por favor, complete todos los campos y acepte los términos.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const data = {
      cedulaUsuario: form.cedula,
      nombreUsuario: form.nombre,
      matriculaVehiculo: vehiculo.mat_veh,
      fechaReserva: form.fechaInicio.toISOString().split("T")[0],
      metodoPago: form.metodoPago,
    };

    try {
      const response = await fetch(`${BACK_URL}/reserva.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess("Reserva realizada con éxito.");
        onClose();
      } else {
        setError(result.error || "Error al procesar la reserva.");
      }
    } catch {
      setError("Error de red o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-reser">
      <div className="modal-contenido">
        <h2>Reservar Vehículo</h2>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="form-group">
          <label>Cédula:</label>
          <input
            type="text"
            name="cedula"
            value={form.cedula}
            onChange={handleChange}
            placeholder="Ingrese su cédula"
          />
        </div>

        <div className="form-group">
          <label>Nombre Completo:</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ingrese su nombre completo"
          />
        </div>

        <div className="form-group">
          <label>Fecha de Reserva:</label>
          <DatePicker
            selected={form.fechaInicio}
            onChange={handleDateChange}
            minDate={new Date()}
            className="form-input"
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona una fecha"
            locale={es}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input  
              type="checkbox"
              name="aceptaTerminos"
              checked={form.aceptaTerminos}
              onChange={handleChange}
            />
            Acepto los{" "}
            <a href={`${BACK_URL}reportes/contratoVacio.php`} target="_blank" rel="noopener noreferrer">
              términos y condiciones del contrato
            </a>
          </label>
        </div>

        <button
          className={`submit-but ${isLoading ? "loading" : ""}`}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Procesando..." : "Confirmar Reserva"}
        </button>

        <button className="close-but" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalReserva;
