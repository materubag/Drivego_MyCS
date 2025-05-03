import React from 'react'
import { useNavigate } from 'react-router-dom';
import  "../Styles/Oficinas.css";
const Oficinas =[
  { Ciudad: 'Quito', imagen:'/quito.jpg', 
    direccion: 'Av. 6 de Diciembre y Patria, Edificio AutoPlaza',
    Contactos: 'Ventas: (593) 22541683',
    servicio: 'Taller: (593) 22541684',
    email: "ventas.quito@automotriz.com",
    descripcion:  "Concesionario principal con amplio showroom de vehículos nuevos y seminuevos, taller de servicio completo y departamento de repuestos.",
    horario: {
        ventas: "Lunes-Viernes: 9AM - 6PM, Sábado: 9AM - 4PM",
        servicio: "Lunes-Viernes: 8AM - 5PM, Sábado: 8AM - 1PM",
    },
  },
  { Ciudad: 'Guayaquil', imagen:'/guayaquil.png', 
    direccion: 'Av. Francisco de Orellana, C.C. AutoWorld, Local 5',
    Contactos: 'Ventas: (593) 48620819',
    servicio: 'Taller: (593) 48620820',
    email: "ventas.guayaquil@automotriz.com",
    descripcion:  "El concesionario más grande de la costa, con experiencia de compra premium y centro de servicio técnico especializado.",
    horario: {
        ventas: 'Lunes-Viernes: 9AM - 6PM, Sábado: 9AM - 4PM',
        servicio: "Lunes-Viernes: 8AM - 5PM, Sábado: 8AM - 2PM",  
    },
  },
  { Ciudad: 'Cuenca', imagen:'/cuenca.png',
    direccion: 'Av. España y Elia Liut, sector Aeropuerto',
    Contactos: 'Ventas: (593) 0975390635',
    servicio: 'Taller: (593) 0975390636',
    email: "ventas.cuenca@automotriz.com",
    descripcion:  "Concesionario con sala de exhibición moderna y taller con tecnología de punta para mantenimiento y reparación.",
    horario: {
        ventas: 'Lunes-Viernes: 9AM - 6PM, Sábado: 9AM - 4PM',
        servicio: "Lunes-Viernes: 8AM - 5PM, Sábado: 8AM - 1PM",
    },
  },
  { Ciudad: 'Ambato',
    imagen:'/ambato.jpg', 
    direccion: 'Av. Atahualpa y Víctor Hugo, Centro Comercial Automotriz',
    Contactos: 'Ventas: (593) 0939821964',
    servicio: 'Taller: (593) 0939821965',
    email: "ventas.ambato@automotriz.com",
    descripcion:  "Sucursal especializada en vehículos familiares y comerciales con centro de pruebas de manejo.",
    horario: {
        ventas: 'Lunes-Viernes: 9AM - 6PM, Sábado: 9AM - 5PM',
        servicio: "Lunes-Viernes: 8AM - 5PM, Sábado: 8AM - 1PM",
    }
  },
];

const Lugares = () =>{ 
  const navigate= useNavigate()
  /**return (
    <div className='lugares-container'>
      {Oficinas.map((oficina, index) =>(
        <div className='lugaresCard' key={index}>
          <h3>{oficina.Ciudad}</h3>
          <img src={oficina.imagen} alt={`Vista de ${location.city}`}/>
          <p>{oficina.direccion}</p>
          <p>{oficina.Contactos}</p>
          <p>{oficina.email}</p>
          <p>{oficina.descripcion}</p>
          <div className="lugaresCard-horario">
              <p>Horario de atención</p>
              <p>{oficina.horario.semana}</p>
              <p>{oficina.horario.finDeSemana}</p>
          </div>
        </div>
      ))}
    </div>
  ) 
}**/
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
              <div className="sucursal-badge">{sucursal.ciudad}</div>
            </div>
            
            <div className="sucursal-info">
              <h2>{sucursal.ciudad}</h2>
              <div className="sucursal-detalles">
                <div className="sucursal-ubicacion">
                  <i className="fas fa-map-marker-alt"></i>
                  <p>{sucursal.direccion}</p>
                </div>
                
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
                
                <div className="sucursal-modelos">
                  <h4>Modelos disponibles:</h4>
                  <p>{sucursal.modelos}</p>
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
              
              <div className="sucursal-acciones">
                <button className="btn-primario" onClick={() => navigate(`/inventario/${sucursal.ciudad.toLowerCase()}`)}>
                  Ver inventario
                </button>
                <button className="btn-secundario" onClick={() => navigate(`/contacto/${sucursal.ciudad.toLowerCase()}`)}>
                  Agendar visita
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Lugares
