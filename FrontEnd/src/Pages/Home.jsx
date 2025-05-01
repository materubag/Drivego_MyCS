import React, { useEffect, useState } from "react";
import { BACK_URL } from "../config.js";
import DefaultImg from "/public/Img_default.jpg";

const Home = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BACK_URL}/mostrar_veh_home.php`);
        const data = await response.json();
        if (data.status) {
          setVehiculos(data.data);
        } else {
          setError(data.message || "Error al obtener vehículos.");
        }
      } catch (err) {
        setError("Error al cargar los vehículos. Intente nuevamente.");
        console.error("Error fetching vehiculos:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVehiculos();
  }, []);

  return (
    <div className="home-container">
      <section className="section">
        {isLoading ? (
          <div className="loading-container">
            <p>Cargando vehículos...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p style={{ color: "red" }}>{error}</p>
          </div>
        ) : vehiculos.length === 0 ? (
          <div className="no-vehiculos">
            <p>No hay vehículos disponibles en este momento.</p>
          </div>
        ) : (
          <div className="ofertas">
            {vehiculos.map((vehiculo, index) => (
              <article key={index} className="oferta">
                <div className="oferta-img">
                  <img
                    src={`${BACK_URL}/${vehiculo.img_veh || DefaultImg}`}
                    alt={`${vehiculo.mar_veh} ${vehiculo.mod_veh}`}
                    onError={(e) => {
                      e.target.src = DefaultImg;
                    }}
                  />
                </div>
                <div className="oferta-content">
                  <h3>MODELO: {vehiculo.mod_veh}</h3>
                  <p>MARCA: {vehiculo.mar_veh}</p>
                  <p className="precio">PRECIO: ${vehiculo.precio_veh}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;