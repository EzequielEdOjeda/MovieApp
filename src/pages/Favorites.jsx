import MovieCard from "../components/MovieCard";
import { useFavorites } from "../hooks/useFavorites";
import Modal from "../components/Modal";
import { useState } from "react";

export default function Favorites({ query }) {
  const { favorites } = useFavorites();
  const [selected, setSelected] = useState(null);

  const search = query?.toLowerCase() ?? "";

  // Normalizar datos para asegurar estructura correcta
  const normalize = (m) => ({
    id: m.id,
    title: m.title || m.name,
    poster_path: m.poster_path,
    rating: m.rating || m.vote_average || "N/A",
    overview: m.overview || "Sin descripción disponible.",
    release_date: m.release_date || m.first_air_date || "",
  });

  const normalized = favorites.map(normalize);

  if (normalized.length === 0)
    return <div className="center-message">No tienes favoritos aún.</div>;

  const filtered = normalized.filter((m) =>
    m.title.toLowerCase().includes(search)
  );

  if (filtered.length === 0)
    return <div className="center-message">No hay resultados en favoritos.</div>;

  const openMovie = (id) => {
    const movie = filtered.find((m) => m.id === id);
    setSelected(movie);
  };

  return (
  <div className="page-container">
    <div className="movies-container">
      {filtered.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster={movie.poster_path}
          rating={movie.rating}
        />
      ))}
    </div>

    <Modal movie={selected} close={() => setSelected(null)} />
  </div>
);
}
