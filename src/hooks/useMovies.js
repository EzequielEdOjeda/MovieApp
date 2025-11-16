import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/movies";

export function useMovies(query) {
  return useQuery({
    queryKey: ["movies", query],
    queryFn: () => fetchMovies(query),
  });
}
