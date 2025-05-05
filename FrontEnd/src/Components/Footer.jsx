import React from 'react'
import "../Styles/Footer.css";

const Footer = () => {
  return (
  <footer className='footer'>
    <div className='footer-container'>
      <div className='footer-section logo-section'>
        <a href='/' className='logo'>
          <img src="/Logo-sin_fodo.png" alt='logo de la empresa'/> 
        </a>
      </div>

      <div className='footer-section info-section'>
        <h3 className='section-title'> Sobre Nosotros</h3>
        <p>Pagina dedicada a la venta de vehiculos de alta calidad</p>
        <div className='ubicacion'>
          <i className='fa-solid fa-location-dot'></i>
          <span>Ubicación: Av.Atahualpa y Victor Hugo</span>
        </div>
        <div className='contacto'>
          <i className='fa-solid fa-phone'> </i>
          <span>+593 123 456 789 </span>
        </div>
        <div className='email'>
          <i className='fa-solid fa-envelope'></i>
          <span>contacto@drivego.com</span>
        </div>
      </div>

      <div className="footer-section social-section"> 
        <h3 className='section-title'> Redes Sociales</h3>
        <div className='social-links'>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className='social-link'
          >
          <i className="fa-brands fa-facebook"></i>
            <span>Facebook</span>
          </a>

          <a href="https://WhatsApp.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className='social-link'
          >
          <i className="fa-brands fa-whatsapp"></i>
            <span>Whatsapp</span>
        </a>
        <a
          href="https://www.instagram.com/veru7xd?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className='social-link'
        >
          <i className="fa-brands fa-instagram"></i>
            <span>Instagram</span>
        </a>
        </div>
      </div>
    </div>
      <div className="footer-bottom">
        <p className='derechos'>© 2025 DriveGo. Todos los derechos reservados.</p>
      </div>
    </footer>
    
  )
}

export default Footer