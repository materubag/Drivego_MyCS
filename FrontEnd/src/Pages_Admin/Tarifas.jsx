import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Tarifas.css"
import AsigTarifa from "./Asig_tarifa"; 
import {BACK_URL} from "../config.js";

const Tarifas = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehiculos, setVehiculos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          BACK_URL+"/Mostrar_Veh.php"
        );
        if (response.data.status) {
          setVehiculos(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        console.error("Error al cargar los vehículos:", err);
        setError(
          "Error al cargar los vehículos. Por favor, intente nuevamente."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehiculos();
  }, []);

  const handleAssignClick = (vehicle) => {
    setSelectedVehicle(vehicle);
    setShowModal(true);
  };

 
  const handleSave = async (updatedVehicle) => {
    const vehicleData = {
      mat_veh: updatedVehicle.mat_veh, 
      precio_veh: updatedVehicle.precio_veh, 
    };
    try {
      const response = await fetch(
        BACK_URL+"/Actualizar_tarifa.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vehicleData), 
        }
      );

      const data = await response.json();

      if (data.status) {
      
        setVehiculos((prevVehiculos) =>
          prevVehiculos.map((veh) =>
            veh.mat_veh === updatedVehicle.mat_veh ? updatedVehicle : veh
          )
        );
        setShowModal(false);
        setSelectedVehicle(null);
        alert(data.message)
      } else {
        console.error("Error al actualizar:", data.message);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error en la actualización:", error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedVehicle(null);
  };

  if (isLoading) {
    return <p>Cargando vehículos...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="vehicle-rate-assignment-card">
      <div className="vehicle-rate-assignment-header">
        <h2 className="vehicle-rate-assignment-title">
          Asignación de Tarifas de Vehículos
        </h2>
      </div>
      <div className="vehicle-rate-assignment-content">
        <table className="vehicle-rate-assignment-table">
          <thead>
            <tr>
              <th className="vehicle-rate-assignment-table-head">Placa</th>
              <th className="vehicle-rate-assignment-table-head">Marca</th>
              <th className="vehicle-rate-assignment-table-head">Modelo</th>
              <th className="vehicle-rate-assignment-table-head">Tarifa</th>
              <th className="vehicle-rate-assignment-table-head">Acción</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((vehicle) => (
              <tr key={vehicle.mat_veh}>
                <td className="vehicle-rate-assignment-table-cell">
                  {vehicle.mat_veh}
                </td>
                <td className="vehicle-rate-assignment-table-cell">
                  {vehicle.mar_veh}
                </td>
                <td className="vehicle-rate-assignment-table-cell">
                  {vehicle.mod_veh}
                </td>
                <td className="vehicle-rate-assignment-table-cell">
                  {vehicle.precio_veh || "Sin tarifa asignada"}
                </td>
                <td className="vehicle-rate-assignment-table-cell">
                  <button
                    className="vehicle-rate-assignment-action-button"
                    onClick={() => handleAssignClick(vehicle)}
                  >
                    Asignar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

   
      {showModal && (
        <AsigTarifa
          vehicle={selectedVehicle}
          onSave={handleSave} 
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default Tarifas;