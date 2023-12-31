import React from 'react';
import { NavLink } from "react-router-dom";
import Logo from "../Logo/Logo";

import './Form.css';

import SubmitButton from '../SubmitButton/SubmitButton';
import ApiMessage from '../ApiMessage/ApiMessage';

import { IsLoadingContext } from '../../contexts/IsLoadingContext';

function Form({
	headingText,
	buttonText,
	redirectionCaptionText,
	linkText,
	isFormValid,
	redirectionPath,
	onSubmit,
	formValues,
	setCurrentUser,
	isFormApiErrorShown,
	formApiMessage,
	children,
}) {

	const isLoading = React.useContext(IsLoadingContext);

	const handleSubmit = async (e) => {

		e.preventDefault();

		await onSubmit(formValues);

		if (setCurrentUser) {
			setCurrentUser(formValues);
		}

	}

	return (
		<section className="form-wrapper">

			<Logo additionalLinkStyles={'form-wrapper__logo-link'} />

			<h1 className="form-heading heading">{headingText}</h1>

			<form className="form" onSubmit={handleSubmit} noValidate>

				{children}

				<ApiMessage additionalStyles='api-message_style_form api-message_theme_red' isApiMessageShown={isFormApiErrorShown} apiMessage={formApiMessage} />

				<SubmitButton isFormValid={isFormValid && !isLoading} buttonText={buttonText} additionalButtonStyles={'form__submit-button'} />

			</form>

			<div className="form__redirection-container">
				<p className="form__redirection-message">{redirectionCaptionText}</p>
				<NavLink className="form-redirection__link redirection-link" to={redirectionPath}>{linkText}</NavLink>
			</div>

		</section>
	)
}

export default Form;