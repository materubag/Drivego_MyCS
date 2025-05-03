import React, { useState } from "react";
import "../Styles/Asig_tarifa.css";

const AsigTarifa = ({ vehicle, onSave, onCancel }) => {
  const [tarifa, setTarifa] = useState(vehicle.precio_veh || "");

  const handleInputChange = (e) => {
    setTarifa(e.target.value);
  };

  const saveRate = () => {
    const updatedVehicle = { ...vehicle, precio_veh: tarifa };
    onSave(updatedVehicle);
    
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Asignar Tarifa</h3>
        <p>
          Vehículo: {vehicle.mar_veh} {vehicle.mod_veh}
        </p>
        <p>Placa: {vehicle.mat_veh}</p>
        <label>
          Tarifa:
          <input
            type="text"
            value={tarifa}
            onChange={handleInputChange}
          />
        </label>
        <div className="modal-buttons">
          <button onClick={saveRate}>Guardar</button>
          <button onClick={onCancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default AsigTarifa;