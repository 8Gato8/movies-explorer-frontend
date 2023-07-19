import React from 'react';

const useValidation = (value, validations) => {

	const [isInputValid, setIsInputValid] = React.useState(false);

	const [isEmptyError, setIsEmptyError] = React.useState(true);
	const [emptyErrorMessage, setEmptyErrorMessage] = React.useState('');

	const [isMinLengthError, setIsMinLengthError] = React.useState(false);
	const [minLengthErrorMessage, setMinLengthErrorMessage] = React.useState('');

	const [isEmailValidationError, setIsEmailValidationError] = React.useState(false);
	const [emailValidationMessage, setEmailValidationMessage] = React.useState('');

	const [isNameValidationError, setIsNameValidationError] = React.useState(false);
	const [nameValidationMessage, setNameValidationMessage] = React.useState('');

	React.useEffect(() => {
		for (const validation in validations) {

			switch (validation) {

				case 'minLength':
					if (value.length < validations[validation]) {
						setIsMinLengthError(true);
						setMinLengthErrorMessage(`Необходимое количество символов: ${validations[validation]}. `)
					} else {
						setIsMinLengthError(false);
						setMinLengthErrorMessage('');
					}
					break;

				case 'isEmpty':
					if (value) {
						setIsEmptyError(false);
						setEmptyErrorMessage('');
					} else {
						setIsEmptyError(true);
						setEmptyErrorMessage('Поле не может быть пустым. ');
					}
					break;

				case 'regexEmail':
					if (!validations[validation].test(String(value).toLowerCase())) {
						setIsEmailValidationError(true);
						setEmailValidationMessage('Ошибка валидации email');
					} else {
						setIsEmailValidationError(false);
						setEmailValidationMessage('');
					}
					break;

				case 'regexName':
					if (!validations[validation].test(String(value).toLowerCase())) {
						setIsNameValidationError(true);
						setNameValidationMessage('Ошибка валидации name');
					} else {
						setIsNameValidationError(false);
						setNameValidationMessage('');
					}
					break;
				default:
					break;
			}
		}
	}, [value, validations])

	React.useEffect(() => {
		if (isEmptyError || isMinLengthError || isEmailValidationError || isNameValidationError) {
			setIsInputValid(false);
		} else {
			setIsInputValid(true);
		}
	}, [isEmptyError, isMinLengthError, isEmailValidationError, isNameValidationError])

	return {
		isInputValid,
		isEmptyError,
		isMinLengthError,
		isNameValidationError,
		nameValidationMessage,
		isEmailValidationError,
		emptyErrorMessage,
		minLengthErrorMessage,
		emailValidationMessage
	}
}

export const useInput = (initialValue, validations) => {
	const [value, setValue] = React.useState(initialValue);
	const [isDirty, setIsDirty] = React.useState(false);
	const valid = useValidation(value, validations);

	const onChange = (e) => {
		setValue(e.target.value);
	}

	const onBlur = (e) => {
		setIsDirty(true);
	}

	return {
		value,
		onChange,
		onBlur,
		isDirty,
		...valid
	}
}