import React, { useEffect, useState } from 'react' 
import carusell1 from "/public/carusell1.png";
import carusell3 from "/public/carusell3.png";
import carusell4 from "/public/carusell4.png";
import  "../Styles/Carrusel.css";



function Carusell(){
  const[currentImagen, setCurrentImagen] = useState(0)
  const imagenes = [
    {img: carusell1, label: "", desc:''},
    {img: carusell3, label: '', desc:''},
    {img: carusell4, label: '', desc:''}
  ]

  useEffect(()=>{
    const timer = setInterval(()=>{
      setCurrentImagen((prevImage) => (prevImage + 1) % imagenes.length); 
    }, 8000)
    return () => clearInterval(timer); 
  }, [imagenes.length]);
  
  const hadleNext = () => {setCurrentImagen((currentImagen+1) % imagenes.length)}
  const hadlePrev = () => {setCurrentImagen((currentImagen-1 + imagenes.length) % imagenes.length)}
  
  return(
    <div className='carusell-container'>
      <div className='carusell' 
          style={{ transform: `translateX(-${currentImagen * 100}%)` }}>
        {imagenes.map((imagen, index)=>(
          <div 
            className={`carusell-imagen ${index === currentImagen ? 'active' : ''}`}
            key ={index}
          >
            <img src={imagen.img} 
            alt={imagen.label}/>
            <div className='carusell-capt'>
              <h3>{imagen.label}</h3>
              <p>{imagen.desc}</p>
            </div> 
          </div>
        ))}
      </div>
      <button className='carusell-control prev' onClick={hadlePrev}>&larr;</button>

      <button className='carusell-control next' onClick={hadleNext}>&rarr;</button>
    </div>

  )
}

export default Carusell