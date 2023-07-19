import React from 'react';

import './EditProfileForm.css';

import SubmitButton from '../SubmitButton/SubmitButton';
import ApiMessage from '../ApiMessage/ApiMessage';

import { regexEmail, regexName } from '../../utils/constants/regexValidationVariables';
import { useInput } from '../../utils/functions/useInput';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';

function EditProfileForm({
	toggleEditForm,
	editUserInfo,
	isEditProfileApiMessageShown,
	editProfileApiMessage,
	editProfileApiMessageType
}) {

	const isLoading = React.useContext(IsLoadingContext);
	const currentUser = React.useContext(CurrentUserContext);
	const [isFormValid, setIsFormValid] = React.useState(false);

	const name = useInput('', { isEmpty: true, minLength: 2, regexName });
	const email = useInput('', { isEmpty: true, minLength: 2, regexEmail });

	const onSubmit = (e) => {
		e.preventDefault();
		const formValues = { name: name.value, email: email.value };
		editUserInfo(formValues);
	}

	React.useEffect(() => {
		if (
			(name.isInputValid && email.isInputValid)
			&& (name.value !== currentUser.name || email.value !== currentUser.email)
		) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}, [name.isInputValid, email.isInputValid, currentUser.email, currentUser.name, name, email]);

	return (
		<>
			<form id="edit-profile-form" className="profile__data" onSubmit={onSubmit}>

				<label htmlFor="input-name" className="profile__data-block profile__data-block_type_edit">

					<input
						className={`profile__data-unit input 
						${name.isDirty && !name.isInputValid
								? 'input_type_error'
								: ''
							}`}
						id="input-name"
						value={name.value}
						placeholder="Имя"
						type='text'
						name="name"
						minLength="2"
						maxLength="30"
						onChange={name.onChange}
						onBlur={name.onBlur}
						required
					/>

					<span className={
						`input-error-message input-error-message_type_edit
							${name.isDirty && !name.isInputValid
							? 'input-error-message_visible'
							: ''
						}`}
					>
						{name.isMinLengthError && name.minLengthErrorMessage}
						{name.isEmptyError && name.emptyErrorMessage}
						{name.isNameValidationError && name.nameValidationMessage}
					</span>

				</label>

				<label htmlFor="input-email" className="profile__data-block profile__data-block_type_edit">

					<input
						className={`profile__data-unit input 
						${email.isDirty && !email.isInputValid
								? 'input_type_error'
								: ''
							}`}
						id="input-email"
						value={email.value}
						placeholder="E-mail"
						type='text'
						name="email"
						minLength="2"
						maxLength="30"
						onChange={email.onChange}
						onBlur={email.onBlur}
						required
					/>

					<span className={
						`input-error-message input-error-message_type_edit
							${email.isDirty && !email.isInputValid
							? 'input-error-message_visible'
							: ''
						}`}
					>
						{email.isMinLengthError && email.minLengthErrorMessage}
						{email.isEmptyError && email.emptyErrorMessage}
						{email.isEmailValidationError && email.emailValidationMessage}
					</span>

				</label>

			</form >

			<ApiMessage
				additionalStyles={
					`api-message_style_form 
				${editProfileApiMessageType === 'error'
						? 'api-message_theme_red'
						: 'api-message_theme_green'
					} `}
				isApiMessageShown={isEditProfileApiMessageShown}
				apiMessage={editProfileApiMessage}
			/>

			<div className="profile__buttons button-section">
				<SubmitButton form="edit-profile-form" isFormValid={isFormValid && !isLoading} buttonText={'Сохранить'} additionalButtonStyles={'button-section'} />

				<button className="edit-profile-form__redirection-link redirection-link" onClick={toggleEditForm}>Назад</button>
			</div>
		</>
	)
}

export default EditProfileForm;