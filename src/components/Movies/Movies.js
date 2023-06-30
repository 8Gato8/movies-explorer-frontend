import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies({ setCurrentPath, currentPath, movies }) {

	React.useEffect(() => {
		setCurrentPath(currentPath);
	}, [setCurrentPath, currentPath])

	return (
		<div className="movies">
			<SearchForm />
			<MoviesCardList movies={movies} />
		</div >
	)
}

export default Movies;