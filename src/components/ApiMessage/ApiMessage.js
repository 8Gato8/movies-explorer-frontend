import React from 'react';

import './ApiMessage.css';

function ApiMessage({
	additionalStyles,
	isApiMessageShown,
	apiMessage,
}) {

	return (
		<p className={
			`api-message 
			${additionalStyles} 
			${isApiMessageShown ? 'api-message_visible' : ''}`}>
			{apiMessage}
		</p>
	)
}

export default ApiMessage;