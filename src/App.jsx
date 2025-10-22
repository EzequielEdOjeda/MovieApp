import React, { useState, useEffect, useCallback, useRef } from "react"; // Añadimos 'useRef'
import axios from 'axios';
import Navbar from "./components/Navbar";
import MovieCard from "./components/MovieCard";
import Container from "./components/Container";
import MovieDetailsModal from "./components/MovieDetailsModal";

// ***************** CONSTANTES DE LA API *****************
const API_KEY = '4ea270f32fe4e8fcdfd68b4cd5a7074f';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const getImageUrl = (path) => {
  return path ? `${IMG_BASE_URL}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
};

// Mapa de Géneros (simplificado)
const GENRES_MAP = { 28: 'Acción', 12: 'Aventura', 16: 'Animación', 35: 'Comedia', 80: 'Crimen', 99: 'Documental', 18: 'Drama', 10751: 'Familiar', 14: 'Fantasía', 36: 'Historia', 27: 'Terror', 10402: 'Música', 9648: 'Misterio', 10749: 'Romance', 878: 'Ciencia Ficción', 10770: 'TV Movie', 53: 'Thriller', 10752: 'Guerra', 37: 'Western' };
// *********************************************************

function App() {
  const [movies, setMovies] = useState([]);
  const [currentType, setCurrentType] = useState('movie'); // 'movie' o 'tv'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  // --- Lógica del Botón de Sonido ---
  const [isMuted, setIsMuted] = useState(true); 
  const videoRef = useRef(null); // Referencia para el elemento de video

  // Conecta el estado 'isMuted' con el atributo 'muted' del video en el DOM
  useEffect(() => {
    // Solo buscamos el elemento de video una vez al montar, si aún no lo tenemos
    if (!videoRef.current) {
        videoRef.current = document.getElementById('bg-video');
    }
    
    // Aplicamos el estado 'isMuted' al elemento DOM
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]); // Se ejecuta cada vez que cambia 'isMuted'

  // Handler para el botón de volumen
  const toggleMute = () => {
    setIsMuted(prevMuted => !prevMuted); 
    
    // Si el video estaba en pausa (algunos navegadores lo hacen), esta interacción
    // le permite reproducirse, lo cual es necesario para activar el sonido.
    if (videoRef.current && videoRef.current.paused) {
        videoRef.current.play().catch(error => {
          // Si falla al intentar reproducir con sonido, lo silenciamos de nuevo
          console.error("Error al intentar reproducir el video con sonido:", error);
          setIsMuted(true); 
        });
    }
  };
  // ------------------------------------

  const processApiResults = (results) => {
    return results
      .filter(item => item.poster_path)
      .map(item => {
        const genres = item.genre_ids?.slice(0, 2).map(id => GENRES_MAP[id] || 'N/A').join(' / ') || 'N/A';
        return {
          id: item.id,
          title: item.title || item.name,
          year: (item.release_date || item.first_air_date) ? (item.release_date || item.first_air_date).substring(0, 4) : 'N/A',
          genre: genres,
          poster: getImageUrl(item.poster_path),
          media_type: item.media_type || currentType 
        };
      });
  };

  const fetchItems = useCallback(async () => {
    try {
      let endpoint = '';
      const params = { api_key: API_KEY, language: 'es-ES' };

      if (searchQuery) {
        endpoint = `${BASE_URL}/search/${currentType}`;
        params.query = searchQuery;
      } else {
        endpoint = `${BASE_URL}/${currentType}/popular`;
      }

      const response = await axios.get(endpoint, { params });
      const processed = processApiResults(response.data.results);
      setMovies(processed);
      
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  }, [searchQuery, currentType]);

  // useEffect para el "debounce" y la carga inicial
  useEffect(() => {
    const timerId = setTimeout(() => {
      fetchItems();
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchQuery, currentType, fetchItems]);


  const handleShowDetails = async (item) => {
    try {
      const type = item.media_type || currentType; 
      const response = await axios.get(`${BASE_URL}/${type}/${item.id}`, {
        params: { api_key: API_KEY, language: 'es-ES' }
      });
      
      const details = response.data;
      setSelectedMovie({
        title: details.title || details.name,
        overview: details.overview || 'Sinopsis no disponible.',
        poster: getImageUrl(details.poster_path),
        release_date: details.release_date || details.first_air_date,
        vote_average: details.vote_average,
        popularity: details.popularity,
      });
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  // --- Handlers para pasar al Navbar ---
  const handleSetType = (type) => {
    setCurrentType(type);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Navbar 
        currentType={currentType}
        onSetType={handleSetType}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      
      <Container>
        <div className="movies"> 
          {/* El array de movies debe estar lleno si la API funciona */}
          {movies.map(movie => (
            <MovieCard 
              key={movie.id} 
              {...movie} 
              onClick={() => handleShowDetails(movie)} 
            />
          ))}
        </div>
      </Container>
      
      {selectedMovie && (
        <MovieDetailsModal 
          movie={selectedMovie} 
          onClose={handleCloseDetails} 
        />
      )}
    </>
  );
}

export default App;
