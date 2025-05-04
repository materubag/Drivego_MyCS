import React, { useState } from "react";
import "../Styles/Reportes.css";
import {BACK_URL} from "../config.js";

const Reportes = () => {
  const [tipoReporte, setTipoReporte] = useState("");
  const [categoriaReporte, setCategoriaReporte] = useState("");
  const [anio, setAnio] = useState("");
  const [mes, setMes] = useState("");
  const [fecha, setFecha] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [reportesGenerados, setReportesGenerados] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");

  const hoy = new Date().toISOString().split("T")[0];

  const handleGenerateReport = async () => {
    if (!tipoReporte || !categoriaReporte) {
      alert("Por favor selecciona un tipo de reporte y una categoría.");
      return;
    }

    if (tipoReporte === "anual" && (!anio || anio.trim() === "")) {
      alert("Por favor ingresa un año válido para generar el reporte anual.");
      return;
    }

    if (tipoReporte === "mensual" && (!anio || !mes)) {
      alert(
        "Por favor ingresa un año y un mes válidos para generar el reporte mensual."
      );
      return;
    }

    if (tipoReporte === "diario" && !fecha) {
      alert(
        "Por favor selecciona una fecha válida para generar el reporte diario."
      );
      return;
    }

    if (
      tipoReporte === "rango" &&
      (!fechaInicio || !fechaFin || new Date(fechaInicio) > new Date(fechaFin))
    ) {
      alert(
        "Por favor selecciona un rango de fechas válido. La fecha de inicio no puede ser mayor que la fecha de fin."
      );
      return;
    }

    try {
      let endpoint = "";
      let payload = {};

      if (categoriaReporte === "demanda") {
        switch (tipoReporte) {
          case "anual":
            endpoint = "/pdf_reporte_demanda_anual.php";
            payload = { anio };
            break;
          case "mensual":
            endpoint = "/pdf_reporte_demanda_mensual.php";
            payload = { anio, mes };
            break;
          case "diario":
            endpoint = "/pdf_reporte_demanda_diaria.php";
            payload = { fecha: fecha };
            break;
          case "rango":
            endpoint = "/pdf_reporte_demanda_fechas.php";
            payload = { fecha_inicio: fechaInicio, fecha_fin: fechaFin };
            break;
          default:
            alert("Tipo de reporte no válido.");
            return;
        }
      } else if (categoriaReporte === "ingresos") {
        switch (tipoReporte) {
          case "anual":
            endpoint = "/pdf_reporte_anual.php";
            payload = { anio };
            break;
          case "mensual":
            endpoint = "/pdf_reporte_mensual.php";
            payload = { anio, mes };
            break;
          case "diario":
            endpoint = "/pdf_reporte_diario.php";
            payload = { fecha_reporte: fecha };
            break;
          case "rango":
            endpoint = "/pdf_reporte_fechas.php";
            payload = { fecha_inicio: fechaInicio, fecha_fin: fechaFin };
            break;
          default:
            alert("Tipo de reporte no válido.");
            return;
        }
      }

      const response = await fetch(`${BACK_URL}/reportes${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error al generar el reporte.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      setPdfUrl(url);

      const nuevoReporte = {
        id: Date.now(),
        categoria: categoriaReporte,
        tipo: tipoReporte,
        fecha: new Date().toLocaleDateString(),
        url,
      };

      setReportesGenerados((prev) => [...prev, nuevoReporte]);
    } catch (error) {
      alert(error.message || "Error desconocido al generar el reporte.");
    }
  };

  const handleClearFields = () => {
    setTipoReporte("");
    setCategoriaReporte("");
    setAnio("");
    setMes("");
    setFecha("");
    setFechaInicio("");
    setFechaFin("");
    setPdfUrl("");
  };

  const renderInputsReporte = () => {
    switch (tipoReporte) {
      case "anual":
        return (
          <label>
            Año:
            <input
              type="number"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              max={hoy.split("-")[0]}
              required
            />
          </label>
        );
      case "mensual":
        return (
          <>
            <label>
              Año:
              <input
                type="number"
                value={anio}
                onChange={(e) => {
                  const inputYear = parseInt(e.target.value, 10);
                  const currentYear = new Date().getFullYear();
                  if (inputYear > 0 && inputYear <= currentYear) {
                    setAnio(e.target.value);
                  }
                }}
                max={new Date().getFullYear()}
                min="1"
                placeholder="Ej: 2025"
                required
              />
            </label>
            <label>
              Mes:
              <select
                value={mes}
                onChange={(e) => setMes(e.target.value)}
                required
              >
                <option value="">Seleccione el mes</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("es", { month: "long" })}
                  </option>
                ))}
              </select>
            </label>
          </>
        );
      case "diario":
        return (
          <label>
            Fecha:
            <input
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              max={hoy}
              required
            />
          </label>
        );
      case "rango":
        return (
          <>
            <label>
              Fecha Inicio:
              <input
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                max={hoy}
                required
              />
            </label>
            <label>
              Fecha Fin:
              <input
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                max={hoy}
                required
              />
            </label>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="reportes-wrapper">
      <div className="card">
        <div className="card-header">
          <h2 className="card-tit">Reportes y Estadísticas</h2>
        </div>

        <div className="card-conte">
          <div className="filtros">
            <label>
              Categoría de reporte:
              <select
                value={categoriaReporte}
                onChange={(e) => setCategoriaReporte(e.target.value)}
              >
                <option value="">Seleccione la categoría</option>
                <option value="ingresos">Ingresos</option>
                <option value="demanda">Demanda de vehículos</option>
              </select>
            </label>
            <label>
              Tipo de reporte:
              <select
                value={tipoReporte}
                onChange={(e) => setTipoReporte(e.target.value)}
              >
                <option value="">Seleccione el tipo de reporte</option>
                <option value="anual">Reporte Anual</option>
                <option value="mensual">Reporte Mensual</option>
                <option value="diario">Reporte Diario</option>
                <option value="rango">Reporte por Rango de Fechas</option>
              </select>
            </label>

            {renderInputsReporte()}
          </div>

          <div className="botones">
            <button className="btn-generar" onClick={handleGenerateReport}>
              Generar Reporte
            </button>
            <button className="btn-limpiar" onClick={handleClearFields}>
              Limpiar Campos
            </button>
          </div>

          {pdfUrl && (
            <div className="pdf-preview">
              <iframe
                src={pdfUrl}
                title="Previsualización del reporte"
                width="100%"
              ></iframe>
              <a
                href={pdfUrl}
                download={`reporte_${categoriaReporte}_${tipoReporte}.pdf`}
              >
                <button className="btn-descargar">Descargar Reporte</button>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reportes;