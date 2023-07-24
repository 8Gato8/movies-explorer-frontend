export const makeApiRequest = async (baseUrl, additionalUrl, method, body, token) => {

	const url = `${baseUrl}${additionalUrl}`;

	const headers = {
		'Content-Type': 'application/json'
	}

	if (token !== undefined) {
		headers['Authorization'] = `Bearer ${token}`;
	}

	const config = {
		method,
		headers,
	}

	if (body !== undefined) {
		config.body = JSON.stringify(body);
	}

	const response = await fetch(url, config);

	return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
}
