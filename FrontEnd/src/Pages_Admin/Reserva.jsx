import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "../Styles/Reserva.css";
import { BACK_URL } from "../config.js";

registerLocale("es", es);

const Reserva = () => {
  const [cedulaUsuario, setCedulaUsuario] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [matriculaVehiculo, setMatriculaVehiculo] = useState("");
  const [vehiculos, setVehiculos] = useState([]);
  const [fechaReserva, setFechaReserva] = useState(null);
  const [fechaDevolucion, setFechaDevolucion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState(null);
  const [error, setError] = useState(null);

  const manejoFecha = new Date();

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await fetch(BACK_URL + "/mostrar_veh.php");
        const data = await response.json();
        if (data.status) {
          setVehiculos(data.data);
        } else {
          alert("No se pudieron cargar los vehículos: " + data.message);
        }
      } catch (error) {
        console.error("Error al cargar los vehículos:", error);
        alert("Error al conectar con el servidor para cargar los vehículos.");
      }
    };

    fetchVehiculos();
  }, []);

  const handleVehiculoChange = (e) => {
    const matricula = e.target.value;
    setMatriculaVehiculo(matricula);
    const vehiculo = vehiculos.find((v) => v.mat_veh === matricula);
    setVehiculoSeleccionado(vehiculo);
  };

  const calcularDias = () => {
    if (fechaReserva && fechaDevolucion) {
      const dias = Math.ceil((fechaDevolucion - fechaReserva) / (1000 * 60 * 60 * 24));
      return dias;
    }
    return 0;
  };

  const validarFechas = () => {
    const dias = calcularDias();
    return dias >= 1 && dias <= 20;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !cedulaUsuario ||
      !nombreUsuario ||
      !matriculaVehiculo ||
      !fechaReserva ||
      !fechaDevolucion
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (!validarFechas()) {
      setError("La reserva debe tener entre 1 y 20 días de diferencia.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = {
        cedulaUsuario,
        nombreUsuario,
        matriculaVehiculo,
        fechaReserva: fechaReserva.toISOString().split("T")[0],
      };

      const response = await fetch(BACK_URL + "/reserva.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.error) {
        setError("Error al realizar la reserva: " + result.error);
      } else {
        alert("Reserva exitosa");
        setCedulaUsuario("");
        setNombreUsuario("");
        setMatriculaVehiculo("");
        setFechaReserva(null);
        setFechaDevolucion(null);
        setVehiculoSeleccionado(null);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setError("Error al conectar con el servidor para realizar la reserva.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reserva-container">
      <div className="reserva-card">
        <h2>Reserva de Vehículos</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="reserva-form">
          <div className="form-group">
            <label htmlFor="cedula">Cédula</label>
            <input
              type="text"
              id="cedula"
              value={cedulaUsuario}
              onChange={(e) => setCedulaUsuario(e.target.value)}
              placeholder="Ingrese la cédula"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              placeholder="Ingrese el nombre"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vehiculo">Vehículo</label>
            <select
              id="vehiculo"
              value={matriculaVehiculo}
              onChange={handleVehiculoChange}
              className="form-select"
            >
              <option value="">Seleccione un vehículo</option>
              {vehiculos.map((vehiculo) => (
                <option key={vehiculo.mat_veh} value={vehiculo.mat_veh}>
                  {`${vehiculo.mat_veh} - ${vehiculo.mar_veh} ${vehiculo.mod_veh} (${vehiculo.anio_veh})`}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Fecha de Reserva</label>
              <DatePicker
                selected={fechaReserva}
                onChange={(fecha) => setFechaReserva(fecha)}
                minDate={manejoFecha}
                className="form-input"
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecciona una fecha"
                locale={es}
                required
              />
            </div>

          </div>

          {vehiculoSeleccionado && (
            <div className="vehiculo-seleccionado">
              <div className="vehiculo-info">
                <div className="vehiculo-imagen">
                  <img
                    src={`${BACK_URL}/${vehiculoSeleccionado.img_veh || "/Public/Img_default.jpg"}`}
                    onError={(e) => {
                      e.target.src = "/Public/Img_default.jpg";
                    }}
                  />
                </div>
                <div className="vehiculo-detalles">
                  <h3>{`${vehiculoSeleccionado.mar_veh} ${vehiculoSeleccionado.mod_veh}`}</h3>
                  <div className="detalles-grid">
                    <div className="detalle-item">
                      <span>DÍAS SELECCIONADOS:</span>
                      <strong>{calcularDias()}</strong>
                    </div>
                    <div className="detalle-item">
                      <span>TRANSMISIÓN:</span>
                      <strong>{`${vehiculoSeleccionado.tip_trans_veh}`}</strong>
                    </div>
                    <div className="detalle-item">
                      <span>PASS/LUG:</span>
                      <strong>{`${vehiculoSeleccionado.num_ocu_veh}`}</strong>
                    </div>
                    <div className="detalle-item">
                      <span>COMBUSTIBLE:</span>
                      <strong>{`${vehiculoSeleccionado.combustible}`}</strong>
                    </div>
                    <div className="precio-total">
                      <span>{`${vehiculoSeleccionado.precio_veh}`}</span> x Día
                      <div className="total">
                        ${(vehiculoSeleccionado.precio_veh * calcularDias()).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "RESERVAR"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reserva;