import React from "react";
import "../Styles/Edit_veh_adm.css";

const Edit_veh_adm = ({ veh, onSave, onCancel, setVeh }) => {
  if (!veh) return null;

  return (
    <div className="registro_vehiculo">
      <div className="modal-vehiculo">
        <div className="modal-cont-vehiculo">
          <h2>Editar vehículo</h2>

          <div className="group-input_veh">
            <div className="contenido-input">
              <label>Marca</label>
              <input
                type="text"
                placeholder="Nombre del vehiculo"
                value={veh.mar_veh}
                onChange={(e) => setVeh({ ...veh, mar_veh: e.target.value })}
              />
            </div>
            <div className="contenido-input">
              <label>Modelo</label>
              <input
                type="text"
                placeholder="Modelo del vehiculo"
                value={veh.mod_veh}
                onChange={(e) => setVeh({ ...veh, mod_veh: e.target.value })}
              />
            </div>
            <div className="contenido-input">
              <label>Tipo de vehiculo</label>
              <select
                value={veh.tip_veh}
                onChange={(e) => setVeh({ ...veh, tip_veh: e.target.value })}
              >
                <option value="">Seleccione tipo</option>
                <option value="4x4">4x4</option>
                <option value="Familiar">Familiar</option>
                <option value="Economico">Economico</option>
                <option value="Vehiculo de lujo">Vehiculo de Lujo</option>
                <option value="Deportivo">Deportivo</option>
               
              </select>
            </div>
            <div className="contenido-input">
              <label>Año</label>
              <input
                type="text"
                placeholder="Año del vehiculo"
                value={veh.anio_veh}
                onChange={(e) => setVeh({ ...veh, anio_veh: e.target.value })}
              />
            </div>
            <div className="contenido-input">
              <label>Matricula</label>
              <input
                type="text"
                placeholder="Matricula del vehiculo"
                value={veh.mat_veh}
                onChange={(e) => setVeh({ ...veh, mat_veh: e.target.value })}
                readOnly
              />
            </div>
            <div className="contenido-input">
              <label>Estado del vehiculo</label>
              <select
                value={veh.est_veh}
                onChange={(e) => setVeh({ ...veh, est_veh: e.target.value })}
              >
                <option value="">Seleccione el estado</option>
                <option value="Disponible">Disponible</option>
                <option value="Alquilado">Alquilado</option>
                <option value="Matenimiento">Mantenimiento</option>
                <option value="Fuera">Fuera de servicio</option>
              </select>
            </div>
            <div className="contenido-input">
              <label>Transmisión del vehiculo</label>
              <select
                value={veh.tip_trans_veh}
                onChange={(e) =>
                  setVeh({ ...veh, tip_trans_veh: e.target.value })
                }
              >
                <option value=""> Tipo de transmisión</option>
                <option value="Manual">Manual</option>
                <option value="Automático">Automático</option>
              </select>
            </div>
            <div className="contenido-input">
              <label>Kilometraje</label>
              <input
                type="text"
                placeholder="Kilometraje del vehiculo"
                value={veh.kil_veh}
                onChange={(e) => setVeh({ ...veh, kil_veh: e.target.value })}
              />
            </div>
            <div className="contenido-input">
              <label>Ocupantes</label>
              <input
                type="text"
                value={veh.num_ocu_veh}
                onChange={(e) =>
                  setVeh({ ...veh, num_ocu_veh: e.target.value })
                }
              />
            </div>
            <div className="contenido-input">
              <label>Numero de puertas</label>
              <input
                type="text"
                placeholder="Numero de puertas del vehiculos"
                value={veh.num_pue_veh}
                onChange={(e) =>
                  setVeh({ ...veh, num_pue_veh: e.target.value })
                }
              />
            </div>
            <div className="contenido-input">
              <label>Tipo de combustible</label>
              <select
                value={veh.combustible}
                onChange={(e) =>
                  setVeh({ ...veh, combustible: e.target.value })
                }
              >
                <option value="">Seleccione tipo</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Diesel">Diesel</option>
              </select>
            </div>
            <div className="contenido-input">
              <label>Chasis</label>
              <input
                type="text"
                placeholder="Chasis del vehiculo"
                value={veh.chasis}
                onChange={(e) => setVeh({ ...veh, chasis: e.target.value })}
              />
            </div>
            <div className="contenido-input">
              <label>Imagen del vehículo</label>
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setVeh({ ...veh, img_veh: file });
                }}
              />
            </div>
          </div>

          <div className="button-group">
            <button onClick={onSave} className="save-button">
              Guardar Cambios
            </button>
            <button onClick={onCancel} className="cancel-button">
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_veh_adm;