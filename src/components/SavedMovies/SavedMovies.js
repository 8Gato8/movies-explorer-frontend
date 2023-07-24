import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import ApiMessage from '../ApiMessage/ApiMessage';

import './SavedMovies.css';

import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import { sortMovies } from '../../utils/functions/sortMovies';

function SavedMovies({
	movies,
	setCurrentPath,
	savedMovies,
	handleCardDeleteClick,
	getSearchedMovies,
	moviesLength,
	isMoviesApiErrorShown,
	setIsSavedMoviesApiErrorShown,
	moviesApiMessage,
}) {

	const isLoading = React.useContext(IsLoadingContext);

	const sortedMovies = sortMovies(movies, moviesLength);

	const onPathChange = React.useCallback(() => {
		setCurrentPath('/saved-movies');
	}, [setCurrentPath])

	React.useEffect(() => {
		setIsSavedMoviesApiErrorShown(false);
	}, [setIsSavedMoviesApiErrorShown])

	React.useEffect(() => {
		onPathChange();
	}, [onPathChange])

	return (
		<main className="movies">

			<SearchForm
				getSearchedMovies={getSearchedMovies}
				savedMovies={savedMovies}
			/>

			{
				(isLoading)
					?
					<Preloader />
					:
					(isMoviesApiErrorShown)
						?
						<ApiMessage
							additionalStyles='api-message_style_no-movies-found'
							isApiMessageShown={isMoviesApiErrorShown}
							apiMessage={moviesApiMessage}
						/>
						:
						<MoviesCardList
							movies={movies}
							hasMoreButton={false}
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
			}
		</main >
	)
}

export default SavedMovies;