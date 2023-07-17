import React from 'react';
import ApiErrorMessage from '../ApiMessage/ApiMessage';

import './SearchForm.css';

function SearchForm({ getSearchedMovies, moviesArray, shouldUseStoredData }) {

	const initialInputValue = shouldUseStoredData
		? JSON.parse(localStorage.getItem("storedMovies")).movieInput
		: '';

	const initialCheckboxValue = shouldUseStoredData
		? JSON.parse(localStorage.getItem("storedMovies")).isChecked
		: false;

	const [movie, setMovie] = React.useState(initialInputValue);
	const [checkbox, setCheckbox] = React.useState(initialCheckboxValue);


	const onMovieChange = (e) => {
		setMovie(e.target.value);
	}

	const onCheckboxChange = (e) => {
		setCheckbox(e.target.checked);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		if (e.target.elements.movie.value.length >= 1) {
			getSearchedMovies(moviesArray, movie, checkbox);
		} else {
			throw new Error('Нужно ввести ключевое слово');
		}
	}

	return (
		<article className="search">
			<div className="search__container">
				<form className="search__form" onSubmit={onSubmit} noValidate>

					<fieldset className="search__form-search-fieldset">

						<div className="search__form-search-input-container">

							<div className="search__form-search-icon"></div>
							<ApiErrorMessage additionalStyles=''></ApiErrorMessage>
							<input
								id="movie"
								type="text"
								placeholder="Фильм"
								className="search__form-search-input"
								name="movie"
								value={movie}
								onChange={onMovieChange}
								required
							/>

						</div>

						<button className="search__form-submit-button" type="submit"></button>
					</fieldset>

					<label className="search__form-checkbox-label" htmlFor="short-movie">
						<input className="search__form-checkbox" type="checkbox" id="short-movie" name="short-movie-checkbox" value="yes" onChange={onCheckboxChange} checked={checkbox} />
						<span className="search__form-visible-checkbox"></span>
						<span className="search__form-checkbox-lebel-text">Короткометражки</span>
					</label>
				</form>
			</div>
		</article>
	)
}

export default SearchForm;