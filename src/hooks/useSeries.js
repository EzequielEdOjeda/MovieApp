import { useQuery } from "@tanstack/react-query";
import { fetchPopularSeries } from "../services/series";

export function useSeries(query) {
  return useQuery({
    queryKey: ["series", query],
    queryFn: () => fetchPopularSeries(query),
  });
}
