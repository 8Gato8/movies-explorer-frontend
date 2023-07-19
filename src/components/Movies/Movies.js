import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import ApiMessage from '../ApiMessage/ApiMessage';

import './Movies.css';

import { IsLoadingContext } from '../../contexts/IsLoadingContext';

import { sortMovies } from '../../utils/functions/sortMovies';

function Movies({
	movies,
	initialMovies,
	setCurrentPath,
	savedMovies,
	handleCardLikeClick,
	getSearchedMovies,
	handleMoreButtonClick,
	moviesLength,
	isMoviesApiErrorShown,
	moviesApiMessage,
	storedMovies
}) {

	const isLoading = React.useContext(IsLoadingContext);

	const sortedMovies = sortMovies(movies, moviesLength);

	const onPathChange = React.useCallback(() => {
		setCurrentPath('/movies')
	}, [setCurrentPath])

	React.useEffect(() => {
		onPathChange();
	}, [onPathChange])

	return (
		<main className="movies">

			<SearchForm
				getSearchedMovies={getSearchedMovies}
				storedMovies={storedMovies}
				initialMovies={initialMovies}
			/>

			{
				(isLoading)
					?
					<Preloader />
					:
					(isMoviesApiErrorShown)
						?
						<ApiMessage additionalStyles='api-message_style_no-movies-found' isApiMessageShown={isMoviesApiErrorShown} apiMessage={moviesApiMessage} />
						:
						<MoviesCardList
							movies={movies}
							hasMoreButton={true}
							handleMoreButtonClick={handleMoreButtonClick}
							moviesLength={moviesLength}
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
			}
		</main >
	)
}

export default Movies;