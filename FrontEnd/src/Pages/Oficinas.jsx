
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import  "../Styles/Oficinas.css";

const sucursales =[
  { ciudad: 'Quito', imagen:'/quito.jpg', 
    direccion: 'Av. 6 de Diciembre y Patria, Edificio AutoPlaza',
    contactos: 'Ventas: (593) 22541683',
    servicio: 'Taller: (593) 22541684',
    email: "ventas.quito@automotriz.com",
    descripcion:  "Concesionario principal con amplio showroom de vehículos nuevos y seminuevos, taller de servicio completo y departamento de repuestos.",
    horario: {
        ventas: "Lunes-Viernes: 9AM - 6PM, Sábado: 9AM - 4PM",
        servicio: "Lunes-Viernes: 8AM - 5PM, Sábado: 8AM - 1PM",
    },
  },
  { ciudad: 'Guayaquil', imagen:'/guayaquil.png', 
    direccion: 'Av. Francisco de Orellana, C.C. AutoWorld, Local 5',
    contactos: 'Ventas: (593) 48620819',
    servicio: 'Taller: (593) 48620820',
    email: "ventas.guayaquil@automotriz.com",
    descripcion:  "El concesionario más grande de la costa, con experiencia de compra premium y centro de servicio técnico especializado.",
    horario: {
        ventas: 'Lunes-Viernes: 9AM - 6PM, Sábado: 9AM - 4PM',
        servicio: "Lunes-Viernes: 8AM - 5PM, Sábado: 8AM - 2PM",  
    },
  },
  { ciudad: 'Cuenca', imagen:'/cuenca.png',
    direccion: 'Av. España y Elia Liut, sector Aeropuerto, local 22',
    contactos: 'Ventas: (593) 0975390635',
    servicio: 'Taller: (593) 0975390636',
    email: "ventas.cuenca@automotriz.com",
    descripcion:  "Concesionario con sala de exhibición moderna y taller con tecnología de punta para mantenimiento y reparación.",
    horario: {
        ventas: 'Lunes-Viernes: 9AM - 6PM, Sábado: 9AM - 4PM',
        servicio: "Lunes-Viernes: 8AM - 5PM, Sábado: 8AM - 1PM",
    },
  },
  { ciudad: 'Ambato',
    imagen:'/ambato.jpg', 
    direccion: 'Av. Atahualpa y Víctor Hugo, Centro Comercial Automotriz',
    ontactos: 'Ventas: (593) 0939821964',
    servicio: 'Taller: (593) 0939821965',
    email: "ventas.ambato@automotriz.com",
    descripcion:  "Sucursal especializada en vehículos familiares y comerciales con centro de pruebas de manejo.",
    horario: {
        ventas: 'Lunes-Viernes: 9AM - 6PM, Sábado: 9AM - 5PM',
        servicio: "Lunes-Viernes: 8AM - 5PM, Sábado: 8AM - 1PM",
    }
  },
];

const Oficinas = () => {
    const navigate = useNavigate();
    const [expandedSucursal, setExpandedSucursal] = useState(null);

    const toggleExpand = (index) => {
        setExpandedSucursal(expandedSucursal === index ? null : index); 
    };

    return (
        <div className="sucursales-container">
          <div className="sucursales-header">
            <h1>Nuestras Sucursales</h1>
            <p>Visítanos en cualquiera de nuestros concesionarios y encuentra el auto de tus sueños</p>
          </div>
          
          <div className="sucursales-grid">
            {sucursales.map((sucursal, index) => (
              <div className="sucursal-card" key={index}>
                <div className="sucursal-imagen">
                  <img src={sucursal.imagen} alt={`Concesionario de ${sucursal.ciudad}`} />
                </div>
                
                <div className="sucursal-info">
                  <h2>{sucursal.ciudad}</h2>
                  
                  {/* Información básica siempre visible */}
                  <div className="sucursal-resumen">
                    <div className="sucursal-ubicacion">
                      <i className="fas fa-map-marker-alt"></i>
                      <p>{sucursal.direccion}</p>
                    </div>
                    </div>
                  
                  {/* Botón para expandir/colapsar */}
                  <button 
                    className="btn-expandir"
                    onClick={() => toggleExpand(index)}
                  >
                    {expandedSucursal === index ? '-' : '+'}
                  </button>
                  
                  {/* Contenido desplegable */}
                  {expandedSucursal === index && (
                    <div className="sucursal-detalles-expandibles">
                      <div className="sucursal-contacto">
                        <div className="contacto-item">
                          <i className="fas fa-phone"></i>
                          <p>{sucursal.contactos}</p>
                        </div>
                        <div className="contacto-item">
                          <i className="fas fa-wrench"></i>
                          <p>{sucursal.servicio}</p>
                        </div>
                        <div className="contacto-item">
                          <i className="fas fa-envelope"></i>
                          <p>{sucursal.email}</p>
                        </div>
                      </div>
                      
                      <div className="sucursal-descripcion">
                        <p>{sucursal.descripcion}</p>
                      </div>
                  
                      <div className="sucursal-horario">
                        <h4>Horarios de atención</h4>
                        <div className="horario-detalle">
                          <div className="horario-item">
                            <span>Ventas:</span>
                            <p>{sucursal.horario.ventas}</p>
                          </div>
                          <div className="horario-item">
                            <span>Servicio técnico:</span>
                            <p>{sucursal.horario.servicio}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="sucursal-acciones">
                    <button className="btn-secundario" onClick={() => navigate(`/contacto/${sucursal.ciudad.toLowerCase()}`)}>
                      Vehículos
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  };
    
export default Oficinas
