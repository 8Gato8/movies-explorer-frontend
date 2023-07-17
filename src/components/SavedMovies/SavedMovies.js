import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

import './SavedMovies.css';

import { sortMovies } from '../../utils/functions/sortMovies';

function SavedMovies({
	movies,
	savedMovies,
	handleCardDeleteClick,
	getSearchedMovies,
	initialSavedMoviesArray,
	handleMoreButtonClick,
	moviesLength
}) {

	const sortedMovies = sortMovies(movies, moviesLength);

	return (
		<main className="movies">

			<SearchForm getSearchedMovies={getSearchedMovies} moviesArray={initialSavedMoviesArray} shouldUseStoredData={false} />

			<MoviesCardList
				movies={movies}
				hasMoreButton={false}
				handleMoreButtonClick={handleMoreButtonClick}
			>

				{sortedMovies.map((movie, i) => (

					<MoviesCard
						movie={
							{
								country: movie.country,
								description: movie.description,
								director: movie.director,
								duration: movie.duration,
								movieId: movie.id,
								image: movie.image,
								thumbnail: movie.thumbnail,
								nameEN: movie.nameEN,
								nameRU: movie.nameRU,
								trailerLink: movie.trailerLink,
								year: movie.year,
								_id: movie._id
							}
						}
						key={i}
						savedMovies={savedMovies}
						buttonStyle={'delete'}
						handleCardDeleteClick={handleCardDeleteClick}
					/>

				))}

			</MoviesCardList >

		</main >
	)
}

export default SavedMovies;