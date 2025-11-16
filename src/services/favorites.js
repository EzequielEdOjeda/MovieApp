export const getFavorites = () => {
  return JSON.parse(localStorage.getItem("favorites")) || [];
};

export const toggleFavorite = (movie) => {
  const current = getFavorites();

  const exists = current.find((m) => m.id === movie.id);

  let updated;

  if (exists) {
    updated = current.filter((m) => m.id !== movie.id);
  } else {
    updated = [...current, movie];
  }

  localStorage.setItem("favorites", JSON.stringify(updated));
  return updated;
};
