import React from 'react';
import { CurrentPathContext } from '../../contexts/CurrentPathContext';

function MoviesCard({ movie }) {

	const currentPath = React.useContext(CurrentPathContext);

	return (
		<li className="movies-cards__card-list-item movie-card">

			<div className="movie-card__img-mask">

				<img
					className="movie-card__img"
					src={movie.image}
					alt={movie.name}
				/>

				{currentPath === '/movies' && <button className={`movie-card__button ${true
					? 'movie-card__button_type_save'
					: 'movie-card__button_type_already-saved'
					}`}>
				</button>}

				{currentPath === '/saved-movies' && <button className='movie-card__button movie-card__button_type_delete'>
				</button>}

			</div>

			<h2 className="movie-card__title">{movie.name}</h2>
			<p className="movie-card__duration">{movie.duration}</p>

		</li >
	)
}

export default MoviesCard;