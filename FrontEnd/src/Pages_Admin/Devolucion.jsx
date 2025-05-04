import React, { useState, useEffect } from "react";
import "../Styles/Devolucion.css";
import { BACK_URL } from "../config.js";

const condicionVehiculo = {
  exterior: [
    { id: "carroceria", label: "Carrocería" },
    { id: "rayones", label: "Rayones" },
    { id: "pintura", label: "Pintura" },
    { id: "llantas", label: "Llantas" },
    { id: "vidrios", label: "Vidrios/Parabrisas" },
    { id: "luces", label: "Sistema de Luces" },
  ],
  interior: [
    { id: "asientos", label: "Asientos" },
    { id: "tapiceria", label: "Tapicería" },
    { id: "tablero", label: "Tablero" },
    { id: "controles", label: "Controles/Botones" },
    { id: "aire", label: "Aire Acondicionado" },
    { id: "radio", label: "Radio/Sistema de Audio" },
  ],
  mecanico: [
    { id: "motor", label: "Motor" },
    { id: "frenos", label: "Sistema de Frenos" },
    { id: "direccion", label: "Dirección" },
    { id: "suspension", label: "Suspensión" },
    { id: "transmision", label: "Transmisión" },
    { id: "bateria", label: "Batería" },
  ],
};

const Devolucion = () => {
  const [reservas, setReservas] = useState([]);
  const [idReserva, setIdReserva] = useState("");
  const [seleccionCondiciones, setSeleccionCondiciones] = useState({});
  const [condicionesDescripcion, setCondicionesDescripcion] = useState({});
  const [estadoVehiculo, setEstadoVehiculo] = useState("NUEVO");
  const [tarifaAdicional, setTarifaAdicional] = useState(0);
  const [tarifaAdicionalVisible, setTarifaAdicionalVisible] = useState(false);
  const [activeCategoria, setActiveCategoria] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch(`${BACK_URL}/getReservas.php`);
        const data = await response.json();
        if (data.success) {
          setReservas(data.data);
        } else {
          alert("Error al cargar las reservas.");
        }
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
      }
    };

    fetchReservas();
  }, []);

  const handleCheckboxChange = (id) => {
    setSeleccionCondiciones((prev) => {
      const newSelections = { ...prev, [id]: !prev[id] };
      const nuevoEstado = Object.values(newSelections).some((val) => val)
        ? "DESCOMPUESTO"
        : "NUEVO";
      setEstadoVehiculo(nuevoEstado);
      return newSelections;
    });
  };

  const handleDescriptionChange = (id, value) => {
    setCondicionesDescripcion((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const toggleCategory = (category) => {
    setActiveCategoria(activeCategoria === category ? null : category);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const seleccionados = Object.entries(seleccionCondiciones)
      .filter(([_, isSelected]) => isSelected);
  
    const descripcionDevolucion = seleccionados
      .map(([id]) => condicionVehiculo.exterior.concat(condicionVehiculo.interior, condicionVehiculo.mecanico)
        .find((item) => item.id === id)?.label)
      .join(", ");
  
    const descripcionExtendida = seleccionados
      .map(
        ([id]) =>
          `${condicionVehiculo.exterior.concat(condicionVehiculo.interior, condicionVehiculo.mecanico)
            .find((item) => item.id === id)?.label}: ${condicionesDescripcion[id] || "Sin descripción"}`
      )
      .join(", ");
  
    if (seleccionados.length === 0) {
      alert("Por favor, seleccione al menos una condición del vehículo.");
      setIsLoading(false);
      return;
    }
  
    const data = {
      idReserva,
      estadoVehiculo,
      descripcionDevolucion: `Daños: ${descripcionDevolucion}`,
      descripcionExtendida,
      tarifaAdicional: tarifaAdicionalVisible ? tarifaAdicional : 0,
    };
  
    try {
      const response = await fetch(`${BACK_URL}/devolucion.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Devolución registrada exitosamente.");
        setIdReserva("");
        setSeleccionCondiciones({});
        setCondicionesDescripcion({});
        setTarifaAdicional(0);
        setTarifaAdicionalVisible(false);
      } else {
        alert(result.error || "Error al registrar la devolución.");
      }
    } catch (error) {
      console.error("Error en la devolución:", error);
      alert("Error en la devolución.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="devolucion-container">
      <div className="form-card">
        <h2 className="form-title">
          <i className="car-icon">🚗</i>
          Registrar Devolución de Vehículo
        </h2>
        <form onSubmit={handleSubmit} className="devolucion-form">
          <div className="form-group">
            <label>Reserva:</label>
            <select
              value={idReserva}
              onChange={(e) => setIdReserva(e.target.value)}
              required
              className="select-input"
            >
              <option value="" disabled>
                Seleccione una reserva
              </option>
              {reservas.map((reserva) => (
                <option key={reserva.id_res} value={reserva.id_res}>
                  {`${reserva.ced_usu_res} - ${reserva.nom_usu_res} - ${reserva.mar_veh} ${reserva.mod_veh}`}
                </option>
              ))}
            </select>
          </div>

          <div className="checklist-container">
            {Object.entries(condicionVehiculo).map(([category, items]) => (
              <div key={category} className="category-section">
                <button
                  type="button"
                  className={`category-toggle ${
                    activeCategoria === category ? "active" : ""
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  <span className="toggle-icon">
                    {activeCategoria === category ? "−" : "+"}
                  </span>
                </button>
                {activeCategoria === category && (
                  <div className="checklist-items">
                    {items.map((item) => (
                      <div key={item.id} className="checklist-item">
                        <div className="checkbox-container">
                          <input
                            type="checkbox"
                            id={item.id}
                            checked={seleccionCondiciones[item.id] || false}
                            onChange={() => handleCheckboxChange(item.id)}
                          />
                          <label htmlFor={item.id} className="checkbox-label">
                            {item.label}
                          </label>
                        </div>
                        {seleccionCondiciones[item.id] && (
                          <textarea
                            placeholder={`Descripción del estado: ${item.label}`}
                            value={condicionesDescripcion[item.id] || ""}
                            onChange={(e) =>
                              handleDescriptionChange(item.id, e.target.value)
                            }
                            className="description-input"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="form-group">
            <div className="switch-container">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={tarifaAdicionalVisible}
                  onChange={() =>
                    setTarifaAdicionalVisible(!tarifaAdicionalVisible)
                  }
                />
                <span className="slider round"></span>
              </label>
              <span className="switch-label">Agregar Tarifa Adicional</span>
            </div>

            {tarifaAdicionalVisible && (
              <div className="tarifa-input">
                <label>Tarifa Adicional ($):</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={tarifaAdicional}
                  onChange={(e) =>
                    setTarifaAdicional(parseFloat(e.target.value))
                  }
                  className="number-input"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "Registrar Devolución"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Devolucion;