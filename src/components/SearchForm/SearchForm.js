import React from 'react';
import ApiMessage from '../ApiMessage/ApiMessage';

import './SearchForm.css';

function SearchForm({
	getSearchedMovies,
	storedMovies,
	initialMovies
}) {

	const [isBlankInputErrorShown, setIsBlankInputErrorShown] = React.useState(false);
	const [blankInputErrorMessage, setBlankInputErrorMessage] = React.useState('');

	const initialMovieInput = storedMovies ? storedMovies.movieInput : '';
	const initialCheckboxInput = storedMovies ? storedMovies.isChecked : false;

	const [movie, setMovie] = React.useState(initialMovieInput);
	const [checkbox, setCheckbox] = React.useState(initialCheckboxInput);

	const onMovieChange = (e) => {
		setMovie(e.target.value);
	}

	const onCheckboxChange = (e) => {
		setCheckbox(e.target.checked);

		if (initialMovies.length > 1) {
			if (movie.length < 1) {
				setBlankInputErrorMessage('Нужно ввести ключевое слово');
				setIsBlankInputErrorShown(true);
			} else {
				setIsBlankInputErrorShown(false);
				getSearchedMovies(initialMovies, movie, !checkbox);
			}
		}
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if (movie.length < 1) {
			setBlankInputErrorMessage('Нужно ввести ключевое слово');
			setIsBlankInputErrorShown(true);
		} else {
			setIsBlankInputErrorShown(false);
			getSearchedMovies(initialMovies, movie, checkbox);
		}
	}

	return (
		<article className="search">
			<div className="search__container">
				<form className="search__form" onSubmit={onSubmit} noValidate>

					<fieldset className="search__form-search-fieldset">

						<div className="search__form-search-input-container">

							<div className="search__form-search-icon"></div>

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

				<ApiMessage additionalStyles='api-message_style_blank-input-error api-message_theme_red' isApiMessageShown={isBlankInputErrorShown} apiMessage={blankInputErrorMessage} />

			</div>
		</article>
	)
}

export default SearchForm;