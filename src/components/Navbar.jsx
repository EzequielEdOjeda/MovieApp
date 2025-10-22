// src/components/Navbar.jsx

import { useState } from "react";
import "./Navbar.css"; // Asegúrate de que este archivo exista

export default function Navbar({ 
  currentType,   // Prop: 'movie' o 'tv'
  onSetType,     // Prop: Función para cambiar el tipo
  searchQuery,   // Prop: El texto de búsqueda actual
  onSearchChange // Prop: Función para cambiar el texto
}) {
  
  // Este estado es INTERNO del Navbar y maneja solo el menú responsive
  const [open, setOpen] = useState(false);

  // Handlers que llaman a la función del padre Y cierran el menú móvil
  const handleTypeClick = (type) => {
    onSetType(type);
    setOpen(false); // Cierra el menú al seleccionar una opción
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h1 className="logo-part">🎬</h1>
        <h1 className="logo-part">MovieApp</h1>
      </div>
      <button
        className={`menu-toggle ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        ☰
      </button>

      <ul className={`nav-links ${open ? "open" : ""}`}>
        <li>
          <a 
            href="#" 
            // Añadimos clase 'active' si coincide con el tipo actual
            className={currentType === 'movie' ? 'active' : ''}
            // Prevenimos el salto de página y llamamos al handler
            onClick={(e) => {
              e.preventDefault(); 
              handleTypeClick('movie');
            }}
          >
            Películas
          </a>
        </li>
        <li>
          <a 
            href="#"
            className={currentType === 'tv' ? 'active' : ''}
            onClick={(e) => {
              e.preventDefault();
              handleTypeClick('tv');
            }}
          >
            Series
          </a>
        </li>
		    <div className="search-bar">
          <input 
            type="text" 
            placeholder="Buscar películas o series..."
            // Conectamos el valor y el onChange a las props
            value={searchQuery}
            onChange={onSearchChange} 
          />
        </div>
      </ul>
    </nav>
  );
}