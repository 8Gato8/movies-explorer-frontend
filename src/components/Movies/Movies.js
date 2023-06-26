import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

function Movies({ setCurrentPath }) {

	React.useEffect(() => {
		setCurrentPath('/movies');
	}, [setCurrentPath])

	return (
		<div className="movies">
			<SearchForm />
		</div >
	)
}

export default Movies;