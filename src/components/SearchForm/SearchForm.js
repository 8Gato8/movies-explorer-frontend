import React from 'react';

function SearchForm() {

	return (
		<article className="search">

			<form className="search__form">

				<input type="text" placeholder="Фильм"
					className="search__form-search-input"
					name="movie"
					required
				/>


				<label className="search__form-checkbox-label" htmlFor="short-movie">
					<input className="search__form-checkbox" type="checkbox" id="short-movie" name="short-movie" value="yes" />
					<span className="search__form-visible-checkbox"></span>
					<span className="search__form-checkbox-lebel-text">Короткометражки</span>
				</label>

				<button className="search__form-submit-button" type="submit"></button>
			</form>

		</article>
	)
}

export default SearchForm;