import React, { useEffect, useState } from "react";
import ModalGes from "./Registro_veh_adm";
import EditVehModal from "./Edit_veh_adm";
import "../Styles/Gestion_vehiculos.css";
import { BACK_URL } from "../config.js";

const GestionVehiculos = () => {
  const [veh, setVeh] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVeh, setEditingVeh] = useState(null);

  const handleSessionClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEditClick = (veh) => {
    setEditingVeh(veh);
  };

  const handleDeleteClick = (veh) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este vehículo?")) {
      fetch(`${BACK_URL}/Borrar_Vehiculo.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mat_veh: veh.mat_veh }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status) {
            setVeh((prevVeh) =>
              prevVeh.filter((item) => item.mat_veh !== veh.mat_veh)
            );
            alert(data.message);
          } else {
            alert("Error al eliminar el vehículo.");
          }
        })
        .catch((error) => {
          alert("Error al eliminar el vehículo.");
        });
    }
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    Object.entries(editingVeh).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    fetch(`${BACK_URL}/Editar_Vehiculos.php`, {
      method: "POST",
      body: formData, 
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setVeh((prevVeh) =>
            prevVeh.map((v) => (v.mat_veh === editingVeh.mat_veh ? editingVeh : v))
          );
          setEditingVeh(null);
          alert(data.message);
          console.log(data.message);
        } else {
          alert("Error al actualizar el vehículo.");
        }
      })
      .catch(() => {
        alert("Error en la actualización del vehículo.");
      });
  };
  
  

  useEffect(() => {
    fetch(`${BACK_URL}/Ver_Vehiculos.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setVeh(data.veh);
        } else {
          alert("Error al cargar vehículos.");
        }
      })
      .catch((error) => alert("Error al cargar vehículos."));
  }, []);

  return (
    <div className="card_veh">
      <div className="car-head">
        <h2 className="car-tit">Gestión de Vehículos</h2>
        <button className="btn-ag" onClick={handleSessionClick}>
          <i className="fa-solid fa-plus"></i> Nuevo Vehículo
        </button>
      </div>
      <div className="car-cont">
        <table className="tab-cont">
          <thead>
            <tr>
              <th className="tab-head">Marca</th>
              <th className="tab-head">Modelo</th>
              <th className="tab-head">Año</th>
              <th className="tab-head">Tipo</th>
              <th className="tab-head">Matrícula</th>
              <th className="tab-head">Estado</th>
              <th className="tab-head">Combustible</th>
              <th className="tab-head">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {veh.map((vehi) => (
              <tr key={vehi.mat_veh}>
                <td className="tab-cell">{vehi.mar_veh}</td>
                <td className="tab-cell">{vehi.mod_veh}</td>
                <td className="tab-cell">{vehi.anio_veh}</td>
                <td className="tab-cell">{vehi.tip_veh}</td>
                <td className="tab-cell">{vehi.mat_veh}</td>
                <td className="tab-cell">{vehi.est_veh}</td>
                <td className="tab-cell">{vehi.combustible}</td>
                <td className="table-cell">
                  <div className="btn-activs">
                    <button
                      className="btn-acti"
                      onClick={() => handleEditClick(vehi)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </button>
                    <button
                      className="btn-acti"
                      onClick={() => handleDeleteClick(vehi)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingVeh && (
        <EditVehModal
          veh={editingVeh}
          setVeh={setEditingVeh}
          onSave={handleSaveEdit}
          onCancel={() => setEditingVeh(null)}
        />
      )}

      {showModal && <ModalGes closeModal={closeModal} />}
    </div>
  );
};

export default GestionVehiculos;
