import { SHORT_MOVIE_DIVIDE_NUMBER } from "../constants/shortMovieDuration";

export const searchMovies = (moviesArray, movieInput, isChecked) => {

	const regex = new RegExp(movieInput.trim(), 'i');

	const searchedMovies = moviesArray.filter((movie) => {

		const duration = isChecked ? movie.duration <= SHORT_MOVIE_DIVIDE_NUMBER : true;
		const result = (regex.test(movie.nameRU) || regex.test(movie.nameEN)) && duration;

		return result;
	})

	return searchedMovies;
}