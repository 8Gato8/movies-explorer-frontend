import React from 'react'
import Form from '../Form/Form';
import { regex } from '../../utils/regexEmailValidation';
import { useInput } from '../../utils/validation';

import './Login.css';

function Login({ setCurrentPath, currentPath }) {

	React.useEffect(() => {
		setCurrentPath(currentPath);
	}, [setCurrentPath, currentPath])

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

	return (
		<main className="login">

			<Form
				headingText={'Рады видеть!'}
				buttonText={'Войти'}
				redirectionCaptionText={'Ещё не зарегистрированы?'}
				linkText={'Регистрация'}
				isFormValid={isFormValid}
				redirectionPath={'/signup'}
			>

				<fieldset className="form__fieldset">

					<label htmlFor="input-email" className="form__field">
						E-mail
						<input
							id="input-email"
							className={`form__input form__input_type_email 
							${email.isDirty && !email.isInputValid
									? 'form__input_type_error'
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
							`form__input-error-message 
							${email.isDirty && !email.isInputValid
								? 'form__input-error-message_visible'
								: ''
							}`}
						>
							{email.isMinLengthError && email.minLengthErrorMessage}
							{email.isEmptyError && email.emptyErrorMessage}
							{email.isEmailValidationError && email.emailValidationMessage}
						</span>

					</label>

					<label htmlFor="input-password" className="form__field">
						Пароль
						<input
							id="input-password"
							className={`form__input 
							${password.isDirty && !password.isInputValid
									? 'form__input_type_error'
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
							`form__input-error-message 
							${password.isDirty && !password.isInputValid
								? 'form__input-error-message_visible'
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