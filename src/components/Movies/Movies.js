import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';



function Movies({ setCurrentPath, movies }) {

	React.useEffect(() => {
		setCurrentPath('/movies');
	}, [setCurrentPath])

	return (
		<div className="movies">
			<SearchForm />
			<MoviesCardList movies={movies} />
		</div >
	)
}

export default Movies;