import React from 'react';

function SavedMovies({ setCurrentPath }) {

	React.useEffect(() => {
		setCurrentPath('/saved-movies');
	}, [setCurrentPath])

	return (
		<div className="movies">
		</div>
	)
}

export default SavedMovies;