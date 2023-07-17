import React from 'react'
import Form from '../Form/Form';
import { regex } from '../../utils/constants/regexEmailValidation';
import { useInput } from '../../utils/functions/validation';

import { Navigate } from 'react-router-dom';

import './Login.css';

import { IsLoggedInContext } from '../../contexts/IsLoggedInContext';

function Login({ setCurrentPath, path, setCurrentUser, login }) {

	React.useEffect(() => {
		setCurrentPath(path);
	}, [setCurrentPath, path])

	const isLoggedIn = React.useContext(IsLoggedInContext);
	const [isFormValid, setIsFormValid] = React.useState(false);

	const email = useInput('', { isEmpty: true, minLength: 2, regex });
	const password = useInput('', { isEmpty: true, minLength: 2 });

	React.useEffect(() => {
		if (email.isInputValid && password.isInputValid) {
			setIsFormValid(true);
		} else {
			setIsFormValid(false);
		}
	}, [email.isInputValid, password.isInputValid]);

	if (isLoggedIn) {
		return <Navigate to="/movies" />
	}

	return (
		<main className="login">

			<Form
				headingText={'Рады видеть!'}
				buttonText={'Войти'}
				redirectionCaptionText={'Ещё не зарегистрированы?'}
				linkText={'Регистрация'}
				isFormValid={isFormValid}
				redirectionPath={'/signup'}
				onSubmit={login}
				formValues={{ email: email.value, password: password.value }}
				setCurrentUser={setCurrentUser}
			>

				<fieldset className="form__fieldset">

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

export default Login;