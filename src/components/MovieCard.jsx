// src/components/MovieCard.jsx

// Recibimos la nueva prop 'onClick'
export default function MovieCard({ title, year, genre, poster, onClick }) {
  
  return (
    // Aplicamos el 'onClick' al div principal
    <div className="movie" onClick={onClick}>
      <img 
        src={poster} 
        alt={title} 
      />
      <div className="movie-info">
        <h3>{title}</h3>
        <p>{genre}</p> 
        <div className="price">{year}</div> 
      </div>
    </div>
  );
}