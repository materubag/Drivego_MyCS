import React, { useEffect, useState } from "react";
import "../Styles/Registro_veh_adm.css";
import axios from "axios";
import { BACK_URL } from "../config.js";

const Registro_veh_adm = ({ closeModal }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const [mar_veh, setMar_veh] = useState("");
  const [mod_veh, setMod_veh] = useState("");
  const [tip_veh, setTip_veh] = useState("");
  const [anio_veh, setAnio_veh] = useState("");
  const [mat_veh, setMat_veh] = useState("");
  const [est_veh, setEst_veh] = useState("");
  const [tip_trans_veh, setTip_trans_veh] = useState("");
  const [kil_veh, setKil_veh] = useState("");
  const [num_ocu_veh, setNum_ocu_veh] = useState("");
  const [num_pue_veh, setNum_pue_veh] = useState("");
  const [chasis, setChasis] = useState("");
  const [comb_veh, setComb_Veh] = useState("");
  const [img_veh, setImg_veh] = useState("");
  const [error, setError] = useState("");

  const handleRegiVehi = async () => {
    if (!mar_veh || !mod_veh || !tip_veh || !anio_veh || !mat_veh || !est_veh) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }
    const formData = new FormData();
    formData.append("mar_veh", mar_veh);
    formData.append("mod_veh", mod_veh);
    formData.append("tip_veh", tip_veh);
    formData.append("anio_veh", anio_veh);
    formData.append("mat_veh", mat_veh);
    formData.append("est_veh", est_veh);
    formData.append("tip_trans_veh", tip_trans_veh);
    formData.append("kil_veh", kil_veh);
    formData.append("num_ocu_veh", num_ocu_veh);
    formData.append("num_pue_veh", num_pue_veh);
    formData.append("comb_veh",comb_veh);
    formData.append("chasis",chasis);
    if (img_veh) formData.append("img_veh", img_veh);

    try {
      const response = await axios.post(
        BACK_URL+"/Cargar_veh.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(response.data.message);
      closeModal();
    } catch (error) {
      console.error(error);
      setError("Error al guardar el vehículo");
    }
  };

  return (
    <div className="reg_veh">
      <div className="modal-veh">
        <div className="modal-cont-veh">
          <span className="close-button-reg" onClick={closeModal}>
            &times;
          </span>
          <h2>Nuevo vehículo</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div className="group-input">
          <div className="conten-input">
                        <label>Marca</label>
                        <select
                          value={mar_veh}
                          onChange={(e) => setMar_veh(e.target.value)}
                        >
                          <option value="">Selecciona una marca</option>
                          <option value="Chevrolet">Chevrolet</option>
                          <option value="Toyota">Toyota</option>
                          <option value="Ford">Ford</option>
                          <option value="Honda">Honda</option>
                            <option value="BMW">BMW</option>
                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                        </select>
                      </div>
            <div className="conten-input">
              <label>Modelo</label>
              <input
                type="text"
                placeholder="Modelo del vehiculo"
                value={mod_veh}
                onChange={(e) => setMod_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Tipo de vehiculo</label>
              <select
                value={tip_veh}
                onChange={(e) => setTip_veh(e.target.value)}
              >
                <option value="">Seleccione tipo</option>
                <option value="4x4">4x4</option>
                <option value="Familiar">Familiar</option>
                <option value="Economico">Economico</option>
                <option value="Vehiculo de lujo">Vehiculo de Lujo</option>
                <option value="Deportivo">Deportivo</option>
               
              </select>
            </div>
            <div className="conten-input">
              <label>Año</label>
              <input
                type="text"
                placeholder="Año del vehiculo"
                value={anio_veh}
                onChange={(e) => setAnio_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Matricula</label>
              <input
                type="text"
                placeholder="Matricula del vehiculo"
                value={mat_veh}
                onChange={(e) => setMat_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Estado del vehiculo</label>
              <select
                value={est_veh}
                onChange={(e) => setEst_veh(e.target.value)}
              >
                <option value="">Seleccione el estado</option>
                <option value="Disponible">Disponible</option>
                <option value="Alquilado">Alquilado</option>
                <option value="Matenimiento">Mantenimiento</option>
                <option value="Fuera">Fuera de servicio</option>
              </select>
            </div>
            <div className="conten-input">
              <label>Transmisión del vehiculo</label>
              <select
                value={tip_trans_veh}
                onChange={(e) => setTip_trans_veh(e.target.value)}
              >
                <option value=""> Tipo de transmisión</option>
                <option value="Manual">Manual</option>
                <option value="Automático">Automático</option>
              </select>
            </div>
            <div className="conten-input">
              <label>Kilometraje</label>
              <input
                type="text"
                placeholder="Kilometraje del vehiculo"
                value={kil_veh}
                onChange={(e) => setKil_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Ocupantes</label>
              <input
                type="text"
                placeholder="Numero de ocupantes"
                value={num_ocu_veh}
                onChange={(e) => setNum_ocu_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Numero de puertas</label>
              <input
                type="text"
                placeholder="Numero de puertas del vehiculos"
                value={num_pue_veh}
                onChange={(e) => setNum_pue_veh(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Tipo de combustible</label>
              <select
                value={comb_veh}
                onChange={(e) => setComb_Veh(e.target.value)}
              >
                <option value="">Seleccione tipo</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Diesel">Diesel</option>
              
              </select>
            </div>
            <div className="conten-input">
              <label>Chasis</label>
              <input
                type="text"
                placeholder="Chasis del vehiculo"
                value={chasis}
                onChange={(e) => setChasis(e.target.value)}
              />
            </div>
            <div className="conten-input">
              <label>Imagen del vehículo</label>
              <input
                type="file"
              
                onChange={(e) => setImg_veh(e.target.files[0])}
              />
            </div>
          </div>
          <div className="button-group">
            <button className="btn_gua" onClick={handleRegiVehi}>
              Guardar Vehiculo
            </button>
            <button className="btn_can" onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro_veh_adm;