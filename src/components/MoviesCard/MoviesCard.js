import React from 'react';

import './MoviesCard.css';

import { convertMinutes } from '../../utils/functions/convertMinutes';
import { isMovieAlreadySaved } from '../../utils/functions/isMovieAlreadySaved';

function MoviesCard({
	movie,
	savedMovies,
	buttonStyle,
	handleCardLikeClick,
	handleCardDeleteClick
}) {

	const [isLiked, setIsLiked] = React.useState(isMovieAlreadySaved(movie, savedMovies));

	const onLike = () => {
		handleCardLikeClick(movie, isLiked);
		setIsLiked(!isLiked);
	}

	const onDelete = () => {
		handleCardDeleteClick(movie);
	}

	return (
		<li className="movies-cards__card-list-item movie-card">

			<a className="movie-card__trailer-link" href={movie.trailerLink} rel='noreferrer' target='_blank'>
				<img
					className="movie-card__img"
					src={movie.image}
					alt={movie.nameRU}
				/>
			</a>

			<div className="movie-card__movie-information">
				<h2 className="movie-card__title">{movie.nameRU}</h2>
				<p className="movie-card__duration">{convertMinutes(movie.duration)}</p>

				{buttonStyle === 'delete' && <button type="button" onClick={onDelete} className='movie-card__button movie-card__button_delete'>
				</button>}

				{buttonStyle === 'like' && <button type="button" onClick={onLike} className={`movie-card__button ${isLiked ? 'movie-card__button_active' : 'movie-card__button_disabled'}`}>
				</button>}

			</div>

		</li >
	)
};

export default MoviesCard;