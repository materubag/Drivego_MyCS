import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Oficinas from "./Pages/Oficinas";
import Contactos from "./Pages/Contactos";
import Venta from "./Pages/Venta";
import Administrador from "./Pages/Administrador";
import Empleado from "./Pages/Empleado";


const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/oficinas" element={<Oficinas />}/>
          <Route path="/contactos" element={<Contactos />}/>
          <Route path="/venta" element={<Venta />}/>
          <Route path="/administrador" element={<Administrador />}/>
          <Route path="/empleado" element={<Empleado />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
  
};

export default App;
