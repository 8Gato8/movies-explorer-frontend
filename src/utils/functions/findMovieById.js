export const findMovieById = (currentMovie, savedMovies) => {
	return savedMovies.find(movie => movie.movieId === currentMovie.movieId);
}