import React, { useEffect, useState } from "react";
import { BACK_URL } from "../config.js";
import "../Styles/Gestion_Usuario.css";

const Ventas = () => {
  const [reservas, setReservas] = useState([]);
  const [metodosPago, setMetodosPago] = useState({}); // Guarda el método seleccionado por id_res

  const fetchReservas = () => {
    fetch(`${BACK_URL}/PosibleVenta.php`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          setReservas(data.data);
        } else {
          console.error("Error al obtener reservas:", data.message);
        }
      })
      .catch((error) => console.error("Error de red:", error));
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleMetodoChange = (id_res, metodo) => {
    setMetodosPago((prev) => ({
      ...prev,
      [id_res]: metodo,
    }));
  };

  const handleAceptar = (reserva) => {
    const metodo = metodosPago[reserva.id_res];
    if (!metodo) return alert("Debe seleccionar un método de pago.");

    fetch(`${BACK_URL}/Venta.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_res: reserva.id_res, metodo_pago: metodo }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Venta aceptada exitosamente.");
          fetchReservas();
        } else {
          alert("Error al aceptar venta: " + data.error);
        }
      })
      .catch((error) => alert("Error en la red: " + error));
  };

  const handleEliminar = (reserva) => {
    if (window.confirm("¿Estás seguro de eliminar esta reserva?")) {
      fetch(`${BACK_URL}/DeleteReserva.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_res: reserva.id_res }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            alert("Reserva eliminada correctamente.");
            fetchReservas();
          } else {
            alert("Error al eliminar reserva: " + data.error);
          }
        })
        .catch((error) => alert("Error de red: " + error));
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-tit">Ventas Pendientes</h2>
      </div>
      <div className="card-conte">
        <table className="table-cont">
          <thead>
            <tr>
              <th className="table-head">Cliente</th>
              <th className="table-head">Vehículo</th>
              <th className="table-head">Fecha Reserva</th>
              <th className="table-head">Método Pago</th>
              <th className="table-head">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.id_res}>
                <td className="table-cell">{reserva.nom_usu_res}</td>
                <td className="table-cell">{reserva.matricula_veh}</td>
                <td className="table-cell">{reserva.fec_res}</td>
                <td className="table-cell">
                  <select
                    value={metodosPago[reserva.id_res] || ""}
                    onChange={(e) =>
                      handleMetodoChange(reserva.id_res, e.target.value)
                    }
                  >
                    <option value="">Seleccione</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta">Tarjeta</option>
                    <option value="Transferencia">Transferencia</option>
                  </select>
                </td>
                <td className="table-cell">
                  <div className="btn-activs">
                    <button className="btn-acti" onClick={() => handleAceptar(reserva)}>
                      <i className="fa-solid fa-check"></i>
                    </button>
                    <button className="btn-acti" onClick={() => handleEliminar(reserva)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ventas;
