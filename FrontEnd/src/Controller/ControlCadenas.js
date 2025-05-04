export const validarEntrada = (value) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(value);
  };
  
export const validarCadena = (value, min, max) => {
    return value.length >= min && value.length <= max;
  };