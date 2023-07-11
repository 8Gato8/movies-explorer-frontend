import React from 'react';
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";

import './Form.css';
import SubmitButton from '../SubmitButton/SubmitButton';

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
		<section className="form-wrapper">

			<Logo additionalLinkStyles={'form-wrapper__logo-link'} />

			<h1 className="form-heading heading">{headingText}</h1>

			<form className="form" onSubmit={onSubmit} noValidate>

				{children}

				<SubmitButton isFormValid={isFormValid} buttonText={buttonText} additionalButtonStyles={'form__submit-button'} />

			</form>

			<div className="form__redirection-container">
				<p className="form__redirection-message">{redirectionCaptionText}</p>
				<NavLink className="form-redirection__link redirection-link" to={redirectionPath}>{linkText}</NavLink>
			</div>

		</section>
	)
}

export default Form;