import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchPopularSeries = async (query = "") => {
  const url = query
    ? `${BASE_URL}/search/tv`
    : `${BASE_URL}/tv/popular`;

  const response = await axios.get(url, {
    params: {
      api_key: API_KEY,
      language: "es-ES",
      page: 1,
      query: query || undefined,
    },
  });

  return response.data;
};
