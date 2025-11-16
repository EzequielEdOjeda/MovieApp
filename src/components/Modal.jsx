import "./Modal.css";

export default function Modal({ movie, close }) {
  if (!movie) return null;

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/no-image.png";

  return (
    <div className="modal-overlay" onClick={close}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        <img src={imageUrl} alt={movie.title || movie.name} />

        <div className="modal-body">
          <div>
            <h2>{movie.title || movie.name}</h2>
            <p><strong>Rating:</strong> ⭐ {movie.vote_average}</p>
            <p><strong>Fecha:</strong> {movie.release_date || movie.first_air_date}</p>
            <p className="overview">{movie.overview}</p>
          </div>

          <button className="close-btn" onClick={close}>Cerrar</button>
        </div>

      </div>
    </div>
  );
}
