import React from 'react';

import './SearchForm.css';

function SearchForm() {

	return (
		<article className="search">
			<div className="search__container">
				<form className="search__form">

					<fieldset className="search__form-search-fieldset">

						<div className="search__form-search-input-container">

							<div className="search__form-search-icon"></div>

							<input type="text" placeholder="Фильм"
								className="search__form-search-input"
								name="movie"
								required
							/>

						</div>

						<button className="search__form-submit-button" type="submit"></button>
					</fieldset>

					<label className="search__form-checkbox-label" htmlFor="short-movie">
						<input className="search__form-checkbox" type="checkbox" id="short-movie" name="short-movie" value="yes" />
						<span className="search__form-visible-checkbox"></span>
						<span className="search__form-checkbox-lebel-text">Короткометражки</span>
					</label>
				</form>
			</div>
		</article>
	)
}

export default SearchForm;