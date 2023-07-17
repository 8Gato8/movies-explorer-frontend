import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

import './Movies.css';

import { sortMovies } from '../../utils/functions/sortMovies';

function Movies({
	movies,
	savedMovies,
	handleCardLikeClick,
	getSearchedMovies,
	initialMoviesArray,
	handleMoreButtonClick,
	moviesLength
}) {

	const sortedMovies = sortMovies(movies, moviesLength);

	return (
		<main className="movies">

			<SearchForm getSearchedMovies={getSearchedMovies} moviesArray={initialMoviesArray} shouldUseStoredData={true} />

			<MoviesCardList
				movies={movies}
				hasMoreButton={true}
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
								thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
								image: `https://api.nomoreparties.co/${movie.image.url}`,
								nameEN: movie.nameEN,
								nameRU: movie.nameRU,
								trailerLink: movie.trailerLink,
								year: movie.year
							}
						}
						key={i}
						savedMovies={savedMovies}
						buttonStyle={'like'}
						handleCardLikeClick={handleCardLikeClick}
					>

					</MoviesCard>
				))}

			</MoviesCardList >

		</main >
	)
}

export default Movies;