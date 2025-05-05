import React,{useState} from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import "../Styles/Contactos.css";
import axios from 'axios';
import { BACK_URL } from '../config';

const Contactos = () => {
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    tipo: '',
    tema: '',
    mensaje: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        BACK_URL+"/Contacto.php", 
        JSON.stringify(form),
        {
        headers: { 'Content-Type': 'application/json' },
       
      });

      alert(response.data.message || 'Mensaje enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un problema al enviar tu mensaje.');
    }
  };
  
  return (
    <div className="contact-container">

      <div className="contact-hero">
        <img
          src="/BannerCon.png"
          alt="Banner"
          className="hero-image"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="hero-title">Contáctanos</h1>
          <p className="hero-subtitle">Estamos aquí para ayudarte a encontrar el auto de tus sueños</p>
        </div>
      </div>

      {/**Informacion principal */}
      <div className="main-content">
        
        <div className="intro-section">
          <h2 className="main-title">DriveGO Ecuador</h2>
          <h3 className="subtitle">
            Tu destino confiable para compra y venta de vehículos
          </h3>
          <p className="description">
            Estamos comprometidos en brindarte la mejor experiencia en la adquisición de tu nuevo vehículo.
            Nuestro equipo de profesionales está listo para responder todas tus preguntas y guiarte
            en el proceso de compra.
          </p>
        </div>
   
        <div className="cards-grid">

          <div className="contact-card">
            <div className="card-content">
              <div className="icon-wrapper icon-wrapper-blue">
                <Phone className="icon" />
              </div>
              <div className="card-info">
                <h4 className="card-title">Llámanos</h4>
                <p className="card-text">+593 987975666</p>
                <p className="card-text">+593 987654321</p>
              </div>
            </div>
          </div>


          <div className="contact-card">
            <div className="card-content">
              <div className="icon-wrapper icon-wrapper-green">
                <Mail className="icon" />
              </div>
              <div>
                <h4 className="card-title">Email</h4>
                <p className="card-text">ventas@automotors.com</p>
                <p className="card-text">info@automotors.com</p>
              </div>
            </div>
          </div>

          
          <div className="contact-card">
            <div className="card-content">
              <div className="icon-wrapper icon-wrapper-purple">
                <MapPin className="icon" />
              </div>
              <div>
                <h4 className="card-title">Visítanos</h4>
                <p className="card-text">Matriz principal: Av. Principal 123, Ambato </p>
              </div>
            </div>
          </div>



          <div className="formulario-section">
          <h3 className="section-title">Envíanos un mensaje</h3>
          <form className="formulario-container" onSubmit={handleSubmit} >
            <div className="input-group">
            <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  className="input-field"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="correo"
                  placeholder="Correo electrónico"
                  className="input-field"
                  value={form.correo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="tel"
                  name="tipo"
                  placeholder="Teléfono"
                  className="input-field"
                  value={form.tipo}
                  onChange={handleChange}
                />
                <select
                  name="tema"
                  className="input-field"
                  value={form.tema}
                  onChange={handleChange}
                  required
                >
             
                <option value="">Seleccione un tema</option>
                <option value="compra">Compra de vehículo</option>
                <option value="venta">Venta de vehículo</option>
                <option value="financiamiento">Financiamiento</option>
                <option value="postventa">Servicio postventa</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <textarea
                name="mensaje"
                placeholder="Mensaje"
                rows="5"
                className="input-field textarea"
                value={form.mensaje}
                onChange={handleChange}
                required
              ></textarea>

            <div className="vehiculo-interes">
              <h4>¿Qué vehículo te interesa?</h4>
              <div className="vehiculos-opciones">
                <label className="vehiculo-opcion">
                  <input type="checkbox" />
                  <span>Sedan</span>
                </label>
                <label className="vehiculo-opcion">
                  <input type="checkbox" />
                  <span>SUV</span>
                </label>
                <label className="vehiculo-opcion">
                  <input type="checkbox" />
                  <span>Camionetas</span>
                </label>
                <label className="vehiculo-opcion">
                  <input type="checkbox" />
                  <span>Deportivo</span>
                </label>
              </div>
            </div>
            <button className="submit-button" type='submit'>Enviar mensaje</button>
          </form>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Contactos;
