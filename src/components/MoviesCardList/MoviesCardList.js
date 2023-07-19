import React from 'react';

import './MoviesCardList.css';

function MoviesCardList({
	movies,
	hasMoreButton,
	handleMoreButtonClick,
	moviesLength,
	children,
}) {

	const onMoreButtonClick = () => {
		handleMoreButtonClick();
	}

	return (
		<article className="app__movies-cards movies-cards">

			<ul className="movies-cards__card-list">
				{children}
			</ul>

			{(hasMoreButton && (movies.length > 3 && movies.length > moviesLength)) && <button type="button" className="movies-cards__more-button" onClick={onMoreButtonClick}>Ещё</button>}
		</article>
	)
}

export default MoviesCardList;