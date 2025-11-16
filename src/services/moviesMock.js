let userMovies = [];

export const addMovieMock = async (movie) => {
  const newMovie = { 
    id: Date.now(), 
    title: movie.title, 
    poster_path: null,
    vote_average: 0 
  };

  userMovies.push(newMovie);
  return newMovie;
};

export const getUserMovies = async () => {
  return userMovies;
};
