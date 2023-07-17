export const searchMovies = (moviesArray, movieInput, isChecked) => {

	const regex = new RegExp(movieInput.trim(), 'i');

	const searchedMovies = moviesArray.filter((movie) => {

		const duration = isChecked ? true : movie.duration > 40;
		const result = (regex.test(movie.nameRU) || regex.test(movie.nameEN)) && duration;

		return result;
	})

	return searchedMovies;
}