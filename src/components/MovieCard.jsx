import "./MovieCard.css";
import { useFavorites } from "../hooks/useFavorites";

function MovieCard({ id, title, poster, rating, onClickCard}) {
  const imageUrl = poster
    ? `https://image.tmdb.org/t/p/w300${poster}`
    : "/no-image.png";
  const handleImgError = (e) => {
  e.target.src = "/no-image.png";
};
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.some((m) => m.id === id);

  return (
    <div className="movie-card">
      
      {/* AL HACER CLICK SE ABRE EL MODAL */}
      <div className="poster-container" onClick={() => onClickCard(id)}>
        <img
  className="movie-card-img"
  src={imageUrl}
  alt={title}
  onError={(e) => {
    e.target.src = "/no-image.png";
  }}
/>

      </div>

      <div className="movie-card-body">
        <h3>{title}</h3>
        <p>⭐ {rating}</p>

        <button
          onClick={() =>
            toggleFavorite({ id, title, poster_path: poster, rating })
          }
          className={`fav-button ${isFav ? "fav-active" : ""}`}
        >
          {isFav ? "💛 Quitar de favoritos" : "😎 Añadir a favoritos"}
        </button>
      </div>

    </div>
  );
}

export default MovieCard;
