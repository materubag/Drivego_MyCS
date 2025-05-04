import React, { useState } from 'react';
import '../Styles/Categorias.css';

const FilterSection = ({ title, items, onItemChange }) => (
  <div className="filter-section">
    <h2 className="filter-title">{title}</h2>
    <div className="filter-items">
      {items.map((item, index) => (
        <div key={item.label} className="filter-item">
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox-input"
              checked={item.checked}
              onChange={() => onItemChange(index)}
            />
            <span className="checkbox-custom"></span>
            <span className="item-label">{item.label}</span>
          </label>
        </div>
      ))}
    </div>
  </div>
);

const Filtros = ({ onCategoryChange, onBrandChange }) => {
  const [categorias, setCategorias] = useState([
    { label: 'Economico', checked: false },
    { label: '4x4', checked: false },
    { label: 'Vehículo de Lujo', checked: false },
    { label: 'Deportivos', checked: false },
    { label: 'Familiar', checked: false },
  ]);

  const [brands, setBrands] = useState([
    { label: 'Toyota', checked: false },
    { label: 'Honda', checked: false },
    { label: 'Ford', checked: false },
    { label: 'Chevrolet', checked: false },
    { label: 'BMW', checked: false },
    { label: 'Mercedes-Benz', checked: false },
  ]);

  const handleCategoryChange = (index) => {
    const updatedCategorias = categorias.map((categoria, i) =>
      i === index ? { ...categoria, checked: !categoria.checked } : categoria
    );
    setCategorias(updatedCategorias);
    onCategoryChange(updatedCategorias);
  };

  const handleBrandChange = (index) => {
    const updatedBrands = brands.map((brand, i) =>
      i === index ? { ...brand, checked: !brand.checked } : brand
    );
    setBrands(updatedBrands);
    onBrandChange(updatedBrands);
  };

  const handleResetFilters = () => {
    setCategorias(categorias.map(cat => ({ ...cat, checked: false })));
    setBrands(brands.map(brand => ({ ...brand, checked: false })));
    onCategoryChange(categorias.map(cat => ({ ...cat, checked: false })));
    onBrandChange(brands.map(brand => ({ ...brand, checked: false })));
  };

  const activeFilters = categorias.filter(cat => cat.checked).length +
                       brands.filter(brand => brand.checked).length;

  return (
    <aside className="filtros-sidebar">
      <div className="filtros-container">
        <div className="filtros-header">
          <h1 className="filtros-title">Filtros</h1>
          {activeFilters > 0 && (
            <button className="reset-button" onClick={handleResetFilters}>
              Limpiar ({activeFilters})
            </button>
          )}
        </div>

        <FilterSection
          title="Categorías"
          items={categorias}
          onItemChange={handleCategoryChange}
        />
        <div className="separator"></div>
        <FilterSection
          title="Marcas"
          items={brands}
          onItemChange={handleBrandChange}
        />
      </div>
    </aside>
  );
};

export default Filtros;