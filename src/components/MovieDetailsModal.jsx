// src/components/MovieDetailsModal.jsx

import React from 'react';

// Re-definimos la URL base de imágenes aquí o la importamos
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const getImageUrl = (path) => {
  return path ? `${IMG_BASE_URL}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
};

export default function MovieDetailsModal({ movie, onClose }) {

  // Permite cerrar el modal al hacer clic en el fondo oscuro (backdrop)
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    // El div exterior es el fondo oscuro (backdrop)
    <div className="movie-details-modal" onClick={handleBackdropClick}>
      
      {/* Este es el contenido blanco del modal */}
      <div className="movie-details-content">
        
        <div className="movie-details-header">
          <h2 className="movie-details-title">{movie.title}</h2>
          <button className="movie-details-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="movie-details-info">
          
          <div className="movie-details-poster">
            {/* Usamos 'movie.poster' que ya viene procesado de App.jsx */}
            <img src={movie.poster} alt={movie.title} />
          </div>

          <div className="movie-details-text">
            
            <div className="movie-details-overview">
              <h3>Sinopsis</h3>
              <p>{movie.overview}</p>
            </div>

            <div className="movie-details-meta">
              <span className="movie-details-label">Fecha de lanzamiento:</span>
              <span>{movie.release_date || 'N/A'}</span>
              
              <span className="movie-details-label">Calificación:</span>
              <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'} / 10</span>
              
              <span className="movie-details-label">Popularidad:</span>
              <span>{movie.popularity || 'N/A'}</span>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}