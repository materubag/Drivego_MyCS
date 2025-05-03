import React from 'react';
import { Phone, Mail, Instagram, Facebook, MapPin } from 'lucide-react';
import "../Styles/Contactos.css";  // Importación regular de CSS

const Contactos = () => {
  return (
    <div className="contact-container">
      {/* Hero Section */}
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

      {/* Main Content */}
      <div className="main-content">
        {/* Introduction Text */}
        <div className="intro-section">
          <h2 className="main-title">AutoMotors Ecuador</h2>
          <h3 className="subtitle">
            Tu destino confiable para compra y venta de vehículos
          </h3>
          <p className="description">
            Estamos comprometidos en brindarte la mejor experiencia en la adquisición de tu nuevo vehículo.
            Nuestro equipo de profesionales está listo para responder todas tus preguntas y guiarte
            en el proceso de compra.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="cards-grid">
          {/* Phone Card */}
          <div className="contact-card">
            <div className="card-content">
              <div className="icon-wrapper icon-wrapper-blue">
                <Phone className="icon" />
              </div>
              <div>
                <h4 className="card-title">Llámanos</h4>
                <p className="card-text">+593 987975666</p>
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
                <p className="card-text">Universidad Tecnica de Ambato</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactos;
