import React from 'react';

function MoviesCard({ movie }) {

	return (
		<li className="movies-cards__card-list-item movie-card">

			<div className={
				`${true
					? 'movie-card__img-mask-save'
					: 'movie-card__img-mask-already-saved'
				} movie-card__img-mask`} >
				<img
					className="movie-card__img"
					src={movie.image}
					alt={movie.name}
				/>
			</div>

			<h2 className="movie-card__title">{movie.name}</h2>
			<p className="movie-card__duration">{movie.duration}</p>

		</li>
	)
}

export default MoviesCard;