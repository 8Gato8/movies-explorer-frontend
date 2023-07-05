import React from 'react';
import logoSrc from '../../images/logo.svg';
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

function Form({
	headingText,
	buttonText,
	redirectionCaptionText,
	linkText,
	isFormValid,
	redirectionPath,
	children
}) {

	const onSubmit = (e) => {
		e.preventDefault();
	}

	return (
		<div className="form-wrapper">

			<Link className="form-wrapper__logo-link" to="/"><img className="logo form-wrapper__logo logo_style_form" src={logoSrc} alt="Лого проекта" /></Link>

			<h1 className="form-heading heading">{headingText}</h1>

			<form className="form" onSubmit={onSubmit} noValidate>

				{children}

				<button
					className={`form__submit-button
					${!isFormValid
							? 'form__submit-button_disabled'
							: ''
						}
					`}
					type="submit"
					disabled={!isFormValid}
				>
					{buttonText}
				</button>

			</form>

			<div className="form__redirection-container">
				<p className="form__redirection-message">{redirectionCaptionText}</p>
				<NavLink className="form-redirection__link redirection-link" to={redirectionPath}>{linkText}</NavLink>
			</div>

		</div>
	)
}

export default Form;