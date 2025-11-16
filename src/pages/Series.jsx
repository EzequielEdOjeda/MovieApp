import MovieCard from "../components/MovieCard";
import { useSeries } from "../hooks/useSeries";
import { useState } from "react";
import Modal from "../components/Modal";

export default function Series({ query }) {
  const { data, isLoading, isError } = useSeries(query);
  const [selected, setSelected] = useState(null);

  if (isLoading) return <h2 className="center-message">Cargando...</h2>;
  if (isError) return <h2 className="center-message">Error al cargar datos.</h2>;

  const series = data?.results ?? [];

  if (series.length === 0)
    return <h2 className="center-message">No hay resultados para esta búsqueda.</h2>;

  // Abre el modal
  const openSeries = (id) => {
    const serie = series.find((s) => s.id === id);
    setSelected(serie);
  };

  return (
    <>
      <div className="movies-container">
        {series.map((serie) => (
          <MovieCard
            key={serie.id}
            id={serie.id}
            title={serie.name}
            poster={serie.poster_path}
            rating={serie.vote_average}
            overview={serie.overview}
            release_date={serie.first_air_date}
            onClickCard={openSeries}
          />
        ))}
      </div>

      {/* MODAL */}
      <Modal movie={selected} close={() => setSelected(null)} />
    </>
  );
}
