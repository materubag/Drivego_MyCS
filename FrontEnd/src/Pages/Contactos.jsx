import React from 'react';
import { Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';
import "../Styles/Contactos.css";  // Importación regular de CSS

const Contactos = () => {
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

        {/**Tarjetas */ }    
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

          {/* Email Card */}
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

          {/* Location Card */}
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

          {/*Formulario del contacto */}
          <div className="formulario-section">
          <h3 className="section-title">Envíanos un mensaje</h3>
          <div className="formulario-container">
            <div className="input-group">
              <input type="text" placeholder="Nombre completo" className="input-field" />
              <input type="email" placeholder="Correo electrónico" className="input-field" />
            </div>
            <div className="input-group">
              <input type="tel" placeholder="Teléfono" className="input-field" />
              <select className="input-field">
                <option value="">Seleccione un tema</option>
                <option value="compra">Compra de vehículo</option>
                <option value="venta">Venta de vehículo</option>
                <option value="financiamiento">Financiamiento</option>
                <option value="postventa">Servicio postventa</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <textarea placeholder="Mensaje" rows="5" className="input-field textarea"></textarea>
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
                  <span>Pickup</span>
                </label>
                <label className="vehiculo-opcion">
                  <input type="checkbox" />
                  <span>Deportivo</span>
                </label>
              </div>
            </div>
            <button className="submit-button">Enviar mensaje</button>
          </div>
        </div>

        </div>
      </div>
    </div>
  );
};

export default Contactos;
