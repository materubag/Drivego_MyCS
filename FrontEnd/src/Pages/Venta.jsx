
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/Venta.css";
import Categorias from "../Components/Categorias.jsx";
import ModalVehiculo from "../Modals/InfoVehiculo.jsx";
import { BACK_URL } from "../config.js";
import DefaultImg from "/public/Img_default.jpg"; 

const Alquiler = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [filteredVehiculos, setFilteredVehiculos] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${BACK_URL}/mostrar_veh_home.php`);
        if (response.data.status) {
          setVehiculos(response.data.data);
          setFilteredVehiculos(response.data.data);
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

  useEffect(() => {
    let filtered = vehiculos;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((vehiculo) =>
        selectedCategories.includes(vehiculo.tip_veh.toUpperCase())
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((vehiculo) =>
        selectedBrands.includes(vehiculo.mar_veh.toUpperCase())
      );
    }

    setFilteredVehiculos(filtered);
  }, [selectedCategories, selectedBrands, vehiculos]);

  const handleCategoryChange = (updatedCategories) => {
    const selected = updatedCategories
      .filter((categoria) => categoria.checked)
      .map((categoria) => categoria.label.toUpperCase());
    setSelectedCategories(selected);
  };

  const handleBrandChange = (updatedBrands) => {
    const selected = updatedBrands
      .filter((brand) => brand.checked)
      .map((brand) => brand.label.toUpperCase());
    setSelectedBrands(selected);
  };
  const openModal = (vehiculo) => setSelectedVehiculo(vehiculo);
  const closeModal = () => setSelectedVehiculo(null);

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Cargando vehículos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="alquiler-container">
      <Categorias
        onCategoryChange={handleCategoryChange}
        onBrandChange={handleBrandChange}
      />

      <div className="vehiculos-container">
        {filteredVehiculos.length === 0 ? (
          <p>No hay vehículos disponibles</p>
        ) : (
          filteredVehiculos.map((vehiculo, index) => (
            <div key={index} className="vehiculo-card">
              <div className="tit-img">
                <h3>
                  {vehiculo.mar_veh} {vehiculo.mod_veh}
                </h3>
              </div>
              <div className="imagen-container">
                <img
                  src={`${BACK_URL}/${vehiculo.img_veh || DefaultImg}`}
                  alt={`${vehiculo.mar_veh} ${vehiculo.mod_veh}`}
                  className="vehiculo-image"
                  style={{
                    width: "270px",
                    height: "250px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    e.target.src = DefaultImg;
                  }}
                />
              </div>
              <div className="vehiculo-info">
                <div className="vehiculo-details">
                  <div className="vehiculo-item">
                    <i className="fa-solid fa-car"></i>
                    <p className="item">: {vehiculo.tip_trans_veh}</p>
                  </div>
                  <div className="vehiculo-item">
                    <i className="fa-solid fa-gas-pump"></i>
                    <p className="item">: {vehiculo.combustible}</p>
                  </div>
                  <div className="vehiculo-item">
                    <i className="fa-solid fa-person"></i>
                    <p className="item">: {vehiculo.num_ocu_veh} personas</p>
                  </div>
                </div>
                <div className="buton">
                  <button
                    className="vehiculo-button"
                    onClick={() => openModal(vehiculo)}
                  >
                    MÁS INFORMACIÓN
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {selectedVehiculo && (
        <ModalVehiculo vehiculo={selectedVehiculo} onClose={closeModal} />
      )}
    </div>
  );
};

export default Alquiler;