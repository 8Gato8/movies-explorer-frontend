import React from 'react';
import { CurrentPathContext } from '../../contexts/CurrentPathContext';

import './MoviesCard.css';

function MoviesCard({ movie }) {

	const currentPath = React.useContext(CurrentPathContext);

	const movieCardButtonClassName = (
		`movie-card__like-button ${false
			? 'movie-card__like-button_type_like'
			: 'movie-card__like-button_type_liked'
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

				{currentPath === '/movies' && <button type="button" className={movieCardButtonClassName}>
				</button>}

				{currentPath === '/saved-movies' && <button type="button" className='movie-card__like-button movie-card__like-button_type_delete'>
				</button>}
			</div>

		</li >
	)
}

export default MoviesCard;