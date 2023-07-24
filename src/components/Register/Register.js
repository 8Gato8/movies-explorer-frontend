import React from 'react';
import Form from '../Form/Form';
import { regexEmail, regexName } from '../../utils/constants/regexValidationVariables';
import { useInput } from '../../utils/functions/useInput';

import { Navigate } from 'react-router-dom';

import './Register.css';

import { IsLoggedInContext } from '../../contexts/IsLoggedInContext';

function Register({
	setCurrentPath,
	createUser,
	isFormApiErrorShown,
	formApiMessage,
}) {

	const onPathChange = React.useCallback(() => {
		setCurrentPath('/signup')
	}, [setCurrentPath])

	React.useEffect(() => {
		onPathChange();
	}, [onPathChange])

	const isLoggedIn = React.useContext(IsLoggedInContext);
	const [isFormValid, setIsFormValid] = React.useState(false);

	const name = useInput('', { isEmpty: true, minLength: 2, regexName });
	const email = useInput('', { isEmpty: true, minLength: 2, regexEmail });
	const password = useInput('', { isEmpty: true, minLength: 2 });

	React.useEffect(() => {
		if (name.isInputValid && email.isInputValid && password.isInputValid) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}, [name.isInputValid, email.isInputValid, password.isInputValid]);

	if (isLoggedIn) {
		return <Navigate to="/movies" />
	}

	return (
		<main className="register">

			<Form
				headingText={'Добро пожаловать!'}
				buttonText={'Зарегистрироваться'}
				redirectionCaptionText={'Уже зарегистрированы?'}
				linkText={'Войти'}
				isFormValid={isFormValid}
				redirectionPath={'/signin'}
				onSubmit={createUser}
				formValues={{ name: name.value, email: email.value, password: password.value }}
				isFormApiErrorShown={isFormApiErrorShown}
				formApiMessage={formApiMessage}
			>

				<fieldset className="form__fieldset">

					<label htmlFor="input-name" className="form__field">
						<span className="form__field-caption">Имя</span>
						<input
							id="input-name"
							className={`form__input input
							${name.isDirty && !name.isInputValid
									? 'input_type_error'
									: ''
								}`}
							value={name.value}
							placeholder="Введите имя"
							type="text"
							name="name"
							minLength="2"
							maxLength="30"
							onChange={name.onChange}
							onBlur={name.onBlur}
							required
						/>
						<span className={
							`input-error-message 
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

					<label htmlFor="input-email" className="form__field">
						<span className="form__field-caption">E-mail</span>
						<input
							id="input-email"
							className={`form__input input form__input_type_email 
							${email.isDirty && !email.isInputValid
									? 'input_type_error'
									: ''
								}`}
							value={email.value}
							placeholder="Введите e-mail"
							type="email"
							name="email"
							minLength="2"
							maxLength="30"
							onChange={email.onChange}
							onBlur={email.onBlur}
							required
						/>
						<span className={
							`input-error-message 
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

					<label htmlFor="input-password" className="form__field">
						<span className="form__field-caption">Пароль</span>
						<input
							id="input-password"
							className={`form__input input
							${password.isDirty && !password.isInputValid
									? 'input_type_error'
									: ''
								}`}
							value={password.value}
							placeholder="Введите пароль"
							type="password"
							name="password"
							minLength="2"
							maxLength="30"
							onChange={password.onChange}
							onBlur={password.onBlur}
							required
						/>
						<span className={
							`input-error-message 
							${password.isDirty && !password.isInputValid
								? 'input-error-message_visible'
								: ''
							}`}
						>
							{password.isMinLengthError && password.minLengthErrorMessage}
							{password.isEmptyError && password.emptyErrorMessage}
						</span>

					</label>

				</fieldset>

			</Form>

		</main>
	)
}

export default Register;