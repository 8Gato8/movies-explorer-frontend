export const sortMovies = (movies, requiredLength) => {
	let result = [];

	for (let i = 0; i < requiredLength; i += 1) {

		if (movies[i] === undefined) {
			return result;
		}

		result = [movies[i], ...result];
	}

	return result;
};