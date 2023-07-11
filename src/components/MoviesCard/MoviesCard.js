import React from 'react';
import { CurrentPathContext } from '../../contexts/CurrentPathContext';

import './MoviesCard.css';

function MoviesCard({ movie }) {

	const currentPath = React.useContext(CurrentPathContext);

	const [isLiked, setIsLiked] = React.useState(false);

	const onLikeClick = () => {
		setIsLiked(!isLiked);
	}

	const movieCardButtonClassName = (
		`movie-card__button ${isLiked
			? 'movie-card__button_active'
			: 'movie-card__button_disabled'
		}`
	);

	return (
		<li className="movies-cards__card-list-item movie-card">

			<img
				className="movie-card__img"
				src={movie.image}
				alt={movie.name}
			/>


			<div className="movie-card__movie-information">
				<h2 className="movie-card__title">{movie.name}</h2>
				<p className="movie-card__duration">{movie.duration}</p>

				{currentPath === '/movies' && <button type="button" onClick={onLikeClick} className={movieCardButtonClassName}>
				</button>}

				{currentPath === '/saved-movies' && <button type="button" className='movie-card__button movie-card__button_deleted'>
				</button>}
			</div>

		</li >
	)
}

export default MoviesCard;