import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../hooks/useMovies";
import Modal from "../components/Modal";

export default function Movies({ query }) {
  const { data, isLoading, isError } = useMovies(query);
  const [selected, setSelected] = useState(null);

  if (isLoading) return <div className="center-message">Cargando...</div>;
  if (isError) return <div className="center-message">Error al cargar datos.</div>;

  const movies = data?.results ?? [];

  if (movies.length === 0) return <div className="center-message">No hay resultados.</div>;

  const openMovie = (id) => {
    const movie = movies.find((m) => m.id === id);
    setSelected(movie);
  };

  return (
    <>
      <div className="movies-container">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster={movie.poster_path}
            rating={movie.vote_average}
            onClickCard={openMovie}
          />
        ))}
      </div>

      <Modal movie={selected} close={() => setSelected(null)} />
    </>
  );
}
