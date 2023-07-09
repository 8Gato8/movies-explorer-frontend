import React from 'react';
import './EditProfileForm.css';
import SubmitButton from '../SubmitButton/SubmitButton';

import { regex } from '../../utils/regexEmailValidation';
import { useInput } from '../../utils/validation';


function EditProfileForm({ handleUserUpdate, toggleEditForm }) {

	const [isFormValid, setIsFormValid] = React.useState(false);

	const name = useInput('', { isEmpty: true, minLength: 2 });
	const email = useInput('', { isEmpty: true, minLength: 2, regex });

	const onSubmit = (e) => {
		e.preventDefault();
		const data = { name: name.value, email: email.value };
		handleUserUpdate(data);
		toggleEditForm();
	}

	React.useEffect(() => {
		if (name.isInputValid && email.isInputValid) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}, [name.isInputValid, email.isInputValid]);

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

			<SubmitButton form="edit-profile-form" isFormValid={isFormValid} buttonText={'Сохранить'} additionalButtonStyles={'button-section'} />
		</>
	)
}

export default EditProfileForm;