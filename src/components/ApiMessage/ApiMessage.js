import React from 'react';
import { ApiMessageContext } from '../../contexts/ApiMessageContext';
import { IsApiMessageShownContext } from '../../contexts/IsApiMessageShownContext';

import './ApiMessage.css';

function ApiErrorMessage({ additionalStyles }) {
	const apiMessage = React.useContext(ApiMessageContext);
	const isApiMessageShown = React.useContext(IsApiMessageShownContext);

	return (
		<p className={`api-message ${additionalStyles} ${isApiMessageShown ? 'api-message_visible' : ''}`}>{apiMessage}</p>
	)
}

export default ApiErrorMessage;