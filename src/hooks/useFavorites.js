import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFavorites, toggleFavorite } from "../services/favorites";

export function useFavorites() {
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  const favoriteMutation = useMutation({
    mutationFn: toggleFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries(["favorites"]);
    }
  });

  return { 
    favorites: favoritesQuery.data || [],
    toggleFavorite: favoriteMutation.mutate
  };
}
