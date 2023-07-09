import React from 'react';
import './SubmitButton.css';

function SubmitButton({ isFormValid, buttonText, additionalButtonStyles, form }) {
	return (
		<button
			className={`${additionalButtonStyles} submit-button
					${!isFormValid
					? 'submit-button_disabled'
					: ''
				}
					`}
			type="submit"
			disabled={!isFormValid}
			form={form}
		>
			{buttonText}
		</button>
	)
}

export default SubmitButton;