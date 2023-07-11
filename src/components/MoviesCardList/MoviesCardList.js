import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.css';

function MoviesCardList({ movies }) {

	return (
		<article className="app__movies-cards movies-cards">
			<ul className="movies-cards__card-list">
				{movies.map((movie, i) => (

					<MoviesCard
						movie={movie}
						key={i}
					/>
				))}
			</ul>

			{movies.length >= 5 && <button type="button" className="movies-cards__more-button">Ещё</button>}
		</article>
	)
}

export default MoviesCardList;