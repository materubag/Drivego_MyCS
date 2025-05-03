import React from 'react'
import { useNavigate } from 'react-router-dom';
import  "../Styles/Oficinas.css";
const Oficinas =[
  { Ciudad: 'Quito', imagen:'/quito.jpg', 
    direccion: 'Aeropuerto Internacional Mariscal Sucre',
    Contactos: 'Call center: (593) 22541683',
    email: "proyectodrivego@gmail.com",
    descripcion:  "Localice nuestras oficinas en el aeropuerto de Quito.",
    horario: {
        semana: "Lunes-Viernes: 8AM - 4PM",
        finDeSemana: "Sabado: 9AM - 3PM",
    },
  },
  { Ciudad: 'Guayaquil', imagen:'/guayaquil.png', 
    direccion: 'Aeropuerto Internacional Jose Joaquin de Olmedo',
    Contactos: 'Call center: (593) 48620819',
    email: "proyectodrivego@gmail.com",
    descripcion:  "Localice nuestras oficinas afuera del areopuerto de Guayaquil.",
    horario: {
      semana: 'Lunes-Viernes: 8AM - 4PM',
      finDeSemana: "Sabado: 9AM - 3PM",
    },
  },
  { Ciudad: 'Cuenca', imagen:'/cuenca.png',
    direccion: 'Aeropuerto Mariscal la Mar',
    Contactos: 'Call center: (593) 75390635',
    email: "proyectodrivego@gmail.com",
    descripcion:  "Localice nuestras oficinas en el aeropuerto de Cuenca.",
    horario: {
      semana: 'Lunes-Viernes: 8AM - 6PM',
      finDeSemana: "Fines de semana: 8AM - 3PM",
    },
  },
  { Ciudad: 'Ambato Centro',
    imagen:'/ambato.jpg', 
    direccion: 'Av.Las Americas y Colombia',
    Contactos: 'Call center: (593) 0939821964',
    email: "proyectodrivego@gmail.com",
    descripcion:  "Localice nuestras oficinas en el terminal terrestre norte.",
    horario: {
      semana: 'Lunes-Viernes: 8AM - 6PM',
      finDeSemana: "Fines de semana: 8AM - 6PM",
    }
  },
]

const Lugares = () =>{ 
  const navigate= useNavigate()
  return (
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
}

export default Lugares
