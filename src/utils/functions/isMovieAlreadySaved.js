export const isMovieAlreadySaved = (currentMovie, savedMovies) => {
	return savedMovies.some(movie => movie.movieId === currentMovie.movieId);
}